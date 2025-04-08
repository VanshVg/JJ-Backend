import { DATABASE_URL } from "@/config/env.config";
import fs from "fs";
import path from "path";
import { ModelCtor, Sequelize } from "sequelize-typescript";

let db: Sequelize;

export const initSequelize = () => {
  const _basename = path.basename(module.filename);
  const sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    logging: true,
  });

  const _models = fs
    .readdirSync(__dirname)
    .filter((file: string) => {
      return (
        file !== _basename &&
        file !== "interfaces" &&
        file.slice(-5) !== ".d.ts" &&
        (file.slice(-3) === ".js" || file.slice(-3) === ".ts")
      );
    })
    .map((file: string) => {
      const model: ModelCtor = require(path.join(__dirname, file))?.default;
      return model;
    });

  sequelize.addModels(_models);
  return sequelize;
};

if (!db) {
  db = initSequelize();
}

export default db;
