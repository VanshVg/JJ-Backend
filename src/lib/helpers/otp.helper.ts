import {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_SERVICE_SID,
} from "@/config/env.config";
import { Twilio } from "twilio";

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
  const isOtpCorrect = await client.verify.v2
    .services(TWILIO_SERVICE_SID)
    .verificationChecks.create({ to: `+91` + contactNo, code: otp });

  return isOtpCorrect;
};
