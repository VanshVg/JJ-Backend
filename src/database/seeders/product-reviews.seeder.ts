import { logger } from "@/config/logger.config";
import { productReviewsData } from "./types/constants";
import { fetchOneUser } from "@/repositories/users.repository";
import {
  bulkCreateProductReviews,
  fetchAllProductReviews,
} from "@/repositories/product-reviews.repository";
import { updateProduct } from "@/repositories/products.repository";

const productReviewsSeeder = async () => {
  const user = await fetchOneUser({ where: { contact_no: "9909530136" } });
  if (user) {
    const data = await bulkCreateProductReviews(
      productReviewsData.map((e) => {
        return {
          ...e,
          user_id: user.id,
        };
      })
    );
    const productIds = [...new Set(data.map((e) => e.product_id))];

    for (const product_id of productIds) {
      const reviews = await fetchAllProductReviews({ where: { product_id } });
      const avg =
        reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0;

      await updateProduct(
        { average_rating: avg },
        { where: { id: product_id } }
      );
    }
  }
};

productReviewsSeeder()
  .then(() => logger.info(`Created product reviews data successfully`))
  .catch((e) => logger.error(`Error while creating product reviews data` + e));
