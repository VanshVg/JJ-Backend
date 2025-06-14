"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        "product_reviews",
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
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
          user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "users",
              key: "id",
            },
            onDelete: "CASCADE",
          },
          rating: {
            type: Sequelize.DECIMAL,
            allowNull: false,
            defaultValue: 1,
          },
          review: {
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

      await queryInterface.addIndex("product_reviews", {
        fields: ["product_id"],
        transaction: t,
      });
      await queryInterface.addIndex("product_reviews", {
        fields: ["rating"],
        transaction: t,
      });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable("product_reviews", {
        transaction: t,
        cascade: true,
      });
    });
  },
};
