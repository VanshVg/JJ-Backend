import { TimeStampAttributes } from ".";

export interface ProductImagesAttributes extends TimeStampAttributes {
  id: number;
  product_id: number;
  image_url: string;
  alt_name?: string;
  is_primary: boolean;
  is_secondary: boolean;
}
