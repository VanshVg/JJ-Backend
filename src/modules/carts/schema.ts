import Joi from "joi";

export const addToCartSchema = Joi.object({
  quantity: Joi.number().required().min(1),
});

export const updateCartSchema = Joi.object({
  quantity: Joi.number().optional().min(1),
  is_selected: Joi.boolean().optional(),
});

export const toggleSelectionSchema = Joi.object({
  toggle_type: Joi.boolean().optional(),
});
