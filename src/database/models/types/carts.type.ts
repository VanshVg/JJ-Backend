import { TimeStampAttributes } from ".";

export interface CartAttributes extends TimeStampAttributes {
  id: number;
  user_id: number;
}
