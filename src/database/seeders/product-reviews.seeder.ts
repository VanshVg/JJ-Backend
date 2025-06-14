import { logger } from "@/config/logger.config";
import { bulkCreateProductImages } from "@/repositories/product-images.repository";
import { productReviewsData } from "./types/constants";
import { fetchOneUser } from "@/repositories/users.repository";

const productReviewsSeeder = async () => {
  const user = await fetchOneUser({ where: { contact_no: "9909530136" } });
  if (user) {
    await bulkCreateProductImages(
      productReviewsData.map((e) => {
        return {
          ...e,
          user_id: user.id,
        };
      })
    );
  }
};

productReviewsSeeder()
  .then(() => logger.info(`Created product reviews data successfully`))
  .catch((e) => logger.error(`Error while creating product reviews data` + e));
