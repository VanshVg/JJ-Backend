import { TimeStampAttributes } from ".";

export interface OrderProductAttributes extends TimeStampAttributes {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_amount: number;
  discount: number;
  final_amount: number;
}
