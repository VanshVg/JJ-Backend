import { joiCommon } from "@/lib/validation-schema";
import Joi from "joi";

export const addOrderSchema = Joi.object({
  address_id: joiCommon.joiNumber.required().label("Address id"),
  products: Joi.array()
    .items(
      Joi.object({
        id: joiCommon.joiNumber.required().label("Product id"),
        quantity: joiCommon.joiNumber.required().label("Product quantity"),
      })
    )
    .min(1)
    .required(),
  extra_discount: joiCommon.joiBoolean.label("Extra discount"),
});
