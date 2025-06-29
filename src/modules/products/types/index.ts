export interface IReviewRequestBody {
  rating: number;
  review: string;
}

export interface IAddProductReview {
  productId: number;
  userId: number;
  requestBody: IReviewRequestBody;
}
