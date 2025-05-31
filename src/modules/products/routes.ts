import { Router } from "express";
import { getProducts } from "./controller";
import authMiddleware from "@/middlewares/auth.middleware";

const productRoutes = (): Router => {
  const productRouter = Router();

  productRouter.get("/products", authMiddleware, getProducts);

  return productRouter;
};

export default productRoutes;
