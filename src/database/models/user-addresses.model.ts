import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  Default,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import {
  AddressType,
  UserAddressAttributes,
} from "./types/user-addresses.type";
import { DataTypes } from "sequelize";
import User from "./users.model";

@Table({
  tableName: "user_addresses",
  timestamps: true,
  paranoid: true,
})
class UserAddress extends Model<UserAddressAttributes> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  user_id: number;

  @AllowNull(false)
  @Column(DataTypes.TEXT)
  address_line_1: string;

  @AllowNull(true)
  @Column(DataTypes.TEXT)
  address_line_2: string;

  @AllowNull(true)
  @Column(DataTypes.STRING)
  landmark: string;

  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  pincode: string;

  @AllowNull(false)
  @Column(DataTypes.ENUM(...Object.values(AddressType)))
  address_type: AddressType;

  @AllowNull(false)
  @Default(false)
  @Column(DataTypes.BOOLEAN)
  is_primary: boolean;

  @AllowNull(false)
  @Column(DataTypes.DECIMAL(10, 6))
  longitude: number;

  @AllowNull(false)
  @Column(DataTypes.DECIMAL(10, 6))
  latitude: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsTo(() => User)
  user: User;

  readonly toJSON = () => {
    const values = Object.assign({}, this.get());
    return values;
  };
}

export default UserAddress;
