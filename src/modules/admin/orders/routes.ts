import { Router } from "express";
import authMiddleware from "@/middlewares/auth.middleware";
import adminMiddleware from "@/middlewares/admin.middleware";
import {
  getAllOrders,
  getOrderById,
  markOrderPaid,
  updateOrderStatus,
} from "./controller";

const adminOrderRoutes = (): Router => {
  const router = Router();

  router.get("/admin/orders", authMiddleware, adminMiddleware, getAllOrders);
  router.get("/admin/orders/:id", authMiddleware, adminMiddleware, getOrderById);
  router.put(
    "/admin/orders/:id/status",
    authMiddleware,
    adminMiddleware,
    updateOrderStatus
  );
  router.put(
    "/admin/orders/:id/mark-paid",
    authMiddleware,
    adminMiddleware,
    markOrderPaid
  );

  return router;
};

export default adminOrderRoutes;
