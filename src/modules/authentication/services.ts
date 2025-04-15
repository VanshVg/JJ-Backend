import {
  createUser,
  fetchOneUser,
  updateUser,
} from "@/repositories/users.repository";
import { IForgotUserPasswordBody, IRegisterBody } from "./types";
import { throwAppError } from "@/lib/helpers/error.helper";
import { sendOtpText, verifyOtp } from "@/lib/helpers/otp.helper";
import { USER_MESSAGES } from "./messages";
import argon2 from "argon2";
import { generateToken, verifyToken } from "@/lib/helpers/token.helper";
import { ACCESS_TOKEN_EXPIRE_TIME } from "./types/constants";
import moment from "moment";

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

  const token = generateToken({ contact_no }, ACCESS_TOKEN_EXPIRE_TIME);

  return { newUser, token };
};

export const verifyUserOtp = async (verificationToken: string, otp: string) => {
  const { data } = verifyToken(verificationToken);
  const { contact_no } = data;

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

export const loginUser = async (requestBody: IRegisterBody) => {
  const { contact_no, password } = requestBody;

  const isUser = await fetchOneUser({
    where: { contact_no },
    attributes: ["id", "is_contact_no_verified", "role"],
    raw: true,
  });
  if (!isUser) {
    throwAppError({
      message: USER_MESSAGES.INVALID_CREDENTIALS,
      statusCode: 401,
      toast: true,
    });
  }

  if (isUser.is_contact_no_verified) {
    throwAppError({
      message: USER_MESSAGES.NOT_ACTIVATED,
      statusCode: 403,
      toast: true,
    });
  }

  const isPassword = await argon2.verify(isUser.password, password);
  if (!isPassword) {
    throwAppError({
      message: USER_MESSAGES.INVALID_CREDENTIALS,
      statusCode: 401,
      toast: true,
    });
  }

  const accessToken = generateToken(
    { contact_no, role: isUser.role },
    ACCESS_TOKEN_EXPIRE_TIME
  );

  await updateUser(
    { last_login_at: moment().toDate() },
    { where: { id: isUser.id } }
  );

  return accessToken;
};

export const resendUserOtp = async (verificationToken: string) => {
  const { data } = verifyToken(verificationToken);
  const { contact_no } = data;

  const isUser = await fetchOneUser({
    where: { contact_no },
    attributes: ["id"],
    raw: true,
  });
  if (!isUser) {
    throwAppError({
      message: USER_MESSAGES.CONTACT_NO_NOT_EXIST,
      statusCode: 401,
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
};

export const forgotUserPassword = async (
  requestBody: IForgotUserPasswordBody
) => {
  const { contact_no } = requestBody;

  const isUser = await fetchOneUser({
    where: { contact_no },
    attributes: ["id", "is_contact_no_verified", "role"],
    raw: true,
  });
  if (!isUser) {
    throwAppError({
      message: USER_MESSAGES.INVALID_CREDENTIALS,
      statusCode: 401,
      toast: true,
    });
  }

  if (isUser.is_contact_no_verified) {
    throwAppError({
      message: USER_MESSAGES.NOT_ACTIVATED,
      statusCode: 403,
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

  const token = generateToken({ contact_no }, ACCESS_TOKEN_EXPIRE_TIME);

  return { token };
};

export const resetUserPassword = async (
  verificationToken: string,
  password: string
) => {
  const { data } = verifyToken(verificationToken);
  const { contact_no } = data;

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

  const hashedPassword = await argon2.hash(password);

  await updateUser({ password: hashedPassword }, { where: { id: isUser.id } });
};
