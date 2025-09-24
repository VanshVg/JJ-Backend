import { NextFunction, Request, Response } from "express";
import * as productServices from "./services";
import { generalResponse } from "@/lib/helpers/response.helper";
import { ResponseType } from "@/lib/types";
import { PRODUCTS_MESSAGES } from "./messages";
import { catchAsync } from "@/lib/utils";

export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const { products, totalRecords } = await productServices.getProductsService(
    req
  );

  return generalResponse({
    response: res,
    data: { products, totalRecords },
    message: PRODUCTS_MESSAGES.PRODUCTS_SUCCESS,
    statusCode: 200,
    toast: false,
    responseType: ResponseType.Success,
  });
});

export const getProductById = catchAsync(
  async (req: Request, res: Response) => {
    const product = await productServices.getProductById(Number(req.params.id));

    return generalResponse({
      response: res,
      data: product,
      message: PRODUCTS_MESSAGES.PRODUCT_DETAILS_SUCCESS,
      statusCode: 200,
      toast: false,
      responseType: ResponseType.Success,
    });
  }
);

export const addProductReview = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { id: userId } = req.user;

    await productServices.addProductReview({
      productId: Number(id),
      userId,
      requestBody: req.body,
    });

    return generalResponse({
      response: res,
      message: PRODUCTS_MESSAGES.REVIEW_SUCCESS,
      statusCode: 200,
      toast: true,
      responseType: ResponseType.Success,
    });
  }
);
