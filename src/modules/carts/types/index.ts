export interface IAddToCart {
  requestBody: { quantity: number };
  productId: number;
  userId: number;
}
