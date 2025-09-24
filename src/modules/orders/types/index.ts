export interface IOrderBody {
  products: {
    id: number;
    quantity: number;
  }[];
  address_id: number;
  extra_discount: number;
}
