import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from "@/config/env.config";
import { Twilio } from "twilio";
import { logger } from "@/config/logger.config";

const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_NUMBER;
const ADMIN_NUMBER = process.env.ADMIN_PHONE_NUMBER;

export const sendAdminNewOrderWhatsApp = async (
  orderId: number,
  totalAmount: number,
  customerContact: string
) => {
  if (!WHATSAPP_FROM || !ADMIN_NUMBER) {
    logger.warn("[WhatsApp] TWILIO_WHATSAPP_NUMBER or ADMIN_PHONE_NUMBER not set — skipping");
    return;
  }
  const message =
    `🛒 *New Order Received!*\n\n` +
    `Order *#${orderId}*\n` +
    `Amount: *₹${totalAmount}*\n` +
    `Customer: ${customerContact}`;
  try {
    await client.messages.create({
      body: message,
      from: `whatsapp:${WHATSAPP_FROM}`,
      to: `whatsapp:+91${ADMIN_NUMBER}`,
    });
  } catch (error) {
    logger.error("[WhatsApp] Failed to send admin message: %s", error?.message);
  }
};
