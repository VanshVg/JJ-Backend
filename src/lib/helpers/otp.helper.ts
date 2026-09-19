import {
  NODE_ENV,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_SERVICE_SID,
} from "@/config/env.config";
import { Twilio } from "twilio";
import { throwAppError } from "./error.helper";
import { logger } from "@/config/logger.config";

const DEV_OTP = "123456";
const twilioReady =
  TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_SERVICE_SID;

const client = twilioReady
  ? new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
  : null;

// Never fall back to the fixed dev OTP in production, or anyone could log in
// to any account with it.
const assertOtpServiceAvailable = () => {
  if (!twilioReady && NODE_ENV === "production") {
    logger.error("[OTP] Twilio is not configured in production");
    throwAppError({
      message: "OTP service is unavailable. Please try again later!",
      statusCode: 503,
      toast: true,
    });
  }
};

export const sendOtpText = async (contactNo: string) => {
  assertOtpServiceAvailable();
  if (!twilioReady) {
    logger.warn(
      `[OTP] Twilio not configured — dev mode active. Use OTP: ${DEV_OTP}`
    );
    return { status: "pending", sid: "dev" };
  }

  const message = await client.verify.v2
    .services(TWILIO_SERVICE_SID)
    .verifications.create({
      to: `+91` + contactNo,
      channel: "sms",
    });

  return message;
};

export const verifyOtp = async (contactNo: string, otp: string) => {
  assertOtpServiceAvailable();
  if (!twilioReady) {
    if (otp !== DEV_OTP) {
      throwAppError({
        message: `Invalid OTP. Dev mode: use ${DEV_OTP}`,
        statusCode: 400,
        toast: true,
      });
    }
    return { status: "approved", valid: true };
  }

  try {
    const isOtpCorrect = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: `+91` + contactNo, code: otp });

    return isOtpCorrect;
  } catch (error) {
    if (error.code === 20404) {
      throwAppError({
        message: "OTP is expired.",
        statusCode: 410,
        toast: true,
      });
    } else {
      throwAppError({
        message: "Please try again later!",
        statusCode: 500,
        toast: true,
      });
    }
  }
};
