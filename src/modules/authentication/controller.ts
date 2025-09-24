import { generalResponse } from "@/lib/helpers/response.helper";
import { NextFunction, Request, Response } from "express";
import * as authServices from "./services";
import { USER_MESSAGES } from "./messages";
import { catchAsync } from "@/lib/utils";

export const register = catchAsync(async (req: Request, res: Response) => {
  const data = await authServices.registerUser(req.body);
  return generalResponse({
    response: res,
    data,
    message: USER_MESSAGES.OTP_SENT,
    statusCode: 200,
    toast: false,
  });
});

export const otpVerification = catchAsync(
  async (req: Request, res: Response) => {
    const newToken = await authServices.verifyUserOtp(
      req.query.verification_token as string,
      req.body.otp
    );
    return generalResponse({
      response: res,
      data: { accessToken: newToken },
      message: USER_MESSAGES.CONTACT_VERIFIED,
      statusCode: 200,
      toast: true,
    });
  }
);

export const login = catchAsync(async (req: Request, res: Response) => {
  const data = await authServices.loginUser(req.body);
  return generalResponse({
    response: res,
    data,
    message: USER_MESSAGES.LOGIN_SUCCESS,
    statusCode: 200,
    toast: true,
  });
});

export const resendOtp = catchAsync(async (req: Request, res: Response) => {
  await authServices.resendUserOtp(req.query.verification_token as string);
  return generalResponse({
    response: res,
    message: USER_MESSAGES.OTP_SENT,
    statusCode: 200,
    toast: true,
  });
});

export const forgotPassword = catchAsync(
  async (req: Request, res: Response) => {
    const data = await authServices.forgotUserPassword(req.body);
    return generalResponse({
      response: res,
      data,
      message: USER_MESSAGES.OTP_SENT,
      statusCode: 200,
      toast: true,
    });
  }
);

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
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
});
