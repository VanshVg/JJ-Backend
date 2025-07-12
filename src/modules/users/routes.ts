import authMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";
import { addUserAddress, fetchUserProfile } from "./controller";

const userRoutes = (): Router => {
  const userRouter = Router();

  userRouter.get("/users/profile", authMiddleware, fetchUserProfile);
  userRouter.post("/users/address", authMiddleware, addUserAddress);

  return userRouter;
};

export default userRoutes;
