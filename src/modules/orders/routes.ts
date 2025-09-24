import authMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";
import { addOrder } from "./controller";
import validationMiddleware from "@/middlewares/validation.middleware";
import { addOrderSchema } from "./schema";

const orderRoutes = (): Router => {
  const orderRouter = Router();

  orderRouter.post(
    `/orders`,
    authMiddleware,
    validationMiddleware(addOrderSchema),
    addOrder
  );

  return orderRouter;
};

export default orderRoutes;
