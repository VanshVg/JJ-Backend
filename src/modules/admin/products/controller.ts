import { NextFunction, Request, Response } from "express";
import { generalResponse } from "@/lib/helpers/response.helper";
import { ADMIN_MESSAGES } from "../messages";
import * as productServices from "./services";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await productServices.getAllProducts(req);
    return generalResponse({
      response: res,
      data,
      message: ADMIN_MESSAGES.PRODUCTS_FETCHED,
      statusCode: 200,
      toast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await productServices.getProductById(Number(req.params.id));
    return generalResponse({
      response: res,
      data,
      message: ADMIN_MESSAGES.PRODUCT_FETCHED,
      statusCode: 200,
      toast: false,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await productServices.createNewProduct(req.body);
    return generalResponse({
      response: res,
      data,
      message: ADMIN_MESSAGES.PRODUCT_CREATED,
      statusCode: 201,
      toast: true,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await productServices.updateExistingProduct(Number(req.params.id), req.body);
    return generalResponse({
      response: res,
      data: null,
      message: ADMIN_MESSAGES.PRODUCT_UPDATED,
      statusCode: 200,
      toast: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await productServices.deleteExistingProduct(Number(req.params.id));
    return generalResponse({
      response: res,
      data: null,
      message: ADMIN_MESSAGES.PRODUCT_DELETED,
      statusCode: 200,
      toast: true,
    });
  } catch (error) {
    next(error);
  }
};
