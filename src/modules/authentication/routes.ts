import { Router } from "express";
import { login, otpVerification, register } from "./controller";
import { loginSchema, registerSchema, verifyOtpSchema } from "./schema";
import validationMiddleware from "./../../middlewares/validation.middleware";

const authRoutes = (): Router => {
  const authRouter = Router();

  authRouter.post(
    `/auth/register`,
    validationMiddleware(registerSchema),
    register
  );
  authRouter.post(
    `/auth/verify-otp`,
    validationMiddleware(verifyOtpSchema),
    otpVerification
  );
  authRouter.post(`/auth/login`, validationMiddleware(loginSchema), login);

  return authRouter;
};

export default authRoutes;
