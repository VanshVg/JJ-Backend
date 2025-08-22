import authMiddleware from "@/middlewares/auth.middleware";
import { Router } from "express";
import {
  addUserAddress,
  changePassword,
  editUserAddress,
  editUserProfile,
  fetchUserAddresses,
  getAdminDashboard,
  removeUserAddress,
} from "./controller";
import validationMiddleware from "@/middlewares/validation.middleware";
import {
  addUserAddressSchema,
  changePasswordSchema,
  editUserAddressSchema,
  editUserProfileSchema,
} from "./schema";
import { checkRole } from "@/middlewares/role.middleware";
import { UserRoles } from "@/database/models/types/users.type";

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
    "/users/address/:id",
    authMiddleware,
    validationMiddleware(editUserAddressSchema),
    editUserAddress
  );
  userRouter.get("/users/address", authMiddleware, fetchUserAddresses);
  userRouter.delete("/users/address/:id", authMiddleware, removeUserAddress);
  userRouter.put(
    "/users/password",
    authMiddleware,
    validationMiddleware(changePasswordSchema),
    changePassword
  );
  userRouter.get(
    "/users/admin",
    authMiddleware,
    checkRole([UserRoles.Admin]),
    getAdminDashboard
  );

  return userRouter;
};

export default userRoutes;
