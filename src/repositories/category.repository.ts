import Category from "@/database/models/categories.model";
import { getRepository } from "./base-repository";

const CategoryRepository = getRepository<Category>(Category.name);

export const bulkCreateCategories = CategoryRepository.bulkCreate;
