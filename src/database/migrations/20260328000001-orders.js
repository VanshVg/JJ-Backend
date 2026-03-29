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
            references: { model: "users", key: "id" },
            onDelete: "CASCADE",
          },
          address_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: "user_addresses", key: "id" },
            onDelete: "RESTRICT",
          },
          subtotal: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
          },
          delivery_fee: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
          },
          total_amount: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
          },
          payment_method: {
            type: Sequelize.ENUM("cod", "razorpay"),
            allowNull: false,
          },
          payment_status: {
            type: Sequelize.ENUM("pending", "paid", "failed", "refunded"),
            allowNull: false,
            defaultValue: "pending",
          },
          order_status: {
            type: Sequelize.ENUM(
              "pending",
              "confirmed",
              "packed",
              "dispatched",
              "delivered",
              "cancelled"
            ),
            allowNull: false,
            defaultValue: "pending",
          },
          razorpay_order_id: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          razorpay_payment_id: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          notes: {
            type: Sequelize.TEXT,
            allowNull: true,
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
        name: "orders_user_id_idx",
        fields: ["user_id"],
        transaction: t,
      });
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeIndex("orders", "orders_user_id_idx", {
        transaction: t,
      });
      await queryInterface.dropTable("orders", { transaction: t, cascade: true });
      await queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_orders_payment_method";',
        { transaction: t }
      );
      await queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_orders_payment_status";',
        { transaction: t }
      );
      await queryInterface.sequelize.query(
        'DROP TYPE IF EXISTS "enum_orders_order_status";',
        { transaction: t }
      );
    });
  },
};
