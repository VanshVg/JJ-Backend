import Category from "@/database/models/categories.model";
import ProductImage from "@/database/models/product-images.model";
import { getPagination } from "@/lib/helpers/pagination.helper";
import {
  fetchAllProducts,
  fetchAndCountAllProducts,
} from "@/repositories/products.repository";
import { Request } from "express";
import { Op } from "sequelize";

export const getProductsService = async (req: Request) => {
  const { limit, offset, search, sortDirection, sortField } =
    getPagination(req);

  const { minPrice = 1, maxPrice = 10000, category } = req.query;

  let whereCondition: any = {
    MRP: {
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
    attributes: ["category"],
  };

  if (category) {
    const filteredCategories = String(category).split(",");
    includeCategory.where = {
      category: {
        [Op.in]: filteredCategories,
      },
    };
  } else {
    includeCategory.required = false;
  }

  const { rows: products, count: totalRecords } =
    await fetchAndCountAllProducts({
      where: whereCondition,
      attributes: ["name", "MRP", "available_quantity", "created_at"],
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
        },
      ],
    });

  return { products, totalRecords };
};
