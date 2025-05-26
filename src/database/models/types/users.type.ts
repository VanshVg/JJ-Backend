import { TimeStampAttributes } from ".";

export enum UserRoles {
  Admin = "admin",
  Customer = "customer",
}

export interface UserAttributes extends TimeStampAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  contact_no: string;
  password: string;
  is_contact_no_verified: boolean;
  is_email_verified: boolean;
  role: UserRoles;
  last_login_at?: Date;
  reset_pass_token?: string;
}
