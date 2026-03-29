import { TimeStampAttributes } from ".";

export enum PaymentMethod {
  COD = "cod",
  Razorpay = "razorpay",
}

export enum PaymentStatus {
  Pending = "pending",
  Paid = "paid",
  Failed = "failed",
  Refunded = "refunded",
}

export enum OrderStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Packed = "packed",
  Dispatched = "dispatched",
  Delivered = "delivered",
  Cancelled = "cancelled",
}

export interface OrderAttributes extends TimeStampAttributes {
  id: number;
  user_id: number;
  address_id: number;
  subtotal: number;
  delivery_fee: number;
  total_amount: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  notes?: string;
}

export interface OrderItemAttributes extends TimeStampAttributes {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_at_time: number;
  discount_at_time: number;
}
