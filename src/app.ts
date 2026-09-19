import express, { Application, Router } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import { FRONTEND_URL } from "./config/env.config";
import { errorMiddleware } from "./middlewares/error.middleware";
import { passportMiddleware } from "./middlewares/passport.middleware";

const otpRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { message: "Too many requests, please try again after a minute." },
  standardHeaders: true,
  legacyHeaders: false,
});

const initializeMiddlewares = (app: Application) => {
  // Behind Vercel's proxy — trust X-Forwarded-For so rate limiting sees the
  // real client IP instead of the proxy's.
  app.set("trust proxy", 1);
  app.use(cors({ origin: FRONTEND_URL || "http://localhost:5173" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/auth/register", otpRateLimiter);
  app.use("/auth/resend-otp", otpRateLimiter);
  app.use("/auth/forgot-password", otpRateLimiter);
};

const initializeRoutes = (app: Application, routes: Router[]) => {
  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });
  routes.forEach((route) => {
    app.use("/", route);
  });
};

const initializeErrorHandling = (app: Application) => {
  app.use(errorMiddleware);
};

export const createApp = (apiRouter: Router[]): Application => {
  const app: Application = express();

  initializeMiddlewares(app);
  initializeRoutes(app, apiRouter);
  initializeErrorHandling(app);
  passportMiddleware();

  return app;
};
