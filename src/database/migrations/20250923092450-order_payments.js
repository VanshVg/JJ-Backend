"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        "order_payments",
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          order_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "orders",
              key: "id",
            },
            onDelete: "CASCADE",
          },
          payment_method: {
            type: Sequelize.ENUM("cod", "upi", "card"),
            allowNull: false,
          },
          status: {
            type: Sequelize.ENUM("pending", "completed"),
            allowNull: false,
            defaultValue: "pending",
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

      await queryInterface.addIndex("order_payments", {
        fields: ["order_id"],
        transaction: t,
      });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable("order_payments", {
        transaction: t,
        cascade: true,
      });
    });
  },
};
