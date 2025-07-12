import authMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";
import { fetchUserProfile } from "./controller";

const userRoutes = (): Router => {
  const userRouter = Router();

  userRouter.get("/users/profile", authMiddleware, fetchUserProfile);

  return userRouter;
};

export default userRoutes;
