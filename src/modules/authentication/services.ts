import {
  createUser,
  fetchOneUser,
  updateUser,
} from "@/repositories/users.repository";
import { IRegisterBody, IVerifyOtpBody } from "./types";
import { throwAppError } from "@/lib/helpers/error.helper";
import { sendOtpText, verifyOtp } from "@/lib/helpers/otp.helper";
import { USER_MESSAGES } from "./messages";
import argon2 from "argon2";

export const registerUser = async (requestBody: IRegisterBody) => {
  const { contact_no, password } = requestBody;

  const isUser = await fetchOneUser({
    where: { contact_no },
    attributes: ["id"],
    raw: true,
  });
  if (isUser) {
    throwAppError({
      message: USER_MESSAGES.CONTACT_NO_EXIST,
      statusCode: 409,
      toast: true,
    });
  }

  const sentMessage = await sendOtpText(contact_no);

  if (!sentMessage) {
    throwAppError({
      message: USER_MESSAGES.FAILED_MESSAGE,
      statusCode: 500,
      toast: true,
    });
  }

  const hashedPassword = await argon2.hash(password);

  const newUser = await createUser(
    { contact_no, password: hashedPassword },
    { raw: true }
  );

  return newUser;
};

export const verifyUserOtp = async (requestBody: IVerifyOtpBody) => {
  const { contact_no, otp } = requestBody;

  const isUser = await fetchOneUser({
    where: { contact_no },
    attributes: ["id"],
    raw: true,
  });
  if (!isUser) {
    throwAppError({
      message: USER_MESSAGES.CONTACT_NO_NOT_EXIST,
      statusCode: 404,
      toast: true,
    });
  }

  const verifiedOtp = await verifyOtp(contact_no, otp);
  if (!verifiedOtp.valid) {
    throwAppError({
      message: USER_MESSAGES.INVALID_OTP,
      statusCode: 401,
      toast: true,
    });
  }

  const updatedUser = await updateUser(
    { is_contact_no_verified: true },
    { where: { id: isUser.id } }
  );

  return updatedUser;
};
