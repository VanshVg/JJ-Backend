"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        "order_returns",
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
          reason: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          status: {
            type: Sequelize.ENUM("pending", "approved", "rejected", "refunded"),
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

      await queryInterface.addIndex("order_returns", {
        fields: ["order_id"],
        transaction: t,
      });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable("order_returns", {
        transaction: t,
        cascade: true,
      });
    });
  },
};
