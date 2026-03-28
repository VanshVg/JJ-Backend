import { NextFunction, Request, Response } from "express";
import * as orderServices from "./services";
import { generalResponse } from "@/lib/helpers/response.helper";
import { ORDER_MESSAGES } from "./messages";

export const placeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await orderServices.placeOrder(req.user.id, req.body);
    return generalResponse({
      response: res,
      data,
      message: ORDER_MESSAGES.ORDER_PLACED,
      statusCode: 201,
      toast: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await orderServices.getOrders(req);
    return generalResponse({
      response: res,
      data,
      message: ORDER_MESSAGES.ORDERS_FETCHED,
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
    const data = await orderServices.getOrderById(
      req.user.id,
      Number(req.params.id)
    );
    return generalResponse({
      response: res,
      data,
      message: ORDER_MESSAGES.ORDER_FETCHED,
      statusCode: 200,
      toast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await orderServices.cancelOrder(req.user.id, Number(req.params.id));
    return generalResponse({
      response: res,
      data: null,
      message: ORDER_MESSAGES.ORDER_CANCELLED,
      statusCode: 200,
      toast: true,
    });
  } catch (error) {
    next(error);
  }
};
