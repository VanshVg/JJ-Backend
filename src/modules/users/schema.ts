import { AddressType } from "@/database/models/types/user-addresses.type";
import { joiCommon } from "@/lib/validation-schema";
import Joi from "joi";

export const addUserAddressSchema = Joi.object({
  address_line_1: joiCommon.joiString.label("Address line 1").required(),
  address_line_2: joiCommon.joiString.label("Address line 2"),
  landmark: joiCommon.joiString.label("Landmark").allow(null).optional(),
  address_type: joiCommon.joiString
    .label("Address type")
    .allow(...Object.values(AddressType))
    .required(),
  pincode: joiCommon.joiNumber.label("Pincode"),
});

export const editUserProfileSchema = Joi.object({
  firstname: joiCommon.joiString.label("First Name"),
  lastname: joiCommon.joiString.label("Last Name"),
  contact_no: joiCommon.joiString.label("Contact Number"),
});

export const editUserAddressSchema = Joi.object({
  address_line_1: joiCommon.joiString.label("Address line 1"),
  address_line_2: joiCommon.joiString.label("Address line 2"),
  landmark: joiCommon.joiString.label("Landmark").allow(null).optional(),
  address_type: joiCommon.joiString
    .label("Address type")
    .allow(...Object.values(AddressType)),
  pincode: joiCommon.joiNumber.label("Pincode"),
});

export const changePasswordSchema = Joi.object({
  current_password: joiCommon.joiString.label("Current Password"),
  new_password: joiCommon.joiString.label("New Password"),
  confirm_password: Joi.string().label("Confirm Password"),
});
