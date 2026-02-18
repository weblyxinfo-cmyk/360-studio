import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { packages } from "./packages";

export const vouchers = sqliteTable("vouchers", {
  id: text("id").primaryKey(),
  code: text("code").notNull().unique(),
  packageId: text("package_id").references(() => packages.id),
  recipientName: text("recipient_name"),
  recipientEmail: text("recipient_email"),
  buyerName: text("buyer_name"),
  buyerEmail: text("buyer_email"),
  personalMessage: text("personal_message"),
  amount: integer("amount").notNull(), // CZK in hellers
  status: text("status", {
    enum: ["pending_payment", "active", "redeemed", "expired", "cancelled"],
  }).notNull().default("pending_payment"),
  paymentId: text("payment_id"),
  validFrom: text("valid_from"),
  validUntil: text("valid_until"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});
