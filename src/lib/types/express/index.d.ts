import { UserAttributes } from "@/database/models/types/users.type";

declare global {
  namespace Express {
    interface User extends UserAttributes {}
    interface Request {
      user: User;
    }
  }
}

export {};
