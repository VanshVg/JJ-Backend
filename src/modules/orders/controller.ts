import { catchAsync } from "@/lib/utils";
import { NextFunction, Request, Response } from "express";
import * as orderServices from "./services";
import { generalResponse } from "@/lib/helpers/response.helper";
import { ORDER_MESSAGES } from "./messages";

export const addOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const responseData = await orderServices.addOrder(req.body, req.user.id);

    return generalResponse({
      response: res,
      data: responseData,
      message: ORDER_MESSAGES.ORDER_SUCCESS,
      statusCode: 200,
      toast: false,
    });
  }
);
