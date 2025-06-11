import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { CategoryAttributes } from "./types/categories.type";
import { DataTypes } from "sequelize";
import Product from "./products.model";

@Table({
  tableName: "categories",
  timestamps: true,
  paranoid: true,
})
class Category extends Model<CategoryAttributes> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  name: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @HasMany(() => Product)
  products: Product;

  readonly toJSON = () => {
    const values = Object.assign({}, this.get());
    return values;
  };
}

export default Category;
