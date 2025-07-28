import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DeletedAt,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { CartAttributes } from "./types/carts.type";
import { DataTypes } from "sequelize";
import User from "./users.model";

@Table({
  tableName: "carts",
  timestamps: true,
  paranoid: true,
})
class Cart extends Model<CartAttributes> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  user_id: number;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @BelongsTo(() => User)
  user: User;

  readonly toJSON = () => {
    const values = Object.assign({}, this.get());
    return values;
  };
}

export default Cart;
