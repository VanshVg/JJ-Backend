import { createApp } from "./app";
import { PORT } from "./config/env.config";
import { logger } from "./config/logger.config";
import db from "./database/models";
import { getApiRoutes } from "./routes";

const port: string | number = PORT || 8000;

const main = async () => {
  try {
    await db.authenticate();
    const app = createApp(getApiRoutes());

    app.listen(port, () => {
      logger.info(`🚀 App listening on port ${port}`);
    });
  } catch (error) {
    logger.error("[SERVER START]: %s", error?.message);
    process.exit(1);
  }
};

main();
