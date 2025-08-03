import authMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";
import {
  addToCart,
  fetchCartData,
  mergeCarts,
  removeFromCart,
  toggleSelection,
  updateCart,
} from "./controller";
import validationMiddleware from "@/middlewares/validation.middleware";
import {
  addToCartSchema,
  toggleSelectionSchema,
  updateCartSchema,
} from "./schema";

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
  cartRouter.post(`/carts/merge`, authMiddleware, mergeCarts);
  cartRouter.put(
    `/carts/products/:id`,
    authMiddleware,
    validationMiddleware(updateCartSchema),
    updateCart
  );
  cartRouter.put(
    `/carts/toggle`,
    authMiddleware,
    validationMiddleware(toggleSelectionSchema),
    toggleSelection
  );

  return cartRouter;
};

export default cartRoutes;
