import { joiCommon } from "@/lib/validation-schema";
import Joi from "joi";

const joiData = {
  contact_no: joiCommon.joiString.label("Contact Number"),
  password: joiCommon.joiString.label("Password"),
};

export const registerSchema = Joi.object({
  contact_no: joiData.contact_no.required(),
  password: joiData.password.required(),
});
