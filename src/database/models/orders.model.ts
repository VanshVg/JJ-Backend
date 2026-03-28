import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  Default,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import {
  OrderAttributes,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "./types/orders.type";
import User from "./users.model";
import UserAddress from "./user-addresses.model";
import OrderItem from "./order-items.model";

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

  @ForeignKey(() => UserAddress)
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  address_id: number;

  @AllowNull(false)
  @Column(DataTypes.DECIMAL(10, 2))
  subtotal: number;

  @AllowNull(false)
  @Default(0)
  @Column(DataTypes.DECIMAL(10, 2))
  delivery_fee: number;

  @AllowNull(false)
  @Column(DataTypes.DECIMAL(10, 2))
  total_amount: number;

  @AllowNull(false)
  @Column(DataTypes.ENUM(...Object.values(PaymentMethod)))
  payment_method: PaymentMethod;

  @AllowNull(false)
  @Default(PaymentStatus.Pending)
  @Column(DataTypes.ENUM(...Object.values(PaymentStatus)))
  payment_status: PaymentStatus;

  @AllowNull(false)
  @Default(OrderStatus.Pending)
  @Column(DataTypes.ENUM(...Object.values(OrderStatus)))
  order_status: OrderStatus;

  @AllowNull(true)
  @Column(DataTypes.STRING)
  razorpay_order_id?: string;

  @AllowNull(true)
  @Column(DataTypes.STRING)
  razorpay_payment_id?: string;

  @AllowNull(true)
  @Column(DataTypes.TEXT)
  notes?: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => UserAddress)
  address: UserAddress;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  readonly toJSON = () => {
    const values = Object.assign({}, this.get());
    return values;
  };
}

export default Order;
