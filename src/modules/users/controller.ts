import { NextFunction, Request, Response } from "express";
import * as userServices from "./services";
import { generalResponse } from "@/lib/helpers/response.helper";
import { USERS_MESSAGES } from "./messages";
import { ResponseType } from "@/lib/types";

export const editUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedData = await userServices.editUserProfile({
      bodyData: req.body,
      userId: req.user.id,
    });

    return generalResponse({
      response: res,
      data: updatedData,
      message: USERS_MESSAGES.UPDATE_PROFILE_SUCCESS,
      statusCode: 200,
      toast: true,
      responseType: ResponseType.Success,
    });
  } catch (error) {
    next(error);
  }
};

export const addUserAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = await userServices.addUserAddress({
      bodyData: req.body,
      userId: req.user.id,
    });
    return generalResponse({
      response: res,
      data: userData,
      message: USERS_MESSAGES.ADD_ADDRESS_SUCCESS,
      statusCode: 200,
      toast: true,
      responseType: ResponseType.Success,
    });
  } catch (error) {
    next(error);
  }
};

export const editUserAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedData = await userServices.editUserAddress({
      bodyData: req.body,
      userId: req.user.id,
    });

    return generalResponse({
      response: res,
      data: updatedData,
      message: USERS_MESSAGES.UPDATE_ADDRESS_SUCCESS,
      statusCode: 200,
      toast: true,
      responseType: ResponseType.Success,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchUserAddresses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const responseData = await userServices.fetchUserAddress(req);

    return generalResponse({
      response: res,
      data: responseData,
      message: USERS_MESSAGES.FETCH_ADDRESS_SUCCESS,
      statusCode: 200,
      toast: true,
      responseType: ResponseType.Success,
    });
  } catch (error) {
    next(error);
  }
};
