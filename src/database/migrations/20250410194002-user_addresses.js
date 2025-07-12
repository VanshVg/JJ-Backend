"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        "user_addresses",
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          user_id: {
            type: Sequelize.INTEGER,
            references: {
              model: "users",
              key: "id",
            },
            onDelete: "CASCADE",
          },
          address_line_1: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          address_line_2: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          landmark: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          pincode: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
              min: 100000,
              max: 999999,
            },
          },
          address_type: {
            type: Sequelize.ENUM("home", "office", "other"),
            allowNull: false,
          },
          is_primary: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          longitude: {
            type: Sequelize.DECIMAL(10, 6),
            allowNull: false,
          },
          latitude: {
            type: Sequelize.DECIMAL(10, 6),
            allowNull: false,
          },
          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
          updated_at: { type: Sequelize.DATE, allowNull: false },
          deleted_at: { type: Sequelize.DATE },
        },
        { transaction: t }
      );

      await queryInterface.addIndex("user_addresses", {
        name: "user_addresses_user_id_unique_active",
        fields: ["user_id"],
        unique: true,
        transaction: t,
      });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeIndex(
        "user_addresses",
        "user_addresses_user_id_unique_active",
        {
          transaction: t,
        }
      );
      await queryInterface.dropTable("user_addresses", {
        transaction: t,
        cascade: true,
      });
    });
  },
};
