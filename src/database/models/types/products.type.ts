import { TimeStampAttributes } from ".";

export enum WeightUnits {
  Lbs = "lbs",
  Gram = "g",
  Kg = "kg",
}

export interface ProductAttributes extends TimeStampAttributes {
  id: number;
  name: string;
  brand: string;
  category_id: number;
  SKU: string;
  weight: number;
  weight_unit: WeightUnits;
  MRP: number;
  available_quantity: number;
  sold_quantity: number;
  packaging_date: Date;
  expiry_date: Date;
  average_rating?: number;
  description?: string;
  extra_note?: string;
}
