import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { packages } from "./packages";

export const bookings = sqliteTable("bookings", {
  id: text("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  packageId: text("package_id").references(() => packages.id),
  eventDate: text("event_date").notNull(),
  eventTimeStart: text("event_time_start").notNull(),
  eventTimeEnd: text("event_time_end").notNull(),
  eventType: text("event_type"),
  eventLocation: text("event_location"),
  eventNotes: text("event_notes"),
  totalAmount: integer("total_amount").notNull(), // CZK in hellers
  voucherCode: text("voucher_code"),
  discountAmount: integer("discount_amount").default(0),
  status: text("status", {
    enum: [
      "pending_payment",
      "paid",
      "confirmed",
      "in_progress",
      "completed",
      "cancelled",
      "refunded",
    ],
  }).notNull().default("pending_payment"),
  adminNotes: text("admin_notes"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});
