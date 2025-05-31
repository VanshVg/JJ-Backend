import { initializeApp } from "./app";
import { logger } from "./config/logger.config";
import db from "./database/models";
import authRoutes from "./modules/authentication/routes";
import productRoutes from "./modules/products/routes";

const main = async () => {
  try {
    await db.authenticate();
    const apiRoutes = [authRoutes(), productRoutes()];

    await initializeApp(apiRoutes, db);
  } catch (error) {
    logger.error("[SERVER START]: %s", error?.message);
    process.exit(1);
  }
};

main();
