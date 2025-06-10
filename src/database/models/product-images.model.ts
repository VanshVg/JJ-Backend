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
  Unique,
  UpdatedAt,
} from "sequelize-typescript";
import { ProductImagesAttributes } from "./types/product-images.type";
import { DataTypes } from "sequelize";
import Product from "./products.model";

@Table({
  tableName: "product_images",
  timestamps: true,
  paranoid: true,
})
class ProductImage extends Model<ProductImagesAttributes> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  id: number;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  product_id: number;

  @Unique
  @AllowNull(false)
  @Column(DataTypes.STRING)
  image_url: string;

  @AllowNull(true)
  @Column(DataTypes.STRING)
  alt_name: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataTypes.BOOLEAN)
  is_primary: boolean;

  @AllowNull(false)
  @Default(false)
  @Column(DataTypes.BOOLEAN)
  is_secondary: boolean;

  @CreatedAt
  @Column({ field: "created_at" })
  created_at: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updated_at: Date;

  @DeletedAt
  @Column({ field: "deleted_at" })
  deleted_at: Date;

  @BelongsTo(() => Product)
  product: Product;

  readonly toJSON = () => {
    const values = Object.assign({}, this.get());
    return values;
  };
}

export default ProductImage;
