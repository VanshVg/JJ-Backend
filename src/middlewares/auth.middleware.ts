import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { UserAttributes } from "@/database/models/types/users.type";
import { generalResponse } from "@/lib/helpers/response.helper";
import { USER_MESSAGES } from "@/modules/authentication/messages";
import { ResponseType } from "@/lib/types";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    async (error, user: UserAttributes) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        return generalResponse({
          response: res,
          message: USER_MESSAGES.NOT_AUTHENTICATED,
          statusCode: 401,
          toast: false,
          responseType: ResponseType.Error,
        });
      }

      if (!user.is_contact_no_verified) {
        return generalResponse({
          response: res,
          message: USER_MESSAGES.NOT_ACTIVATED,
          statusCode: 401,
          toast: false,
          responseType: ResponseType.Error,
        });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

export default authMiddleware;
