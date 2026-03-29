import { Op } from "sequelize";
import ProductImage from "@/database/models/product-images.model";
import User from "@/database/models/users.model";
import { OrderStatus } from "@/database/models/types/orders.type";
import {
  fetchAllOrders,
  fetchAndCountAllOrders,
} from "@/repositories/orders.repository";
import { fetchAndCountAllProducts } from "@/repositories/products.repository";

export const getDashboardStats = async () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  // Today's orders + revenue
  const todayOrders = await fetchAllOrders({
    where: { created_at: { [Op.gte]: startOfDay } },
    attributes: ["id", "total_amount", "order_status"],
  });

  const todayRevenue = todayOrders.reduce(
    (sum, o) => sum + Number(o.total_amount),
    0
  );

  // Pending orders count
  const { count: pendingOrders } = await fetchAndCountAllOrders({
    where: { order_status: OrderStatus.Pending },
  });

  // Low stock count (≤ 10 units)
  const { count: lowStockItems } = await fetchAndCountAllProducts({
    where: { available_quantity: { [Op.lte]: 10 } },
  });

  // Recent 10 orders with customer info
  const recentOrders = await fetchAllOrders({
    attributes: [
      "id",
      "total_amount",
      "order_status",
      "payment_method",
      "payment_status",
      "created_at",
    ],
    include: [
      {
        model: User,
        attributes: ["id", "first_name", "last_name", "contact_no"],
      },
    ],
    order: [["created_at", "DESC"]],
    limit: 10,
  });

  // Low stock products list
  const { rows: lowStockProducts } = await fetchAndCountAllProducts({
    where: { available_quantity: { [Op.lte]: 10 } },
    attributes: ["id", "name", "brand", "available_quantity"],
    include: [
      {
        model: ProductImage,
        where: { is_primary: true },
        attributes: ["image_url"],
        required: false,
      },
    ],
    order: [["available_quantity", "ASC"]],
    limit: 10,
  });

  return {
    todayOrdersCount: todayOrders.length,
    todayRevenue,
    pendingOrders,
    lowStockItems,
    recentOrders,
    lowStockProducts,
  };
};
