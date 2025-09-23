import { TimeStampAttributes } from ".";

export enum OrderStatus {
  Ordered = "ordered",
  Shipped = "shipped",
  Cancelled = "cancelled",
  Completed = "completed",
}

export interface OrderAttributes extends TimeStampAttributes {
  id: number;
  user_id: number;
  status: OrderStatus;
  address_id: number;
  total_tax: number;
  extra_discount: number;
  final_amount: number;
  tracking_id: string;
}
