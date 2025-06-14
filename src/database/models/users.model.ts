import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  Default,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { UserAttributes, UserRoles } from "./types/users.type";
import { DataTypes } from "sequelize";
import ProductReview from "./product-reviews.model";

@Table({
  tableName: "users",
  timestamps: true,
  paranoid: true,
})
class User extends Model<UserAttributes> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  first_name: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  last_name: string;

  @AllowNull(true)
  @Column(DataTypes.STRING)
  email?: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  contact_no: string;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  password?: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataTypes.BOOLEAN)
  is_contact_no_verified?: boolean;

  @AllowNull(false)
  @Default(false)
  @Column(DataTypes.BOOLEAN)
  is_email_verified?: boolean;

  @AllowNull(false)
  @Default(UserRoles.Customer)
  @Column(DataTypes.ENUM(...Object.values(UserRoles)))
  role: UserRoles;

  @AllowNull(true)
  @Column(DataTypes.DATE)
  last_login_at: Date;

  @AllowNull(true)
  @Column(DataTypes.STRING)
  reset_pass_token: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;

  @HasMany(() => ProductReview)
  productReviews: ProductReview[];

  readonly toJSON = () => {
    const values = Object.assign({}, this.get());
    return values;
  };
}

export default User;
