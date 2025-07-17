import UserAddress from "@/database/models/user-addresses.model";
import { updateUser } from "@/repositories/users.repository";
import { IEditProfileBody, IUserAddressBody } from "./types";
import {
  createUserAddress,
  updateUserAddress,
} from "@/repositories/user-addresses.repository";
import { getPagination } from "@/lib/helpers/pagination.helper";
import { Request } from "express";

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

  return updatedData;
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

export const fetchUserAddress = async (req: Request) => {
  const { limit, offset } = getPagination(req);

  const { rows: addresses, count: totalRecords } =
    await UserAddress.findAndCountAll({
      where: { user_id: req.user.id },
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
      limit,
      offset,
      raw: true,
    });

  return { addresses, totalRecords };
};
