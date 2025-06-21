import { TimeStampAttributes } from ".";

export interface ProductReviewsAttributes extends TimeStampAttributes {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  review: string;
}
