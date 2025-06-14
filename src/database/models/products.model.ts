import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { ProductAttributes, WeightUnits } from "./types/products.type";
import Category from "./categories.model";
import ProductImage from "./product-images.model";
import ProductReview from "./product-reviews.model";

@Table({
  tableName: "products",
  timestamps: true,
  paranoid: true,
})
class Product extends Model<ProductAttributes> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  brand: string;

  @ForeignKey(() => Category)
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  category_id: number;

  @Unique(true)
  @AllowNull(false)
  @Column(DataTypes.STRING)
  SKU: string;

  @AllowNull(false)
  @Column(DataTypes.DECIMAL)
  weight: number;

  @AllowNull(false)
  @Column(DataTypes.ENUM(...Object.values(WeightUnits)))
  weight_unit: WeightUnits;

  @AllowNull(false)
  @Column(DataTypes.DECIMAL)
  MRP: number;

  @AllowNull(false)
  @Column(DataTypes.DECIMAL)
  discount: number;

  @AllowNull(false)
  @Column(DataTypes.DECIMAL)
  selling_price: number;

  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  available_quantity: number;

  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  sold_quantity: number;

  @AllowNull(false)
  @Column(DataTypes.DATE)
  packaging_date: Date;

  @AllowNull(false)
  @Column(DataTypes.DATE)
  expiry_date: Date;

  @AllowNull(true)
  @Column(DataTypes.TEXT)
  description?: string;

  @AllowNull(true)
  @Column(DataTypes.STRING)
  extra_note?: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => ProductImage)
  productImages: ProductImage;

  @HasMany(() => ProductReview)
  productReviews: ProductReview[];

  readonly toJSON = () => {
    const values = Object.assign({}, this.get());
    return values;
  };
}

export default Product;
