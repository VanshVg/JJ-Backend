import { AddressType } from "@/database/models/types/user-addresses.type";
import { joiCommon } from "@/lib/validation-schema";
import Joi from "joi";

export const addUserAddressSchema = Joi.object({
  address_line_1: joiCommon.joiString.label("Address line 1").required(),
  address_line_2: joiCommon.joiString.label("Address line 2"),
  landmark: joiCommon.joiString.label("Landmark"),
  address_type: joiCommon.joiString
    .label("Address type")
    .allow(...Object.values(AddressType))
    .required(),
  is_primary: joiCommon.joiBoolean.required(),
  longitude: joiCommon.joiNumber.label("Longitude").required(),
  latitude: joiCommon.joiNumber.label("Latitude").required(),
});

export const editUserProfileSchema = Joi.object({
  first_name: joiCommon.joiString.label("First Name"),
  last_name: joiCommon.joiString.label("Last Name"),
});

export const editUserAddressSchema = Joi.object({
  address_line_1: joiCommon.joiString.label("Address line 1"),
  address_line_2: joiCommon.joiString.label("Address line 2"),
  landmark: joiCommon.joiString.label("Landmark"),
  address_type: joiCommon.joiString
    .label("Address type")
    .allow(...Object.values(AddressType)),
  is_primary: joiCommon.joiBoolean.required(),
  longitude: joiCommon.joiNumber.label("Longitude"),
  latitude: joiCommon.joiNumber.label("Latitude"),
});
