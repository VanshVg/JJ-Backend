"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        "order_items",
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
            references: { model: "orders", key: "id" },
            onDelete: "CASCADE",
          },
          product_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: "products", key: "id" },
            onDelete: "RESTRICT",
          },
          quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          price_at_time: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
          },
          discount_at_time: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
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

      await queryInterface.addIndex("order_items", {
        name: "order_items_order_id_idx",
        fields: ["order_id"],
        transaction: t,
      });
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeIndex(
        "order_items",
        "order_items_order_id_idx",
        { transaction: t }
      );
      await queryInterface.dropTable("order_items", {
        transaction: t,
        cascade: true,
      });
    });
  },
};
