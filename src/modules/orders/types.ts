import { PaymentMethod } from "@/database/models/types/orders.type";

export interface IPlaceOrder {
  address_id: number;
  payment_method: PaymentMethod;
  notes?: string;
}
