import { Router } from "express";
import { NextFunction, Request, Response } from "express";
import { getRepository } from "@/repositories/base-repository";
import Category from "@/database/models/categories.model";
import { generalResponse } from "@/lib/helpers/response.helper";

const CategoryRepository = getRepository<Category>(Category.name);

const adminCategoryRoutes = (): Router => {
  const router = Router();

  // Public — used by product form
  router.get(
    "/categories",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const categories = await CategoryRepository.getAll({
          attributes: ["id", "name"],
          order: [["name", "ASC"]],
        });
        return generalResponse({
          response: res,
          data: categories,
          message: "Categories fetched.",
          statusCode: 200,
          toast: false,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  return router;
};

export default adminCategoryRoutes;
