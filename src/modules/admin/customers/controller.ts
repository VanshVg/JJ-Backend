import { NextFunction, Request, Response } from "express";
import { generalResponse } from "@/lib/helpers/response.helper";
import { ADMIN_MESSAGES } from "../messages";
import * as customerServices from "./services";

export const getAllCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await customerServices.getAllCustomers(req);
    return generalResponse({
      response: res,
      data,
      message: ADMIN_MESSAGES.CUSTOMERS_FETCHED,
      statusCode: 200,
      toast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const getCustomerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await customerServices.getCustomerById(Number(req.params.id));
    return generalResponse({
      response: res,
      data,
      message: ADMIN_MESSAGES.CUSTOMER_FETCHED,
      statusCode: 200,
      toast: false,
    });
  } catch (error) {
    next(error);
  }
};
