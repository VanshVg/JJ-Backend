import User from "../models/users.model";
import { getRepository } from "./base-repository";

const UserRepository = getRepository<User>(User.name);

export const createUser = UserRepository.create;
export const getUsers = UserRepository.getAll;
export const getOneUser = UserRepository.get;
export const updateUser = UserRepository.update;
export const deleteUser = UserRepository.deleteData;
