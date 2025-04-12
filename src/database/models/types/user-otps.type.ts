import { TimeStampAttributes } from ".";

export interface UserOtpAttributes extends TimeStampAttributes {
  id: number;
  user_id: number;
  otp: number;
  expiry_date: Date;
}
