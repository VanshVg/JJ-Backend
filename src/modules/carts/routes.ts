import authMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";
import { addToCart, fetchCartData, removeFromCart } from "./controller";
import validationMiddleware from "@/middlewares/validation.middleware";
import { addToCartSchema } from "./schema";

const cartRoutes = () => {
  const cartRouter = Router();

  cartRouter.post(
    `/carts/products/:productId`,
    authMiddleware,
    validationMiddleware(addToCartSchema),
    addToCart
  );
  cartRouter.get(`/carts`, authMiddleware, fetchCartData);
  cartRouter.delete(
    `/carts/products/":productId`,
    authMiddleware,
    removeFromCart
  );

  return cartRouter;
};

export default cartRoutes;
