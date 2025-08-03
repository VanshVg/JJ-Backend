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
import Cart from "./carts.model";
import Product from "./products.model";
import { CartProductsAttributes } from "./types/cart-products.type";

@Table({
  tableName: "cart_products",
  timestamps: true,
  paranoid: true,
})
class CartProduct extends Model<CartProductsAttributes> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  id: number;

  @ForeignKey(() => Cart)
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  cart_id: number;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  product_id: number;

  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  quantity: number;

  @AllowNull(false)
  @Default(true)
  @Column(DataTypes.BOOLEAN)
  is_selected: boolean;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsTo(() => Cart)
  cart: Cart;

  @BelongsTo(() => Product)
  product: Product;

  readonly toJSON = () => {
    const values = Object.assign({}, this.get());
    return values;
  };
}

export default CartProduct;
