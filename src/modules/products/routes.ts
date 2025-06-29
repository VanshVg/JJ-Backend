import { Router } from "express";
import { addProductReview, getProductById, getProducts } from "./controller";
import authMiddleware from "@/middlewares/auth.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import { addProductReviewSchema } from "./schema";

const productRoutes = (): Router => {
  const productRouter = Router();

  productRouter.get("/products", getProducts);
  productRouter.get("/products/:id", getProductById);
  productRouter.post(
    "/products/:id/review",
    authMiddleware,
    validationMiddleware(addProductReviewSchema),
    addProductReview
  );

  return productRouter;
};

export default productRoutes;
