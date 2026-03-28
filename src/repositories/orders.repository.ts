import { getRepository } from "./base-repository";
import Order from "@/database/models/orders.model";
import OrderItem from "@/database/models/order-items.model";

const OrderRepository = getRepository<Order>(Order.name);
const OrderItemRepository = getRepository<OrderItem>(OrderItem.name);

export const createOrder = OrderRepository.create;
export const fetchOneOrder = OrderRepository.get;
export const fetchAllOrders = OrderRepository.getAll;
export const fetchAndCountAllOrders = OrderRepository.getAllData;
export const updateOrder = OrderRepository.update;

export const createOrderItem = OrderItemRepository.create;
export const bulkCreateOrderItems = OrderItemRepository.bulkCreate;
export const fetchAllOrderItems = OrderItemRepository.getAll;
