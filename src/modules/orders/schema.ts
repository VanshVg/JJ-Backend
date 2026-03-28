import Joi from "joi";
import { PaymentMethod } from "@/database/models/types/orders.type";

export const placeOrderSchema = Joi.object({
  address_id: Joi.number().integer().required(),
  payment_method: Joi.string()
    .valid(...Object.values(PaymentMethod))
    .required(),
  notes: Joi.string().max(500).optional().allow("", null),
});
