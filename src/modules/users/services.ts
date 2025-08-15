import { updateUser } from "@/repositories/users.repository";
import { IEditProfileBody, IUserAddressBody } from "./types";
import {
  createUserAddress,
  deleteUserAddress,
  fetchOneUserAddress,
  findAndCountAllUserAddress,
  updateUserAddress,
} from "@/repositories/user-addresses.repository";
import { getPagination } from "@/lib/helpers/pagination.helper";
import { Request } from "express";
import { throwAppError } from "@/lib/helpers/error.helper";
import { USERS_MESSAGES } from "./messages";
import argon2 from "argon2";
import User from "@/database/models/users.model";
import db from "@/database/models";

export const editUserProfile = async ({
  bodyData,
  userId,
}: {
  bodyData: IEditProfileBody;
  userId: number;
}) => {
  const { firstname, lastname } = bodyData;

  const updatedData = await updateUser(
    { first_name: firstname, last_name: lastname },
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
  const transaction = await db.transaction();
  try {
    if (bodyData.is_primary) {
      await updateUserAddress(
        { is_primary: false },
        { where: { user_id: userId }, transaction }
      );
    }
    const newUserAddress = await createUserAddress(
      {
        ...bodyData,
        pincode: 393001,
        user_id: userId,
      },
      { transaction }
    );

    await transaction.commit();

    return newUserAddress;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const editUserAddress = async ({
  bodyData,
  addressId,
  userId,
}: {
  bodyData: IUserAddressBody;
  addressId: number;
  userId: number;
}) => {
  const transaction = await db.transaction();

  try {
    if (bodyData.is_primary) {
      await updateUserAddress(
        { is_primary: false },
        { where: { user_id: userId }, transaction }
      );
    }

    const updatedData = await updateUserAddress(
      { ...bodyData },
      { where: { id: addressId }, transaction }
    );

    await transaction.commit();

    return updatedData;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const fetchUserAddress = async (req: Request) => {
  const { limit, offset } = getPagination(req);

  const { rows: addresses, count: totalRecords } =
    await findAndCountAllUserAddress({
      where: { user_id: req.user.id },
      attributes: [
        "id",
        "address_line_1",
        "address_line_2",
        "landmark",
        "pincode",
        "address_type",
        "is_primary",
      ],
      limit,
      offset,
      raw: true,
      order: [["is_primary", "DESC"]],
    });

  return { addresses, totalRecords };
};

export const removeUserAddress = async (addressId: number) => {
  const isAddress = await fetchOneUserAddress({ where: { id: addressId } });
  if (!isAddress) {
    throwAppError({
      message: USERS_MESSAGES.ADDRESS_NOT_FOUND,
      statusCode: 404,
      toast: true,
    });
  }

  await deleteUserAddress({ where: { id: addressId } });

  return;
};

export const changePassword = async ({
  currentPassword,
  newPassword,
  user,
}: {
  currentPassword: string;
  newPassword: string;
  user: User;
}) => {
  const isPassword = await argon2.verify(user.password, currentPassword);
  if (!isPassword) {
    throwAppError({
      message: USERS_MESSAGES.INVALID_PASSWORD,
      statusCode: 401,
      toast: true,
    });
  }

  if (currentPassword === newPassword) {
    throwAppError({
      message: USERS_MESSAGES.PASSWORD_SAME,
      statusCode: 409,
      toast: true,
    });
  }

  const hashedPassword = await argon2.hash(newPassword);

  await updateUser({ password: hashedPassword }, { where: { id: user.id } });

  return;
};
