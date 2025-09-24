import { IOrderBody } from "./types";
import { fetchAllProducts } from "@/repositories/products.repository";
import { Op } from "sequelize";
import { throwAppError } from "@/lib/helpers/error.helper";
import { ORDER_MESSAGES } from "./messages";
import db from "@/database/models";
import {
  bulkCreateOrders,
  createOrder,
} from "@/repositories/orders.repository";
import { TOTAL_TAX } from "./types/constant";

export const addOrder = async (requestBody: IOrderBody, userId: number) => {
  const transaction = await db.transaction();

  try {
    const { products: bodyProducts, address_id, extra_discount } = requestBody;

    const productIds = [...new Set(bodyProducts.map((e) => e.id))];

    const products = await fetchAllProducts({
      where: {
        id: {
          [Op.in]: productIds,
        },
      },
    });

    if (products.length !== productIds.length) {
      throwAppError({
        message: ORDER_MESSAGES.PRODUCT_MISSING,
        statusCode: 404,
        toast: true,
      });
    }

    const finalAmount = products.reduce(
      (acc, product) =>
        acc +
        (product.selling_price -
          (product.selling_price * product.discount) / 100),
      0
    );

    const order = await createOrder(
      {
        user_id: userId,
        address_id,
        total_tax: TOTAL_TAX,
        extra_discount,
        final_amount: finalAmount,
      },
      { transaction }
    );

    await bulkCreateOrders(
      bodyProducts.map((product) => {
        const existingProduct = products.find((e) => e.id === product.id);

        const unitAmount =
          existingProduct.selling_price -
          (existingProduct.selling_price * existingProduct.discount) / 100;

        return {
          order_id: order.id,
          product_id: product.id,
          quantity: product.quantity,
          unit_amount: unitAmount,
          discount: existingProduct.discount,
          final_amount: unitAmount * product.quantity,
        };
      }),
      { transaction }
    );

    await transaction.commit();

    return order;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
