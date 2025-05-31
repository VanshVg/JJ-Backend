import { Router } from "express";
import { getProducts } from "./controller";

const productRoutes = (): Router => {
  const productRouter = Router();

  productRouter.get("/products", getProducts);

  return productRouter;
};

export default productRoutes;
