import { TimeStampAttributes } from ".";

export interface CartProductsAttributes extends TimeStampAttributes {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  is_selected: boolean;
}
