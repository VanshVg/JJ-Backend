import ProductImage from "@/database/models/product-images.model";
import { getRepository } from "./base-repository";

const ProductImageRepository = getRepository<ProductImage>(ProductImage.name);

export const bulkCreateProductImages = ProductImageRepository.bulkCreate;
