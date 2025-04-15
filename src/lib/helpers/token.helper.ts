import { JWT_SECRET } from "@/config/env.config";
import jwt from "jsonwebtoken";

export const generateToken = (data: any, expireTime: number): string => {
  return jwt.sign(
    {
      data,
    },
    JWT_SECRET as string,
    { expiresIn: expireTime }
  );
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET as string);
};
