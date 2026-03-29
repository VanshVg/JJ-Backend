import { Request } from "express";
import { Op } from "sequelize";
import Order from "@/database/models/orders.model";
import { UserRoles } from "@/database/models/types/users.type";
import { throwAppError } from "@/lib/helpers/error.helper";
import { getPagination } from "@/lib/helpers/pagination.helper";
import { fetchAllUsers, fetchOneUser } from "@/repositories/users.repository";
import { fetchAndCountAllOrders } from "@/repositories/orders.repository";
import { ADMIN_MESSAGES } from "../messages";
import db from "@/database/models";

export const getAllCustomers = async (req: Request) => {
  const { limit, offset, search } = getPagination(req);

  const where: any = { role: UserRoles.Customer };

  if (search) {
    where[Op.or] = [
      { first_name: { [Op.iLike]: `%${search}%` } },
      { last_name: { [Op.iLike]: `%${search}%` } },
      { contact_no: { [Op.iLike]: `%${search}%` } },
    ];
  }

  const customers = await fetchAllUsers({
    where,
    attributes: [
      "id",
      "first_name",
      "last_name",
      "contact_no",
      "email",
      "created_at",
    ],
    include: [
      {
        model: Order,
        attributes: ["id", "total_amount", "created_at"],
        required: false,
      },
    ],
    order: [["created_at", "DESC"]],
    limit,
    offset,
  });

  // Attach order stats
  const customersWithStats = customers.map((c: any) => {
    const orders = c.orders || [];
    return {
      ...c.toJSON(),
      orderCount: orders.length,
      totalSpent: orders.reduce(
        (sum: number, o: any) => sum + Number(o.total_amount),
        0
      ),
    };
  });

  // Total count
  const total = await db.models["User"].count({ where });

  return { customers: customersWithStats, totalRecords: total };
};

export const getCustomerById = async (customerId: number) => {
  const customer = await fetchOneUser({
    where: { id: customerId, role: UserRoles.Customer },
    attributes: [
      "id",
      "first_name",
      "last_name",
      "contact_no",
      "email",
      "created_at",
    ],
  });

  if (!customer) {
    throwAppError({
      message: ADMIN_MESSAGES.CUSTOMER_NOT_FOUND,
      statusCode: 404,
      toast: false,
    });
  }

  const { rows: orders, count: totalOrders } = await fetchAndCountAllOrders({
    where: { user_id: customerId },
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
    order: [["created_at", "DESC"]],
  });

  const totalSpent = orders.reduce(
    (sum, o) => sum + Number(o.total_amount),
    0
  );

  return { customer, orders, totalOrders, totalSpent };
};
