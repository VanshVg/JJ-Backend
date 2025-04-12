import UserOtp from "../models/user-otps.model";
import { getRepository } from "./base-repository";

const UserOtpRepository = getRepository<UserOtp>(UserOtp.name);

export const createUserOtp = UserOtpRepository.create;
export const getUserOtps = UserOtpRepository.getAll;
export const getOneUserOtp = UserOtpRepository.get;
export const updateUserOtp = UserOtpRepository.update;
export const deleteUserOtp = UserOtpRepository.deleteData;
