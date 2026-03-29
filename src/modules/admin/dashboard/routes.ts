import { Router } from "express";
import authMiddleware from "@/middlewares/auth.middleware";
import adminMiddleware from "@/middlewares/admin.middleware";
import { getDashboardStats } from "./controller";

const adminDashboardRoutes = (): Router => {
  const router = Router();

  router.get(
    "/admin/dashboard",
    authMiddleware,
    adminMiddleware,
    getDashboardStats
  );

  return router;
};

export default adminDashboardRoutes;
