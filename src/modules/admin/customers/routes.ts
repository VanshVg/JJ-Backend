import { Router } from "express";
import authMiddleware from "@/middlewares/auth.middleware";
import adminMiddleware from "@/middlewares/admin.middleware";
import { getAllCustomers, getCustomerById } from "./controller";

const adminCustomerRoutes = (): Router => {
  const router = Router();

  router.get(
    "/admin/customers",
    authMiddleware,
    adminMiddleware,
    getAllCustomers
  );
  router.get(
    "/admin/customers/:id",
    authMiddleware,
    adminMiddleware,
    getCustomerById
  );

  return router;
};

export default adminCustomerRoutes;
