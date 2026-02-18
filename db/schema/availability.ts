import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const availabilitySlots = sqliteTable("availability_slots", {
  id: text("id").primaryKey(),
  date: text("date").notNull(),
  timeStart: text("time_start").notNull(),
  timeEnd: text("time_end").notNull(),
  status: text("status", {
    enum: ["available", "booked", "blocked"],
  }).notNull().default("available"),
  bookingId: text("booking_id"),
  blockReason: text("block_reason"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

export const availabilityPatterns = sqliteTable("availability_patterns", {
  id: text("id").primaryKey(),
  dayOfWeek: integer("day_of_week").notNull(), // 0=Sunday, 6=Saturday
  timeStart: text("time_start").notNull(),
  timeEnd: text("time_end").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});
