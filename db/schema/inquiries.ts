import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  eventType: text("event_type").notNull(),
  packageType: text("package_type"),
  eventDate: text("event_date"),
  eventLocation: text("event_location"),
  message: text("message"),
  status: text("status").default("new"), // new, contacted, closed
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});
