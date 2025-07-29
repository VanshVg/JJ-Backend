import { NextFunction, Request, Response } from "express";
import * as cartServices from "./services";
import { generalResponse } from "@/lib/helpers/response.helper";
import { CART_MESSAGES } from "./messages";

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await cartServices.addToCart({
      requestBody: req.body,
      productId: Number(req.params.productId),
      userId: req.user.id,
    });
    return generalResponse({
      response: res,
      data,
      message: CART_MESSAGES.ADD_TO_CART_SUCCESS,
      statusCode: 200,
      toast: true,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchCartData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await cartServices.fetchCartData(req.user.id);
    return generalResponse({
      response: res,
      data,
      message: CART_MESSAGES.CART_FETCH_SUCCESS,
      statusCode: 200,
      toast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await cartServices.removeFromCart({
      userId: req.user.id,
      productId: Number(req.params.productId),
    });
    return generalResponse({
      response: res,
      message: CART_MESSAGES.PRODUCT_REMOVE_SUCCESS,
      statusCode: 200,
      toast: true,
    });
  } catch (error) {
    next(error);
  }
};
