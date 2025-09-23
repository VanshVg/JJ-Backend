import { TimeStampAttributes } from ".";

export enum PaymentMethod {
  Cod = "cod",
  Upi = "upi",
  Card = "card",
}

export enum PaymentStatus {
  Pending = "pending",
  Completed = "completed",
}

export interface OrderPaymentAttributes extends TimeStampAttributes {
  id: number;
  order_id: number;
  payment_method: PaymentMethod;
  status: PaymentStatus;
}
