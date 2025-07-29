import Joi from "joi";

export const addToCartSchema = Joi.object({
  quantity: Joi.number().required().min(1),
});
