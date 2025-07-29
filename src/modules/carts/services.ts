import { fetchOneProduct } from "@/repositories/products.repository";
import { IAddToCart } from "./types";
import { throwAppError } from "@/lib/helpers/error.helper";
import { PRODUCTS_MESSAGES } from "../products/messages";
import { createCart, fetchOneCart } from "@/repositories/carts.repository";
import db from "@/database/models";
import {
  createCartProduct,
  deleteCartProduct,
  fetchAllCartProducts,
  fetchOneCartProduct,
} from "@/repositories/cart-products.repository";
import { CART_MESSAGES } from "./messages";
import Product from "@/database/models/products.model";
import ProductImage from "@/database/models/product-images.model";

export const addToCart = async ({
  requestBody,
  productId,
  userId,
}: IAddToCart) => {
  const transaction = await db.transaction();

  try {
    const { quantity = 1 } = requestBody;

    const product = await fetchOneProduct({
      where: { id: productId },
      attributes: ["id"],
    });
    if (!product) {
      throwAppError({
        message: PRODUCTS_MESSAGES.PRODUCT_NOT_FOUND,
        statusCode: 404,
        toast: true,
      });
    }

    const cart = await fetchOneCart({
      where: { user_id: userId },
      attributes: ["id"],
    });
    let cartId = cart?.id;
    if (!cart) {
      const newCart = await createCart({ user_id: userId }, { transaction });
      cartId = newCart.id;
    }

    const cartProduct = await fetchOneCartProduct({
      where: { cart_id: cartId, product_id: productId },
      attributes: ["id", "quantity"],
      transaction,
    });
    if (cartProduct) {
      await cartProduct.increment("quantity", { by: quantity, transaction });
      await transaction.commit();
      return { ...cartProduct, quantity: cartProduct.quantity + quantity };
    }

    const newCartProduct = await createCartProduct(
      {
        cart_id: cartId,
        product_id: productId,
        quantity,
      },
      { transaction, raw: true }
    );

    await transaction.commit();
    return newCartProduct;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const fetchCartData = async (userId: number) => {
  const cart = await fetchOneCart({
    where: { user_id: userId },
    attributes: ["id"],
  });
  if (!cart) {
    throwAppError({
      message: CART_MESSAGES.CART_NOT_FOUND,
      statusCode: 404,
      toast: false,
    });
  }

  const cartData = await fetchAllCartProducts({
    where: { cart_id: cart.id },
    attributes: ["id", "cart_id", "product_id", "quantity"],
    include: [
      {
        model: Product,
        attributes: ["id", "name", "brand", "selling_price"],
        include: [
          {
            model: ProductImage,
            where: { is_primary: true },
            attributes: ["id", "image_url"],
          },
        ],
      },
    ],
    order: [["created_at", "DESC"]],
  });

  return cartData;
};

export const removeFromCart = async ({
  userId,
  productId,
}: {
  userId: number;
  productId: number;
}) => {
  const cart = await fetchOneCart({
    where: { user_id: userId },
    attributes: ["id"],
  });
  if (!cart) {
    throwAppError({
      message: CART_MESSAGES.CART_NOT_FOUND,
      statusCode: 404,
      toast: false,
    });
  }

  const cartProduct = await fetchOneCartProduct({
    where: { cart_id: cart.id, product_id: productId },
  });
  if (!cartProduct) {
    throwAppError({
      message: CART_MESSAGES.PRODUCT_NOT_IN_CART,
      statusCode: 404,
      toast: false,
    });
  }

  await deleteCartProduct({
    where: { cart_id: cart.id, product_id: productId },
  });

  return;
};
