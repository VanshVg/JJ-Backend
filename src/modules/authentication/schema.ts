import { joiCommon } from "@/lib/validation-schema";
import Joi from "joi";

const joiData = {
  firstname: joiCommon.joiString.label("First Name"),
  lastname: joiCommon.joiString.label("Last Name"),
  contact_no: joiCommon.joiString.label("Contact Number"),
  password: joiCommon.joiString.label("Password"),
};

export const registerSchema = Joi.object({
  firstname: joiData.firstname.required(),
  lastname: joiData.lastname.required(),
  contact_no: joiData.contact_no.required(),
  password: joiData.password.required(),
  confirm_password: Joi.string(),
});

export const verifyOtpSchema = Joi.object({
  otp: joiCommon.joiString.label("OTP").length(6).required(),
});

export const loginSchema = Joi.object({
  contact_no: joiData.contact_no.required(),
  password: joiData.password.required(),
});

export const forgotPasswordSchema = Joi.object({
  contact_no: joiData.contact_no.required(),
});

export const resetPasswordSchema = Joi.object({
  password: joiData.password.required(),
  confirm_password: Joi.string(),
});
