import { Router } from "express";
import authMiddleware from "@/middlewares/auth.middleware";
import adminMiddleware from "@/middlewares/admin.middleware";
import validationMiddleware from "@/middlewares/validation.middleware";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "./controller";
import { createProductSchema, updateProductSchema } from "./schema";

const adminProductRoutes = (): Router => {
  const router = Router();

  router.get(
    "/admin/products",
    authMiddleware,
    adminMiddleware,
    getAllProducts
  );
  router.get(
    "/admin/products/:id",
    authMiddleware,
    adminMiddleware,
    getProductById
  );
  router.post(
    "/admin/products",
    authMiddleware,
    adminMiddleware,
    validationMiddleware(createProductSchema),
    createProduct
  );
  router.put(
    "/admin/products/:id",
    authMiddleware,
    adminMiddleware,
    validationMiddleware(updateProductSchema),
    updateProduct
  );
  router.delete(
    "/admin/products/:id",
    authMiddleware,
    adminMiddleware,
    deleteProduct
  );

  return router;
};

export default adminProductRoutes;
