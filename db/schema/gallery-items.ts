import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const galleryItems = sqliteTable("gallery_items", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  tag: text("tag"),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  hasPlay: integer("has_play", { mode: "boolean" }).notNull().default(false),
  isVisible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  gridSpan: text("grid_span").default("1x1"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});
