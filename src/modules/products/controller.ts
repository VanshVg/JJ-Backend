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
