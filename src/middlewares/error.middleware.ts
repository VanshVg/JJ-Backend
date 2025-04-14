import { logger } from "@/config/logger.config";
import { generalResponse } from "@/lib/helpers/response.helper";
import { ResponseType } from "@/lib/types";
import { AppError } from "@/lib/utils/error.util";
import { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.log("info", error);

    if (error instanceof AppError) {
      const errorData = (error as any)?.metadata;
      const status: number = errorData.status || 500;
      const message: string = error.message || "Something went wrong!";
      const data: any = errorData.data || {};
      const toast: boolean = errorData.toast;

      logger.error(
        `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}, Toast:: ${toast}`
      );
      return generalResponse({
        response: res,
        data,
        message,
        responseType: ResponseType.Error,
        toast,
        statusCode: status,
      });
    } else if (error instanceof AxiosError) {
      return generalResponse({
        response: res,
        data: {
          code: error.code,
          detailError: error.response?.data,
        },
        message: error.response?.data,
        responseType: ResponseType.Error,
        toast: false,
        statusCode: error.response?.status || 500,
      });
    } else if (error instanceof Error) {
      return generalResponse({
        response: res,
        data: error,
        message: "Something went wrong",
        responseType: ResponseType.Error,
        toast: true,
        statusCode: 400,
      });
    }
  } catch (err) {
    next(err);
  }
};

process.on("unhandledRejection", (error) => {
  logger.log("info", "Unhandled Rejection", error);
});

process.on("uncaughtException", (error) => {
  logger.log("info", "Uncaught Exception", error);
});
