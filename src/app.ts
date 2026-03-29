import express, { Application, Router } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import { FRONTEND_URL, PORT } from "./config/env.config";
import { errorMiddleware } from "./middlewares/error.middleware";
import { Sequelize } from "sequelize";
import { logger } from "./config/logger.config";
import { passportMiddleware } from "./middlewares/passport.middleware";

const port: string | number = PORT || 8000;

const app: Application = express();

const otpRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { message: "Too many requests, please try again after a minute." },
  standardHeaders: true,
  legacyHeaders: false,
});

const initializeMiddlewares = (app: Application) => {
  app.use(cors({ origin: FRONTEND_URL || "http://localhost:5173" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/auth/register", otpRateLimiter);
  app.use("/auth/resend-otp", otpRateLimiter);
  app.use("/auth/forgot-password", otpRateLimiter);
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
