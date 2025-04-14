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
    const newUser = await authServices.registerUser(req.body);
    return generalResponse({
      response: res,
      data: newUser,
      message: USER_MESSAGES.OTP_SENT,
      statusCode: 200,
      toast: true,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const otpVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedUser = await authServices.verifyUserOtp(req.body);
    return generalResponse({
      response: res,
      data: updatedUser,
      message: USER_MESSAGES.REGISTER_SUCCESS,
      statusCode: 200,
      toast: true,
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
    next(error);
  }
};
