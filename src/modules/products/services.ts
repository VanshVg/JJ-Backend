import Category from "@/database/models/categories.model";
import ProductImage from "@/database/models/product-images.model";
import ProductReview from "@/database/models/product-reviews.model";
import { throwAppError } from "@/lib/helpers/error.helper";
import { getPagination } from "@/lib/helpers/pagination.helper";
import {
  fetchAndCountAllProducts,
  fetchOneProduct,
} from "@/repositories/products.repository";
import { Request } from "express";
import { Op } from "sequelize";
import { PRODUCTS_MESSAGES } from "./messages";
import User from "@/database/models/users.model";

export const getProductsService = async (req: Request) => {
  const { limit, offset, search, sortDirection, sortField } =
    getPagination(req);

  const { minPrice = 1, maxPrice = 10000, category } = req.query;

  let whereCondition: any = {
    selling_price: {
      [Op.between]: [+minPrice, +maxPrice],
    },
  };

  if (search) {
    whereCondition = {
      ...whereCondition,
      [Op.or]: [
        {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        },
        {
          brand: {
            [Op.iLike]: `%${search}%`,
          },
        },
      ],
    };
  }

  let includeCategory: any = {
    model: Category,
    attributes: ["name"],
  };

  if (category) {
    const filteredCategories = String(category).split(",");
    includeCategory.where = {
      name: {
        [Op.in]: filteredCategories,
      },
    };
  } else {
    includeCategory.required = false;
  }

  const { rows: products, count: totalRecords } =
    await fetchAndCountAllProducts({
      where: whereCondition,
      attributes: [
        "id",
        "name",
        "discount",
        "selling_price",
        "MRP",
        "available_quantity",
        "average_rating",
        "created_at",
      ],
      order: [
        [sortField, sortDirection],
        ["id", "ASC"],
      ],
      limit,
      offset,
      include: [
        includeCategory,
        {
          model: ProductImage,
          attributes: ["image_url", "is_primary", "is_secondary"],
          where: {
            [Op.or]: [{ is_primary: true }, { is_secondary: true }],
          },
        },
      ],
    });

  return { products, totalRecords };
};

export const getProductById = async (productId: number) => {
  const product = await fetchOneProduct({
    where: { id: productId },
    attributes: [
      "name",
      "brand",
      "weight",
      "weight_unit",
      "MRP",
      "discount",
      "selling_price",
      "available_quantity",
      "packaging_date",
      "expiry_date",
      "average_rating",
      "description",
      "extra_note",
    ],
    include: [
      {
        model: Category,
        attributes: ["name"],
      },
      {
        model: ProductImage,
        attributes: ["image_url"],
      },
      {
        model: ProductReview,
        attributes: ["rating", "review", "created_at"],
        include: [
          {
            model: User,
            attributes: ["first_name", "last_name"],
          },
        ],
      },
    ],
  });
  if (!product) {
    throwAppError({
      message: PRODUCTS_MESSAGES.PRODUCT_NOT_FOUND,
      statusCode: 404,
      toast: false,
    });
  }

  return product;
};
