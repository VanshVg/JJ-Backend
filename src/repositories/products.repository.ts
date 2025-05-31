import { getRepository } from "./base-repository";
import Product from "@/database/models/products.model";

const ProductRepository = getRepository<Product>(Product.name);

export const createProduct = ProductRepository.create;
export const bulkCreateProducts = ProductRepository.bulkCreate;
export const fetchAllProducts = ProductRepository.getAll;
export const fetchOneProduct = ProductRepository.get;
export const updateProduct = ProductRepository.update;
export const deleteProduct = ProductRepository.deleteData;
export const fetchAndCountAllProducts = ProductRepository.getAllData;
