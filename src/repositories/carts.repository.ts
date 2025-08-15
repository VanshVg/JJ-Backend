import { getRepository } from "./base-repository";
import Cart from "@/database/models/carts.model";

const CartRepository = getRepository<Cart>(Cart.name);

export const createCart = CartRepository.create;
export const fetchOneCart = CartRepository.get;
