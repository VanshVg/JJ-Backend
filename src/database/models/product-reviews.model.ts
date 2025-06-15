import {
  AfterCreate,
  AfterUpdate,
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
import { ProductReviewsAttributes } from "./types/product-reviews.type";
import User from "./users.model";
import { fetchAllProductReviews } from "@/repositories/product-reviews.repository";
import { updateProduct } from "@/repositories/products.repository";

@Table({
  tableName: "product_reviews",
  timestamps: true,
  paranoid: true,
})
class ProductReview extends Model<ProductReviewsAttributes> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  id: number;

  @ForeignKey(() => Product)
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  product_id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  user_id: number;

  @AllowNull(false)
  @Default(1)
  @Column(DataTypes.DECIMAL)
  rating: number;

  @AllowNull(true)
  @Column(DataTypes.TEXT)
  review: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => User)
  user: User;

  @AfterCreate
  @AfterUpdate
  static async updateAverageRating(instance: ProductReview) {
    const { product_id } = instance;

    const reviews = await ProductReview.findAll({
      where: { product_id },
      attributes: ["rating"],
    });

    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avg = total / reviews.length;

    await Product.update(
      { average_rating: avg },
      { where: { id: product_id } }
    );
  }

  readonly toJSON = () => {
    const values = Object.assign({}, this.get());
    return values;
  };
}

export default ProductReview;
