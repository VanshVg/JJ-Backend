import {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_SERVICE_SID,
} from "@/config/env.config";
import { Twilio } from "twilio";
import { throwAppError } from "./error.helper";

const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const sendOtpText = async (contactNo: string) => {
  const message = await client.verify.v2
    .services(TWILIO_SERVICE_SID)
    .verifications.create({
      to: `+91` + contactNo,
      channel: "sms",
    });

  return message;
};

export const verifyOtp = async (contactNo: string, otp: string) => {
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
