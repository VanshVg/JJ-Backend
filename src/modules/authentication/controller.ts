import { generalResponse } from "@/lib/helpers/response.helper";
import { NextFunction, Request, Response } from "express";
import * as authServices from "./services";
import { USER_MESSAGES } from "./messages";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await authServices.registerUser(req.body);
    return generalResponse({
      response: res,
      data,
      message: USER_MESSAGES.OTP_SENT,
      statusCode: 200,
      toast: true,
    });
  } catch (error) {
    console.log(`Error inside register API`, error);
    next(error);
  }
};

export const otpVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedUser = await authServices.verifyUserOtp(
      req.query.verification_token as string,
      req.body.otp
    );
    return generalResponse({
      response: res,
      data: updatedUser,
      message: USER_MESSAGES.REGISTER_SUCCESS,
      statusCode: 200,
      toast: true,
    });
  } catch (error) {
    console.log(`Error inside OTP Verification API`, error);
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = await authServices.loginUser(req.body);
    return generalResponse({
      response: res,
      data: accessToken,
      message: USER_MESSAGES.LOGIN_SUCCESS,
      statusCode: 200,
      toast: true,
    });
  } catch (error) {
    console.log(`Error inside login API`, error);
    next(error);
  }
};

export const resendOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authServices.resendUserOtp(req.query.verification_token as string);
    return generalResponse({
      response: res,
      message: USER_MESSAGES.OTP_RESENT,
      statusCode: 200,
      toast: true,
    });
  } catch (error) {
    console.log(`Error inside resendOtp API`, error);
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await authServices.forgotUserPassword(req.body);
    return generalResponse({
      response: res,
      data,
      message: USER_MESSAGES.RESET_PASSWORD_OTP,
      statusCode: 200,
      toast: true,
    });
  } catch (error) {
    console.log(`Error inside forgotPassword API`, error);
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await authServices.resetUserPassword(
      req.query.verification_token as string,
      req.body.password
    );
    return generalResponse({
      response: res,
      message: USER_MESSAGES.RESET_PASSWORD_SUCCESS,
      statusCode: 200,
      toast: true,
    });
  } catch (error) {
    console.log(`Error inside resetPassword API`, error);
    next(error);
  }
};
