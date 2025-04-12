"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable(
        "users",
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          first_name: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          last_name: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
          },
          contact_no: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          is_contact_no_verified: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
          },
          is_email_verified: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
          },
          role: {
            type: Sequelize.ENUM("admin", "customer"),
            allowNull: false,
            defaultValue: "customer",
          },
          last_login_at: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
          reset_pass_token: {
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

      await queryInterface.addIndex("users", {
        fields: ["contact_no"],
        unique: true,
        where: {
          deleted_at: null,
        },
        transaction: t,
      });
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.dropTable("users", {
        transaction: t,
        cascade: true,
      });
    });
  },
};
