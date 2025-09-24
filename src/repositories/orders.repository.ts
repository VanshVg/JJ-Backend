import { getRepository } from "./base-repository";
import Order from "@/database/models/orders.model";

const OrderRepository = getRepository<Order>(Order.name);

export const createOrder = OrderRepository.create;
export const fetchAllOrders = OrderRepository.getAll;
export const fetchOneOrder = OrderRepository.get;
export const bulkCreateOrders = OrderRepository.bulkCreate;
