import { TimeStampAttributes } from ".";

export interface CategoryAttributes extends TimeStampAttributes {
  id: number;
  category: string;
}
