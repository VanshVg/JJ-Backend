import ProductReview from "@/database/models/product-reviews.model";
import { getRepository } from "./base-repository";

const ProductReviewRepository = getRepository<ProductReview>(
  ProductReview.name
);

export const bulkCreateProductReviews = ProductReviewRepository.bulkCreate;
export const fetchAllProductReviews = ProductReviewRepository.getAll;
export const fetchOneProductReview = ProductReviewRepository.get;
export const createProductReview = ProductReviewRepository.create;
