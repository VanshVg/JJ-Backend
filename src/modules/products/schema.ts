import { joiCommon } from "@/lib/validation-schema";
import Joi from "joi";

export const addProductReviewSchema = Joi.object({
  rating: joiCommon.joiNumber.label("Rating").required(),
  review: joiCommon.joiString.label("Review"),
});
