import { createUser, fetchOneUser } from "@/repositories/users.repository";
import { IRegisterBody } from "./types";
import { throwAppError } from "@/lib/helpers/error.helper";
import { sendOtpText } from "@/lib/helpers/otp.helper";
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
