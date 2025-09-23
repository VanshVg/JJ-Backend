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
import { DataTypes } from "sequelize";
import Order from "./orders.model";
import {
  OrderPaymentAttributes,
  PaymentMethod,
  PaymentStatus,
} from "./types/order-payments.type";

@Table({
  tableName: "order_payments",
  timestamps: true,
  paranoid: true,
})
class OrderPayment extends Model<OrderPaymentAttributes> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  id: number;

  @ForeignKey(() => Order)
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  order_id: number;

  @AllowNull(false)
  @Column(DataTypes.ENUM(...Object.values(PaymentMethod)))
  payment_method: PaymentMethod;

  @AllowNull(false)
  @Default(PaymentStatus.Pending)
  @Column(DataTypes.ENUM(...Object.values(PaymentStatus)))
  status: PaymentStatus;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsTo(() => Order)
  order: Order;
}

export default OrderPayment;
