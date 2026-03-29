import { WeightUnits } from "@/database/models/types/products.type";

export interface ICreateProduct {
  name: string;
  brand: string;
  category_id: number;
  SKU: string;
  weight: number;
  weight_unit: WeightUnits;
  MRP: number;
  discount: number;
  selling_price: number;
  available_quantity: number;
  packaging_date: string;
  expiry_date: string;
  description?: string;
  extra_note?: string;
}

export interface IUpdateProduct extends Partial<ICreateProduct> { }
