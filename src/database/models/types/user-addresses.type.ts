import { TimeStampAttributes } from ".";

export enum AddressType {
  Home = "home",
  Office = "office",
  Other = "other",
}

export interface UserAddressAttributes extends TimeStampAttributes {
  id: number;
  user_id: number;
  address_line_1: string;
  address_line_2?: string;
  landmark: string;
  pincode: number;
  address_type: AddressType;
  is_primary: boolean;
  longitude: number;
  latitude: number;
}
