import { initializeApp } from "./app";
import { logger } from "./config/logger.config";
import db from "./database/models";
import authRoutes from "./modules/authentication/routes";
import cartRoutes from "./modules/carts/routes";
import productRoutes from "./modules/products/routes";
import userRoutes from "./modules/users/routes";
import orderRoutes from "./modules/orders/routes";
import adminDashboardRoutes from "./modules/admin/dashboard/routes";
import adminOrderRoutes from "./modules/admin/orders/routes";
import adminProductRoutes from "./modules/admin/products/routes";
import adminCustomerRoutes from "./modules/admin/customers/routes";
import adminCategoryRoutes from "./modules/admin/categories/routes";

const main = async () => {
  try {
    await db.authenticate();
    const apiRoutes = [
      authRoutes(),
      productRoutes(),
      userRoutes(),
      cartRoutes(),
      orderRoutes(),
      adminDashboardRoutes(),
      adminOrderRoutes(),
      adminProductRoutes(),
      adminCustomerRoutes(),
      adminCategoryRoutes(),
    ];

    await initializeApp(apiRoutes, db);
  } catch (error) {
    logger.error("[SERVER START]: %s", error?.message);
    process.exit(1);
  }
};

main();
