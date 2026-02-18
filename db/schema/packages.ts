import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const packages = sqliteTable("packages", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  duration: text("duration").notNull(),
  price: integer("price").notNull(), // CZK in hellers (haléře)
  priceNote: text("price_note"),
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
  featuredLabel: text("featured_label"),
  isVisible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

export const packageFeatures = sqliteTable("package_features", {
  id: text("id").primaryKey(),
  packageId: text("package_id").notNull().references(() => packages.id, { onDelete: "cascade" }),
  text: text("text").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});
