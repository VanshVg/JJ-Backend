import {
  AllowNull,
  AutoIncrement,
  BeforeCreate,
  BeforeUpdate,
  Column,
  CreatedAt,
  Default,
  DeletedAt,
  HasOne,
  IsEmail,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { UserAttributes, UserRoles } from "./types/users.type";
import { DataTypes } from "sequelize";
import argon2 from "argon2";
import UserOtp from "./user-otps.model";

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

  @AllowNull(true)
  @Column(DataTypes.STRING)
  first_name?: string;

  @AllowNull(true)
  @Column(DataTypes.STRING)
  last_name?: string;

  @AllowNull(true)
  @Column(DataTypes.STRING)
  @IsEmail
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

  @HasOne(() => UserOtp)
  otp: UserOtp;

  @BeforeCreate
  @BeforeUpdate
  static beforeCreateHook = async (user: User) => {
    if (user?.password && user.changed("password")) {
      user.password = await argon2.hash(user.password);
    }
    if (user?.email && user.changed("email")) {
      user.email = user.email.trim().toLowerCase();
    }
  };

  readonly toJSON = () => {
    const values = Object.assign({}, this.get());
    return values;
  };
}

export default User;
