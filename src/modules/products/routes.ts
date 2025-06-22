import { Router } from "express";
import { getProductById, getProducts } from "./controller";

const productRoutes = (): Router => {
  const productRouter = Router();

  productRouter.get("/products", getProducts);
  productRouter.get("/products/:id", getProductById);

  return productRouter;
};

export default productRoutes;
