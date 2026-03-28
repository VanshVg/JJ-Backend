import authMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";
import { cancelOrder, getOrderById, getOrders, placeOrder } from "./controller";
import validationMiddleware from "@/middlewares/validation.middleware";
import { placeOrderSchema } from "./schema";

const orderRoutes = () => {
  const orderRouter = Router();

  orderRouter.post(
    `/orders`,
    authMiddleware,
    validationMiddleware(placeOrderSchema),
    placeOrder
  );
  orderRouter.get(`/orders`, authMiddleware, getOrders);
  orderRouter.get(`/orders/:id`, authMiddleware, getOrderById);
  orderRouter.put(`/orders/:id/cancel`, authMiddleware, cancelOrder);

  return orderRouter;
};

export default orderRoutes;
