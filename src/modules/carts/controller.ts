import { NextFunction, Request, Response } from "express";
import * as cartServices from "./services";
import { generalResponse } from "@/lib/helpers/response.helper";
import { CART_MESSAGES } from "./messages";
import { catchAsync } from "@/lib/utils";

export const addToCart = catchAsync(async (req: Request, res: Response) => {
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
});

export const fetchCartData = catchAsync(async (req: Request, res: Response) => {
  const data = await cartServices.fetchCartData(req.user.id);
  return generalResponse({
    response: res,
    data,
    message: CART_MESSAGES.CART_FETCH_SUCCESS,
    statusCode: 200,
    toast: false,
  });
});

export const removeFromCart = catchAsync(
  async (req: Request, res: Response) => {
    await cartServices.removeFromCart({
      userId: req.user.id,
      productId: Number(req.params.productId),
    });
    return generalResponse({
      response: res,
      message: CART_MESSAGES.PRODUCT_REMOVE_SUCCESS,
      statusCode: 200,
      toast: false,
    });
  }
);

export const mergeCarts = catchAsync(async (req: Request, res: Response) => {
  await cartServices.mergeCarts(req.body.cart_data, req.user.id);
  return generalResponse({
    response: res,
    message: CART_MESSAGES.MERGE_SUCCESS,
    statusCode: 200,
    toast: false,
  });
});

export const updateCart = catchAsync(async (req: Request, res: Response) => {
  await cartServices.updateCart(Number(req.params.id), req.body);
  return generalResponse({
    response: res,
    message: CART_MESSAGES.CART_UPDATED_SUCCESS,
    statusCode: 200,
    toast: false,
  });
});

export const toggleSelection = catchAsync(
  async (req: Request, res: Response) => {
    await cartServices.toggleSelection(req.user.id, req.body.toggle_type);
    return generalResponse({
      response: res,
      message: CART_MESSAGES.CART_UPDATED_SUCCESS,
      statusCode: 200,
      toast: false,
    });
  }
);
