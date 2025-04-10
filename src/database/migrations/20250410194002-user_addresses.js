"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        "user_addresses",
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          user_id: {
            type: Sequelize.INTEGER,
            references: {
              model: "users",
              key: "id",
            },
            onDelete: "CASCADE",
          },
          address_line_1: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          address_line_2: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          landmark: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          pincode: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
              min: 100000,
              max: 999999,
            },
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

      await queryInterface.addIndex("user_addresses", {
        fields: ["user_id"],
        unique: true,
        transaction: t,
      });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable("user_addresses", {
        transaction: t,
        cascade: true,
      });
    });
  },
};
