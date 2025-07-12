import authMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";
import { addUserAddress, fetchUserProfile } from "./controller";
import validationMiddleware from "@/middlewares/validation.middleware";
import { addUserAddressSchema } from "./schema";

const userRoutes = (): Router => {
  const userRouter = Router();

  userRouter.get("/users/profile", authMiddleware, fetchUserProfile);
  userRouter.post(
    "/users/address",
    authMiddleware,
    validationMiddleware(addUserAddressSchema),
    addUserAddress
  );

  return userRouter;
};

export default userRoutes;
