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
import { OrderProductAttributes } from "./types/order-products.type";
import Order from "./orders.model";
import Product from "./products.model";

@Table({
  tableName: "order_products",
  timestamps: true,
  paranoid: true,
})
class OrderProduct extends Model<OrderProductAttributes> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  id: number;

  @ForeignKey(() => Order)
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  order_id: number;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  product_id: number;

  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  quantity: number;

  @AllowNull(false)
  @Column(DataTypes.DECIMAL)
  unit_amount: number;

  @AllowNull(false)
  @Default(0)
  @Column(DataTypes.DECIMAL)
  discount: number;

  @AllowNull(false)
  @Column(DataTypes.DECIMAL)
  final_amount: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => Product)
  products: Product;
}

export default OrderProduct;
