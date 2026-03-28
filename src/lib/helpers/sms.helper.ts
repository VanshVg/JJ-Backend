import {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
} from "@/config/env.config";
import { Twilio } from "twilio";
import { logger } from "@/config/logger.config";

const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Twilio Messaging Service or a verified "From" number
// Store this in env — add TWILIO_PHONE_NUMBER to .env
const FROM_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const ADMIN_NUMBER = process.env.ADMIN_PHONE_NUMBER;

export const sendSms = async (to: string, message: string) => {
  if (!FROM_NUMBER) {
    logger.warn("[SMS] TWILIO_PHONE_NUMBER not set — skipping SMS");
    return;
  }
  try {
    await client.messages.create({
      body: message,
      from: FROM_NUMBER,
      to: `+91${to}`,
    });
  } catch (error) {
    // SMS failure should never block order placement
    logger.error("[SMS] Failed to send SMS: %s", error?.message);
  }
};

export const sendOrderConfirmationSms = async (
  contactNo: string,
  orderId: number,
  totalAmount: number
) => {
  const message =
    `JJ Store: Your order #${orderId} has been placed! ` +
    `Total: Rs.${totalAmount}. We will deliver to you soon. Thank you!`;
  await sendSms(contactNo, message);
};

export const sendAdminNewOrderSms = async (
  orderId: number,
  totalAmount: number,
  customerContact: string
) => {
  if (!ADMIN_NUMBER) return;
  const message =
    `New order #${orderId} received! ` +
    `Total: Rs.${totalAmount}. Customer: ${customerContact}`;
  try {
    await client.messages.create({
      body: message,
      from: FROM_NUMBER,
      to: `+91${ADMIN_NUMBER}`,
    });
  } catch (error) {
    logger.error("[SMS] Failed to send admin SMS: %s", error?.message);
  }
};
