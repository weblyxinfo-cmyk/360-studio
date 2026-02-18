import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const payments = sqliteTable("payments", {
  id: text("id").primaryKey(),
  paymentType: text("payment_type", { enum: ["booking", "voucher"] }).notNull(),
  bookingId: text("booking_id"),
  voucherId: text("voucher_id"),
  gopayPaymentId: text("gopay_payment_id"),
  gopayState: text("gopay_state"),
  amount: integer("amount").notNull(), // CZK in hellers
  currency: text("currency").notNull().default("CZK"),
  status: text("status", {
    enum: ["pending", "paid", "cancelled", "refunded", "partially_refunded", "failed"],
  }).notNull().default("pending"),
  refundedAmount: integer("refunded_amount").default(0),
  gatewayUrl: text("gateway_url"),
  paidAt: text("paid_at"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});
