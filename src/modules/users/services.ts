import ProductReview from "@/database/models/product-reviews.model";
import UserAddress from "@/database/models/user-addresses.model";
import { fetchOneUser, updateUser } from "@/repositories/users.repository";
import { IEditProfileBody, IUserAddressBody } from "./types";
import {
  createUserAddress,
  updateUserAddress,
} from "@/repositories/user-addresses.repository";

export const fetchUserProfile = async (userId: number) => {
  const userData = await fetchOneUser({
    where: { id: userId },
    attributes: ["id", "first_name", "last_name", "email", "contact_no"],
    include: [
      {
        model: UserAddress,
        attributes: [
          "id",
          "address_line_1",
          "address_line_2",
          "landmark",
          "pincode",
          "address_type",
          "is_primary",
          "longitude",
          "latitude",
        ],
      },
      {
        model: ProductReview,
        attributes: ["id", "user_id", "product_id", "rating", "review"],
      },
    ],
  });

  return userData;
};

export const editUserProfile = async ({
  bodyData,
  userId,
}: {
  bodyData: IEditProfileBody;
  userId: number;
}) => {
  const updatedData = await updateUser(
    { ...bodyData },
    { where: { id: userId } }
  );

  return updatedData[1];
};

export const addUserAddress = async ({
  bodyData,
  userId,
}: {
  bodyData: IUserAddressBody;
  userId: number;
}) => {
  const newUserAddress = await createUserAddress({
    ...bodyData,
    pincode: 393001,
    user_id: userId,
  });

  return newUserAddress;
};

export const editUserAddress = async ({
  bodyData,
  userId,
}: {
  bodyData: IUserAddressBody;
  userId: number;
}) => {
  const updatedData = await updateUserAddress(
    { ...bodyData },
    { where: { id: userId } }
  );

  return updatedData;
};
