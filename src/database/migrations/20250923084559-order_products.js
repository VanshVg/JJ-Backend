"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        "order_products",
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
          product_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "products",
              key: "id",
            },
            onDelete: "CASCADE",
          },
          quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
          },
          unit_amount: {
            type: Sequelize.DECIMAL,
            allowNull: false,
          },
          discount: {
            type: Sequelize.DECIMAL,
            allowNull: true,
          },
          final_amount: {
            type: Sequelize.DECIMAL,
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

      await queryInterface.addIndex("order_products", {
        fields: ["order_id"],
        transaction: t,
      });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable("order_products", {
        transaction: t,
        cascade: true,
      });
    });
  },
};
