import { initializeApp } from "./app";
import { logger } from "./config/logger.config";
import db from "./database/models";
import authRoutes from "./modules/authentication/routes";
import cartRoutes from "./modules/carts/routes";
import productRoutes from "./modules/products/routes";
import userRoutes from "./modules/users/routes";
import orderRoutes from "./modules/orders/routes";

const main = async () => {
  try {
    await db.authenticate();
    const apiRoutes = [
      authRoutes(),
      productRoutes(),
      userRoutes(),
      cartRoutes(),
      orderRoutes(),
    ];

    await initializeApp(apiRoutes, db);
  } catch (error) {
    logger.error("[SERVER START]: %s", error?.message);
    process.exit(1);
  }
};

main();
