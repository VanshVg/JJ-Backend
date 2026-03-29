import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { OrderItemAttributes } from "./types/orders.type";
import Order from "./orders.model";
import Product from "./products.model";

@Table({
  tableName: "order_items",
  timestamps: true,
  paranoid: true,
})
class OrderItem extends Model<OrderItemAttributes> {
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
  @Column(DataTypes.DECIMAL(10, 2))
  price_at_time: number;

  @AllowNull(false)
  @Column(DataTypes.DECIMAL(10, 2))
  discount_at_time: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsTo(() => Order)
  order: Order;

  @BelongsTo(() => Product)
  product: Product;

  readonly toJSON = () => {
    const values = Object.assign({}, this.get());
    return values;
  };
}

export default OrderItem;
