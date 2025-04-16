import User from "@/database/models/users.model";
import { getRepository } from "./base-repository";

const UserRepository = getRepository<User>(User.name);

export const createUser = UserRepository.create;
export const fetchAllUsers = UserRepository.getAll;
export const fetchOneUser = UserRepository.get;
export const updateUser = UserRepository.update;
export const deleteUser = UserRepository.deleteData;
