import express, { Application, Router } from "express";
import cors from "cors";

import { PORT } from "./config/env.config";
import { errorMiddleware } from "./middlewares/error.middleware";
import { Sequelize } from "sequelize";
import { logger } from "./config/logger.config";
import { passportMiddleware } from "./middlewares/passport.middleware";
import User from "./database/models/users.model";
import { UserAttributes } from "./database/models/types/users.type";

declare module "express" {
  interface Request {
    user: UserAttributes;
  }
}

const port: string | number = PORT || 8000;

const app: Application = express();

const initializeMiddlewares = (app: Application) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

const initializeRoutes = (app: Application, routes: Router[]) => {
  routes.forEach((route) => {
    app.use("/", route);
  });
};

const initializeErrorHandling = (app: Application) => {
  app.use(errorMiddleware);
};

export const initializeApp = async (apiRouter: Router[], db: Sequelize) => {
  initializeMiddlewares(app);
  initializeRoutes(app, apiRouter);
  initializeErrorHandling(app);
  passportMiddleware();

  app.listen(port, () => {
    logger.info(`🚀 App listening on port ${port}`);
  });
};
