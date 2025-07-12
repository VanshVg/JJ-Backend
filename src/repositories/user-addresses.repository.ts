import { getRepository } from "./base-repository";
import UserAddress from "@/database/models/user-addresses.model";

const UserAddressRepository = getRepository<UserAddress>(UserAddress.name);

export const createUserAddress = UserAddressRepository.create;
export const updateUserAddress = UserAddressRepository.update;
export const deleteUserAddress = UserAddressRepository.deleteData;
