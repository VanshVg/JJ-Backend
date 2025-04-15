import { Router } from "express";
import {
  forgotPassword,
  login,
  otpVerification,
  register,
  resendOtp,
  resetPassword,
} from "./controller";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyOtpSchema,
} from "./schema";
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
  authRouter.post(`/auth/resend-otp`, resendOtp);
  authRouter.post(
    `/auth/forgot-password`,
    validationMiddleware(forgotPasswordSchema),
    forgotPassword
  );
  authRouter.post(
    `/auth/reset-password`,
    validationMiddleware(resetPasswordSchema),
    resetPassword
  );

  return authRouter;
};

export default authRoutes;
