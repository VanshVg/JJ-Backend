import { config } from "dotenv";

config();

export const {
  LOG_DIR,
  PORT,
  DATABASE_URL,
  NODE_ENV,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_SERVICE_SID,
  JWT_SECRET,
} = process.env;
