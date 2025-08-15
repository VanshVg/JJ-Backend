import { getRepository } from "./base-repository";
import CartProduct from "@/database/models/cart-products.model";

const CartProductRepository = getRepository<CartProduct>(CartProduct.name);

export const createCartProduct = CartProductRepository.create;
export const fetchAllCartProducts = CartProductRepository.getAll;
export const fetchOneCartProduct = CartProductRepository.get;
export const updateCartProduct = CartProductRepository.update;
export const deleteCartProduct = CartProductRepository.deleteData;
export const bulkCreateCartProducts = CartProductRepository.bulkCreate;
