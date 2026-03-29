import { Request } from "express";
import Category from "@/database/models/categories.model";
import ProductImage from "@/database/models/product-images.model";
import { throwAppError } from "@/lib/helpers/error.helper";
import { getPagination } from "@/lib/helpers/pagination.helper";
import {
  createProduct,
  deleteProduct,
  fetchAndCountAllProducts,
  fetchOneProduct,
  updateProduct,
} from "@/repositories/products.repository";
import { Op } from "sequelize";
import { ADMIN_MESSAGES } from "../messages";
import { ICreateProduct, IUpdateProduct } from "./types";

export const getAllProducts = async (req: Request) => {
  const { limit, offset, search } = getPagination(req);
  const { category, lowStock } = req.query;

  const where: any = {};

  if (search) {
    where[Op.or] = [
      { name: { [Op.iLike]: `%${search}%` } },
      { brand: { [Op.iLike]: `%${search}%` } },
      { SKU: { [Op.iLike]: `%${search}%` } },
    ];
  }

  if (lowStock === "true") {
    where.available_quantity = { [Op.lte]: 10 };
  }

  const categoryInclude: any = {
    model: Category,
    attributes: ["id", "name"],
    required: false,
  };

  if (category) {
    categoryInclude.where = { name: { [Op.iLike]: `%${category}%` } };
    categoryInclude.required = true;
  }

  const { rows: products, count: totalRecords } =
    await fetchAndCountAllProducts({
      where,
      attributes: [
        "id",
        "name",
        "brand",
        "SKU",
        "weight",
        "weight_unit",
        "MRP",
        "discount",
        "selling_price",
        "available_quantity",
        "sold_quantity",
        "expiry_date",
        "created_at",
      ],
      include: [
        categoryInclude,
        {
          model: ProductImage,
          where: { is_primary: true },
          attributes: ["image_url"],
          required: false,
        },
      ],
      order: [["created_at", "DESC"]],
      limit,
      offset,
    });

  return { products, totalRecords };
};

export const getProductById = async (productId: number) => {
  const product = await fetchOneProduct({
    where: { id: productId },
    include: [
      { model: Category, attributes: ["id", "name"] },
      { model: ProductImage, attributes: ["id", "image_url", "is_primary"] },
    ],
  });

  if (!product) {
    throwAppError({
      message: ADMIN_MESSAGES.PRODUCT_NOT_FOUND,
      statusCode: 404,
      toast: false,
    });
  }

  return product;
};

export const createNewProduct = async (data: ICreateProduct) => {
  return createProduct(data as any);
};

export const updateExistingProduct = async (
  productId: number,
  data: IUpdateProduct
) => {
  const product = await fetchOneProduct({ where: { id: productId } });
  if (!product) {
    throwAppError({
      message: ADMIN_MESSAGES.PRODUCT_NOT_FOUND,
      statusCode: 404,
      toast: false,
    });
  }

  await updateProduct(data as any, { where: { id: productId } });
};

export const deleteExistingProduct = async (productId: number) => {
  const product = await fetchOneProduct({ where: { id: productId } });
  if (!product) {
    throwAppError({
      message: ADMIN_MESSAGES.PRODUCT_NOT_FOUND,
      statusCode: 404,
      toast: false,
    });
  }

  await deleteProduct({ where: { id: productId } });
};
