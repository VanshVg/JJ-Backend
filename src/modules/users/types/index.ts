import { AddressType } from "@/database/models/types/user-addresses.type";

export interface IUserAddressBody {
  address_line_1: string;
  address_line_2?: string;
  landmark?: string;
  address_type: AddressType;
  is_primary?: boolean;
  longitude: number;
  latitude: number;
}

export interface IEditProfileBody {
  first_name: string;
  last_name: string;
}
