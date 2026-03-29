import Joi from "joi";
import { WeightUnits } from "@/database/models/types/products.type";

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  category_id: Joi.number().integer().required(),
  SKU: Joi.string().required(),
  weight: Joi.number().positive().required(),
  weight_unit: Joi.string()
    .valid(...Object.values(WeightUnits))
    .required(),
  MRP: Joi.number().positive().required(),
  discount: Joi.number().min(0).default(0),
  selling_price: Joi.number().positive().required(),
  available_quantity: Joi.number().integer().min(0).required(),
  packaging_date: Joi.string().isoDate().required(),
  expiry_date: Joi.string().isoDate().required(),
  description: Joi.string().optional().allow(""),
  extra_note: Joi.string().optional().allow(""),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  brand: Joi.string().optional(),
  category_id: Joi.number().integer().optional(),
  SKU: Joi.string().optional(),
  weight: Joi.number().positive().optional(),
  weight_unit: Joi.string()
    .valid(...Object.values(WeightUnits))
    .optional(),
  MRP: Joi.number().positive().optional(),
  discount: Joi.number().min(0).optional(),
  selling_price: Joi.number().positive().optional(),
  available_quantity: Joi.number().integer().min(0).optional(),
  packaging_date: Joi.string().isoDate().optional(),
  expiry_date: Joi.string().isoDate().optional(),
  description: Joi.string().optional().allow(""),
  extra_note: Joi.string().optional().allow(""),
}).min(1);
