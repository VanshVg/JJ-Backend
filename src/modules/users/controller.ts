import { NextFunction, Request, Response } from "express";
import * as userServices from "./services";
import { generalResponse } from "@/lib/helpers/response.helper";
import { USERS_MESSAGES } from "./messages";
import { ResponseType } from "@/lib/types";
import User from "@/database/models/users.model";
import { catchAsync } from "@/lib/utils";

export const editUserProfile = catchAsync(
  async (req: Request, res: Response) => {
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
  }
);

export const addUserAddress = catchAsync(
  async (req: Request, res: Response) => {
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
  }
);

export const editUserAddress = catchAsync(
  async (req: Request, res: Response) => {
    const updatedData = await userServices.editUserAddress({
      bodyData: req.body,
      addressId: Number(req.params.id),
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
  }
);

export const fetchUserAddresses = catchAsync(
  async (req: Request, res: Response) => {
    const responseData = await userServices.fetchUserAddress(req);

    return generalResponse({
      response: res,
      data: responseData,
      message: USERS_MESSAGES.FETCH_ADDRESS_SUCCESS,
      statusCode: 200,
      toast: false,
      responseType: ResponseType.Success,
    });
  }
);

export const removeUserAddress = catchAsync(
  async (req: Request, res: Response) => {
    const responseData = await userServices.removeUserAddress(
      Number(req.params.id)
    );

    return generalResponse({
      response: res,
      data: responseData,
      message: USERS_MESSAGES.ADDRESS_DELETE_SUCCESS,
      statusCode: 200,
      toast: true,
      responseType: ResponseType.Success,
    });
  }
);

export const changePassword = catchAsync(
  async (req: Request, res: Response) => {
    await userServices.changePassword({
      currentPassword: req.body.current_password,
      newPassword: req.body.new_password,
      user: req.user as User,
    });

    return generalResponse({
      response: res,
      data: null,
      message: USERS_MESSAGES.PASSWORD_SUCCESS,
      statusCode: 200,
      toast: true,
      responseType: ResponseType.Success,
    });
  }
);
