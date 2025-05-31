import { bulkCreateCategories } from "@/repositories/category.repository";
import { categoryData } from "./types/constants";
import { logger } from "@/config/logger.config";

const categorySeeder = async () => {
  await bulkCreateCategories(categoryData);
};

categorySeeder()
  .then(() => logger.info(`Created category data successfully`))
  .catch((e) => logger.info(`Error while creating category data`));
