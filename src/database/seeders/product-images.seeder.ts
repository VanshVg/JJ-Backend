import { productImagesData } from "./types/constants";
import { logger } from "@/config/logger.config";
import { bulkCreateProductImages } from "@/repositories/product-images.repository";

const productImagesSeeder = async () => {
  await bulkCreateProductImages(productImagesData);
};

productImagesSeeder()
  .then(() => logger.info(`Created product images data successfully`))
  .catch((e) => logger.error(`Error while creating product images data` + e));
