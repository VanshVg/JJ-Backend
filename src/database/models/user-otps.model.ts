import {
  AllowNull,
  AutoIncrement,
  BeforeCreate,
  BeforeUpdate,
  BelongsTo,
  Column,
  CreatedAt,
  Default,
  DeletedAt,
  IsEmail,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { UserAttributes, UserRoles } from "./types/users.type";
import { DataTypes } from "sequelize";
import argon2 from "argon2";
import User from "./users.model";
import { UserOtpAttributes } from "./types/user-otps.type";

@Table({
  tableName: "user_otps",
  timestamps: true,
  paranoid: true,
})
class UserOtp extends Model<UserOtpAttributes> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  user_id: number;

  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  otp: number;

  @AllowNull(false)
  @Column(DataTypes.DATE)
  expiry_date: Date;

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

export default UserOtp;
