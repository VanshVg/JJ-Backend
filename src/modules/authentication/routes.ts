import { Router } from "express";
import { register } from "./controller";
import { registerSchema } from "./schema";
import validationMiddleware from "./../../middlewares/validation.middleware";

const authRoutes = (): Router => {
  const authRouter = Router();

  authRouter.post(
    `/auth/register`,
    validationMiddleware(registerSchema),
    register
  );

  return authRouter;
};

export default authRoutes;
