"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        "user_otps",
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
          otp: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
              min: 10000,
              max: 999999,
            },
          },
          expiry_date: {
            type: Sequelize.DATE,
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

      await queryInterface.addIndex("user_otps", {
        fields: ["user_id"],
        unique: true,
        transaction: t,
      });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable("user_otps", {
        transaction: t,
        cascade: true,
      });
    });
  },
};
