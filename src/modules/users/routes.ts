import authMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";
import {
  addUserAddress,
  editUserProfile,
  fetchUserProfile,
} from "./controller";
import validationMiddleware from "@/middlewares/validation.middleware";
import { addUserAddressSchema, editUserProfileSchema } from "./schema";

const userRoutes = (): Router => {
  const userRouter = Router();

  userRouter.get("/users/profile", authMiddleware, fetchUserProfile);
  userRouter.put(
    "/users/profile",
    authMiddleware,
    validationMiddleware(editUserProfileSchema),
    editUserProfile
  );
  userRouter.post(
    "/users/address",
    authMiddleware,
    validationMiddleware(addUserAddressSchema),
    addUserAddress
  );

  return userRouter;
};

export default userRoutes;
