import { NextFunction, Request, Response } from "express";
import { UserRoles } from "@/database/models/types/users.type";
import { generalResponse } from "@/lib/helpers/response.helper";
import { ResponseType } from "@/lib/types";

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== UserRoles.Admin) {
    return generalResponse({
      response: res,
      message: "Access denied.",
      statusCode: 403,
      toast: false,
      responseType: ResponseType.Error,
    });
  }
  next();
};

export default adminMiddleware;
