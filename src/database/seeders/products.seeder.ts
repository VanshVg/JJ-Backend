import { logger } from "@/config/logger.config";
import { bulkCreateProducts } from "@/repositories/products.repository";
import { productsData } from "./types/constants";

const productsSeeder = async () => {
  await bulkCreateProducts(productsData);
};

productsSeeder()
  .then(() => logger.info(`Created product data successfully`))
  .catch((e) => logger.info(`Error while creating product data`));
