import { NextFunction, Request, Response } from "express";
import * as productServices from "./services";
import { generalResponse } from "@/lib/helpers/response.helper";
import { ResponseType } from "@/lib/types";
import { PRODUCTS_MESSAGES } from "./messages";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    console.log(`Error inside getProducts API`, error);
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productServices.getProductById(Number(req.params.id));

    return generalResponse({
      response: res,
      data: product,
      message: PRODUCTS_MESSAGES.PRODUCT_DETAILS_SUCCESS,
      statusCode: 200,
      toast: false,
      responseType: ResponseType.Success,
    });
  } catch (error) {
    next(error);
  }
};

export const addProductReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
