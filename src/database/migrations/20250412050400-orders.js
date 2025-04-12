"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        "orders",
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "users",
              key: "id",
            },
            onDelete: "CASCADE",
          },
          status: {
            type: Sequelize.ENUM(
              "ordered",
              "shipped",
              "cancelled",
              "completed"
            ),
            allowNull: false,
            defaultValue: "ordered",
          },
          address_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: "user_addresses",
              key: "id",
            },
            onDelete: "CASCADE",
          },
          total_tax: {
            type: Sequelize.DECIMAL,
            allowNull: false,
          },
          discount_amount: {
            type: Sequelize.DECIMAL,
            allowNull: true,
          },
          is_gift_points_used: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          final_amount: {
            type: Sequelize.DECIMAL,
            allowNull: false,
          },
          tracking_id: {
            type: Sequelize.TEXT,
            unique: true,
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

      await queryInterface.addIndex("orders", {
        fields: ["user_id"],
        transaction: t,
      });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable("orders", {
        transaction: t,
        cascade: true,
      });
    });
  },
};
