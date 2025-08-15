export interface IAddToCart {
  requestBody: { quantity: number };
  productId: number;
  userId: number;
}

export interface ICartData {
  productId: number;
  quantity: number;
  is_selected: boolean;
}
