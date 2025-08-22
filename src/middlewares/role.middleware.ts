import { UserRoles } from "@/database/models/types/users.type";
import { generalResponse } from "@/lib/helpers/response.helper";
import { ResponseType } from "@/lib/types";
import { USER_MESSAGES } from "@/modules/authentication/messages";
import { NextFunction, Request, Response } from "express";

export const checkRole = (allowedRoles: UserRoles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!allowedRoles.includes(req.user.role)) {
      return generalResponse({
        response: res,
        data: null,
        message: USER_MESSAGES.FORBIDDEN,
        statusCode: 403,
        toast: true,
        responseType: ResponseType.Error,
      });
    }
    next();
  };
};
