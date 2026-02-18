import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  type: text("type").notNull().default("string"), // string, json, number, boolean
  description: text("description"),
});
