import { NextFunction, Request, Response } from "express";
import { generalResponse } from "@/lib/helpers/response.helper";
import { ADMIN_MESSAGES } from "../messages";
import * as orderServices from "./services";

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await orderServices.getAllOrders(req);
    return generalResponse({
      response: res,
      data,
      message: ADMIN_MESSAGES.ORDERS_FETCHED,
      statusCode: 200,
      toast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await orderServices.getAdminOrderById(Number(req.params.id));
    return generalResponse({
      response: res,
      data,
      message: ADMIN_MESSAGES.ORDER_FETCHED,
      statusCode: 200,
      toast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await orderServices.updateOrderStatus(
      Number(req.params.id),
      req.body.order_status
    );
    return generalResponse({
      response: res,
      data: null,
      message: ADMIN_MESSAGES.ORDER_STATUS_UPDATED,
      statusCode: 200,
      toast: true,
    });
  } catch (error) {
    next(error);
  }
};

export const markOrderPaid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await orderServices.markOrderPaid(Number(req.params.id));
    return generalResponse({
      response: res,
      data: null,
      message: "Order marked as paid.",
      statusCode: 200,
      toast: true,
    });
  } catch (error) {
    next(error);
  }
};
