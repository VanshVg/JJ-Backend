import { NextFunction, Request, Response } from "express";
import * as userServices from "./services";
import { generalResponse } from "@/lib/helpers/response.helper";
import { USERS_MESSAGES } from "./messages";
import { ResponseType } from "@/lib/types";

export const fetchUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = await userServices.fetchUserProfile(req.user.id);
    return generalResponse({
      response: res,
      data: userData,
      message: USERS_MESSAGES.PROFILE_SUCCESS,
      statusCode: 200,
      toast: false,
      responseType: ResponseType.Success,
    });
  } catch (error) {
    next(error);
  }
};
