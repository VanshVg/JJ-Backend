"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        "product_images",
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
          image_url: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          alt_name: {
            type: Sequelize.STRING,
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

      await queryInterface.addIndex("product_images", {
        fields: ["product_id"],
        unique: true,
        transaction: t,
      });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable("product_images", {
        transaction: t,
        cascade: true,
      });
    });
  },
};
