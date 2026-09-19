import { DATABASE_URL, NODE_ENV } from "@/config/env.config";
import fs from "fs";
import path from "path";
import pg from "pg";
import { ModelCtor, Sequelize } from "sequelize-typescript";

const isProduction = NODE_ENV === "production";

let db: Sequelize;

export const initSequelize = () => {
  const _basename = path.basename(module.filename);
  const sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    // Pass pg explicitly so serverless bundlers (Vercel) include it; Sequelize
    // otherwise loads it with a dynamic require they can't trace.
    dialectModule: pg,
    dialectOptions: isProduction
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : undefined,
    // Each serverless instance holds its own pool, so keep it small.
    pool: isProduction ? { max: 2, min: 0, idle: 10000 } : undefined,
    logging: isProduction ? false : console.log,
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
