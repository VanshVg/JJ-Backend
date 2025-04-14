import { Router } from "express";
import { register, verifyOtp } from "./controller";
import { registerSchema, verifyOtpSchema } from "./schema";
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
    verifyOtp
  );

  return authRouter;
};

export default authRoutes;
