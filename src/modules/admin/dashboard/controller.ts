import { NextFunction, Request, Response } from "express";
import { generalResponse } from "@/lib/helpers/response.helper";
import { ADMIN_MESSAGES } from "../messages";
import * as dashboardServices from "./services";

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await dashboardServices.getDashboardStats();
    return generalResponse({
      response: res,
      data,
      message: ADMIN_MESSAGES.STATS_FETCHED,
      statusCode: 200,
      toast: false,
    });
  } catch (error) {
    next(error);
  }
};
