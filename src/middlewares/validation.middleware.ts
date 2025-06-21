import { generalResponse } from "@/lib/helpers/response.helper";
import { ResponseType } from "@/lib/types";
import { cleanObj } from "@/lib/utils";
import { RequestHandler } from "express";

type ErrorType = {
  message: string;
  path: Object;
  type: string;
  context: any;
};

const errorFilterValidator = (error: Array<ErrorType>) => {
  const extractedErrors: Array<string> = [];
  error.forEach((err: ErrorType) => extractedErrors.push(err.message));
  const errorResponse = extractedErrors.join(", ");
  return errorResponse;
};

const validationMiddleware = (
  type: any,
  value: "body" | "query" | "params" | string = "body"
): RequestHandler => {
  return async (req, res, next) => {
    try {
      cleanObj(req[value]);
      req[value] = await type.validateAsync(req[value]);
      return next();
    } catch (e) {
      const error: any = e;
      if (error.details) {
        const errorResponse = errorFilterValidator(error.details);

        return generalResponse({
          response: res,
          data: errorResponse,
          message: "Something went wrong!",
          responseType: ResponseType.Error,
          toast: true,
          statusCode: 422,
        });
      }

      return generalResponse({
        response: res,
        data: null,
        message: "Something went wrong!",
        responseType: ResponseType.Error,
        toast: true,
        statusCode: 400,
      });
    }
  };
};

export default validationMiddleware;
