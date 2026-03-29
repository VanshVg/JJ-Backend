import { Request } from "express";
import { Op } from "sequelize";
import OrderItem from "@/database/models/order-items.model";
import Product from "@/database/models/products.model";
import ProductImage from "@/database/models/product-images.model";
import UserAddress from "@/database/models/user-addresses.model";
import User from "@/database/models/users.model";
import { OrderStatus } from "@/database/models/types/orders.type";
import { throwAppError } from "@/lib/helpers/error.helper";
import { getPagination } from "@/lib/helpers/pagination.helper";
import {
  fetchAndCountAllOrders,
  fetchOneOrder,
  updateOrder,
} from "@/repositories/orders.repository";
import { ADMIN_MESSAGES } from "../messages";

export const getAllOrders = async (req: Request) => {
  const { limit, offset } = getPagination(req);
  const { status, search } = req.query;

  const where: any = {};

  if (status) {
    where.order_status = status;
  }

  const userWhere: any = {};
  if (search) {
    userWhere[Op.or] = [
      { first_name: { [Op.iLike]: `%${search}%` } },
      { last_name: { [Op.iLike]: `%${search}%` } },
      { contact_no: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const { rows: orders, count: totalRecords } = await fetchAndCountAllOrders({
    where,
    attributes: [
      "id",
      "subtotal",
      "delivery_fee",
      "total_amount",
      "payment_method",
      "payment_status",
      "order_status",
      "created_at",
    ],
    include: [
      {
        model: User,
        attributes: ["id", "first_name", "last_name", "contact_no"],
        where: Object.keys(userWhere).length ? userWhere : undefined,
        required: Object.keys(userWhere).length > 0,
      },
      {
        model: OrderItem,
        attributes: ["id", "quantity", "price_at_time"],
        include: [
          {
            model: Product,
            attributes: ["id", "name"],
            include: [
              {
                model: ProductImage,
                where: { is_primary: true },
                attributes: ["image_url"],
                required: false,
              },
            ],
          },
        ],
      },
    ],
    order: [["created_at", "DESC"]],
    limit,
    offset,
  });

  return { orders, totalRecords };
};

export const getAdminOrderById = async (orderId: number) => {
  const order = await fetchOneOrder({
    where: { id: orderId },
    include: [
      {
        model: User,
        attributes: ["id", "first_name", "last_name", "contact_no", "email"],
      },
      {
        model: OrderItem,
        include: [
          {
            model: Product,
            attributes: ["id", "name", "brand", "weight", "weight_unit"],
            include: [
              {
                model: ProductImage,
                where: { is_primary: true },
                attributes: ["image_url"],
                required: false,
              },
            ],
          },
        ],
      },
      {
        model: UserAddress,
        attributes: [
          "address_line_1",
          "address_line_2",
          "landmark",
          "pincode",
          "address_type",
        ],
      },
    ],
  });

  if (!order) {
    throwAppError({
      message: ADMIN_MESSAGES.ORDER_NOT_FOUND,
      statusCode: 404,
      toast: false,
    });
  }

  return order;
};

export const updateOrderStatus = async (
  orderId: number,
  order_status: OrderStatus
) => {
  const order = await fetchOneOrder({ where: { id: orderId } });
  if (!order) {
    throwAppError({
      message: ADMIN_MESSAGES.ORDER_NOT_FOUND,
      statusCode: 404,
      toast: false,
    });
  }

  await updateOrder({ order_status }, { where: { id: orderId } });
};

export const markOrderPaid = async (orderId: number) => {
  const order = await fetchOneOrder({ where: { id: orderId } });
  if (!order) {
    throwAppError({
      message: ADMIN_MESSAGES.ORDER_NOT_FOUND,
      statusCode: 404,
      toast: false,
    });
  }

  await updateOrder({ payment_status: "paid" as any }, { where: { id: orderId } });
};
