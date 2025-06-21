"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        "products",
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          brand: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          category_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: "categories",
              key: "id",
            },
            onDelete: "CASCADE",
          },
          SKU: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: true,
          },
          weight: {
            type: Sequelize.DECIMAL,
            allowNull: false,
          },
          weight_unit: {
            type: Sequelize.ENUM("lbs", "g", "kg"),
            allowNull: false,
          },
          MRP: {
            type: Sequelize.DECIMAL,
            allowNull: false,
          },
          discount: {
            type: Sequelize.DECIMAL,
            allowNull: true,
          },
          selling_price: {
            type: Sequelize.DECIMAL,
            allowNull: false,
          },
          available_quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },
          sold_quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
          },
          packaging_date: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          expiry_date: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          average_rating: {
            type: Sequelize.DECIMAL,
            allowNull: true,
          },
          description: {
            type: Sequelize.TEXT,
            allowNull: true,
          },
          extra_note: {
            type: Sequelize.TEXT,
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

      await queryInterface.addIndex("products", {
        fields: ["name"],
        transaction: t,
      });
      await queryInterface.addIndex("products", {
        fields: ["brand"],
        transaction: t,
      });
      await queryInterface.addIndex("products", {
        fields: ["category_id"],
        transaction: t,
      });
      await queryInterface.addIndex("products", {
        fields: ["SKU"],
        transaction: t,
      });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable("products", {
        transaction: t,
        cascade: true,
      });
    });
  },
};
