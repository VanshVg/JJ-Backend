import db from "@/database/models";
import OrderItem from "@/database/models/order-items.model";
import Order from "@/database/models/orders.model";
import Product from "@/database/models/products.model";
import ProductImage from "@/database/models/product-images.model";
import UserAddress from "@/database/models/user-addresses.model";
import { OrderStatus, PaymentMethod } from "@/database/models/types/orders.type";
import { throwAppError } from "@/lib/helpers/error.helper";
import { getPagination } from "@/lib/helpers/pagination.helper";
import {
  fetchAllCartProducts,
  deleteCartProduct,
} from "@/repositories/cart-products.repository";
import { fetchOneCart } from "@/repositories/carts.repository";
import {
  bulkCreateOrderItems,
  createOrder,
  fetchAndCountAllOrders,
  fetchOneOrder,
  updateOrder,
} from "@/repositories/orders.repository";
import { fetchOneProduct } from "@/repositories/products.repository";
import { fetchOneUserAddress } from "@/repositories/user-addresses.repository";
import { Request } from "express";
import { IPlaceOrder } from "./types";
import { ORDER_MESSAGES } from "./messages";

const DELIVERY_PINCODE = "393001";
const FREE_DELIVERY_THRESHOLD = 500;
const DELIVERY_FEE = 15;

export const placeOrder = async (userId: number, data: IPlaceOrder) => {
  const transaction = await db.transaction();
  try {
    // Validate address belongs to user and is in delivery zone
    const address = await fetchOneUserAddress({
      where: { id: data.address_id, user_id: userId },
    });
    if (!address) {
      throwAppError({
        message: ORDER_MESSAGES.INVALID_ADDRESS,
        statusCode: 404,
        toast: true,
      });
    }
    if (String(address.pincode) !== DELIVERY_PINCODE) {
      throwAppError({
        message: ORDER_MESSAGES.INVALID_PINCODE,
        statusCode: 400,
        toast: true,
      });
    }

    // Get selected cart items
    const cart = await fetchOneCart({ where: { user_id: userId } });
    if (!cart) {
      throwAppError({
        message: ORDER_MESSAGES.CART_EMPTY,
        statusCode: 400,
        toast: true,
      });
    }

    const cartItems = await fetchAllCartProducts({
      where: { cart_id: cart.id, is_selected: true },
      include: [
        {
          model: Product,
          attributes: ["id", "selling_price", "MRP", "discount", "available_quantity", "name"],
        },
      ],
    });

    if (!cartItems || cartItems.length === 0) {
      throwAppError({
        message: ORDER_MESSAGES.CART_EMPTY,
        statusCode: 400,
        toast: true,
      });
    }

    // Validate stock
    for (const item of cartItems) {
      if (item.quantity > item.product.available_quantity) {
        throwAppError({
          message: `${ORDER_MESSAGES.STOCK_INSUFFICIENT}: ${item.product.name}`,
          statusCode: 400,
          toast: true,
        });
      }
    }

    // Calculate totals
    const subtotal = cartItems.reduce(
      (acc, item) => acc + Number(item.product.selling_price) * item.quantity,
      0
    );
    const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
    const totalAmount = subtotal + deliveryFee;

    // Create order
    const order = await createOrder(
      {
        user_id: userId,
        address_id: data.address_id,
        subtotal,
        delivery_fee: deliveryFee,
        total_amount: totalAmount,
        payment_method: data.payment_method,
        notes: data.notes,
      },
      { transaction }
    );

    // Create order items + deduct stock
    const orderItemsData = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product.id,
      quantity: item.quantity,
      price_at_time: Number(item.product.selling_price),
      discount_at_time: Number(item.product.discount),
    }));

    await bulkCreateOrderItems(orderItemsData, { transaction });

    // Deduct stock and increment sold_quantity for each product
    for (const item of cartItems) {
      await fetchOneProduct({ where: { id: item.product.id } }).then(
        async (product) => {
          if (product) {
            product.available_quantity -= item.quantity;
            product.sold_quantity += item.quantity;
            await product.save({ transaction });
          }
        }
      );
    }

    // Remove selected items from cart
    for (const item of cartItems) {
      await deleteCartProduct({
        where: { id: item.id },
        transaction,
      } as any);
    }

    await transaction.commit();

    // Return order with items
    return fetchOneOrder({
      where: { id: order.id },
      include: [
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
          attributes: ["address_line_1", "address_line_2", "landmark", "pincode", "address_type"],
        },
      ],
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const getOrders = async (req: Request) => {
  const { limit, offset } = getPagination(req);
  const userId = req.user.id;

  const { rows: orders, count: totalRecords } = await fetchAndCountAllOrders({
    where: { user_id: userId },
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
        model: OrderItem,
        attributes: ["id", "quantity", "price_at_time"],
        include: [
          {
            model: Product,
            attributes: ["id", "name", "brand"],
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

export const getOrderById = async (userId: number, orderId: number) => {
  const order = await fetchOneOrder({
    where: { id: orderId, user_id: userId },
    include: [
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
      message: ORDER_MESSAGES.ORDER_NOT_FOUND,
      statusCode: 404,
      toast: false,
    });
  }

  return order;
};

export const cancelOrder = async (userId: number, orderId: number) => {
  const order = await fetchOneOrder({
    where: { id: orderId, user_id: userId },
    include: [{ model: OrderItem }],
  });

  if (!order) {
    throwAppError({
      message: ORDER_MESSAGES.ORDER_NOT_FOUND,
      statusCode: 404,
      toast: false,
    });
  }

  const cancellableStatuses = [OrderStatus.Pending, OrderStatus.Confirmed];
  if (!cancellableStatuses.includes(order.order_status)) {
    throwAppError({
      message: ORDER_MESSAGES.CANNOT_CANCEL,
      statusCode: 400,
      toast: true,
    });
  }

  const transaction = await db.transaction();
  try {
    // Restore stock
    for (const item of order.orderItems) {
      const product = await fetchOneProduct({ where: { id: item.product_id } });
      if (product) {
        product.available_quantity += item.quantity;
        product.sold_quantity = Math.max(0, product.sold_quantity - item.quantity);
        await product.save({ transaction });
      }
    }

    await updateOrder(
      { order_status: OrderStatus.Cancelled },
      { where: { id: orderId }, transaction }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
