import Joi from "joi";

const errorMessage = {
  "string.base": "{#label} should be a type of text",
  "string.min": "{#label} should have a minimum length of {#limit}",
  "string.empty": "{#label} is not allowed to be empty",
  "string.max": "{#label} should be maximum {#limit} characters..",
  "string.pattern.base": "Please enter valid {#label}",
  "any.required": "{#label} is a required field",
};

export const joiCommon = {
  joiString: Joi.string()
    .trim()
    .messages({ ...errorMessage }),
  joiNumber: Joi.number().messages({ ...errorMessage }),
  joiBoolean: Joi.boolean().messages({ ...errorMessage }),
  joiDate: Joi.date()
    .iso()
    .messages({ ...errorMessage }),
  joiArray: Joi.array().messages({ ...errorMessage }),
  joiObject: Joi.object().messages({ ...errorMessage }),
  joiEmail: Joi.string()
    .messages({
      ...errorMessage,
      "string.email": "{#label} must be a valid email",
    })
    .email({ ignoreLength: true })
    .trim()
    .lowercase()
    .options({ convert: true }),
};
