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
import { OrderAttributes, OrderStatus } from "./types/orders.type";
import { DataTypes } from "sequelize";
import User from "./users.model";
import UserAddress from "./user-addresses.model";

@Table({
  tableName: "orders",
  timestamps: true,
  paranoid: true,
})
class Order extends Model<OrderAttributes> {
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
  @Default(OrderStatus.Ordered)
  @Column(DataTypes.ENUM(...Object.values(OrderStatus)))
  role: OrderStatus;

  @ForeignKey(() => UserAddress)
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  address_id: number;

  @AllowNull(false)
  @Default(0)
  @Column(DataTypes.DECIMAL)
  total_tax: number;

  @AllowNull(false)
  @Default(0)
  @Column(DataTypes.DECIMAL)
  extra_discount: number;

  @AllowNull(false)
  @Column(DataTypes.DECIMAL)
  final_amount: number;

  @AllowNull(false)
  @Column(DataTypes.TEXT)
  tracking_id: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => UserAddress)
  userAddress: UserAddress;
}

export default Order;
