"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        "cart_products",
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          cart_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "carts",
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

      await queryInterface.addIndex("cart_products", {
        fields: ["cart_id"],
        transaction: t,
      });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable("cart_products", {
        transaction: t,
        cascade: true,
      });
    });
  },
};
