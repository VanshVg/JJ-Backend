import authMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";
import {
  addUserAddress,
  editUserAddress,
  editUserProfile,
  fetchUserAddresses,
} from "./controller";
import validationMiddleware from "@/middlewares/validation.middleware";
import {
  addUserAddressSchema,
  editUserAddressSchema,
  editUserProfileSchema,
} from "./schema";

const userRoutes = (): Router => {
  const userRouter = Router();

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
  userRouter.put(
    "/users/address",
    authMiddleware,
    validationMiddleware(editUserAddressSchema),
    editUserAddress
  );
  userRouter.get("/users/address", authMiddleware, fetchUserAddresses);

  return userRouter;
};

export default userRoutes;
