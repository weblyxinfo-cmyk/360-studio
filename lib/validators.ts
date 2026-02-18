import { z } from "zod";

export const reviewSchema = z.object({
  name: z.string().min(2, "Jméno musí mít alespoň 2 znaky"),
  initials: z.string().min(1).max(3),
  text: z.string().min(10, "Recenze musí mít alespoň 10 znaků"),
  rating: z.number().int().min(1).max(5).default(5),
  eventType: z.string().optional(),
  city: z.string().optional(),
  isVisible: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export const galleryItemSchema = z.object({
  title: z.string().min(2),
  subtitle: z.string().optional(),
  tag: z.string().optional(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  hasPlay: z.boolean().default(false),
  isVisible: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
  gridSpan: z.string().default("1x1"),
});

export const packageSchema = z.object({
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug může obsahovat jen malá písmena, čísla a pomlčky"),
  name: z.string().min(2),
  duration: z.string().min(2),
  price: z.number().int().min(0),
  priceNote: z.string().optional(),
  isFeatured: z.boolean().default(false),
  featuredLabel: z.string().optional(),
  isVisible: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export const packageFeatureSchema = z.object({
  text: z.string().min(2),
  sortOrder: z.number().int().default(0),
});

export const voucherSchema = z.object({
  packageId: z.string().optional(),
  recipientName: z.string().optional(),
  recipientEmail: z.string().email().optional(),
  buyerName: z.string().optional(),
  buyerEmail: z.string().email().optional(),
  personalMessage: z.string().optional(),
  amount: z.number().int().min(100),
  status: z.enum(["pending_payment", "active", "redeemed", "expired", "cancelled"]).default("pending_payment"),
  validFrom: z.string().optional(),
  validUntil: z.string().optional(),
});

export const bookingSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional(),
  packageId: z.string(),
  eventDate: z.string(),
  eventTimeStart: z.string(),
  eventTimeEnd: z.string(),
  eventType: z.string().optional(),
  eventLocation: z.string().optional(),
  eventNotes: z.string().optional(),
  voucherCode: z.string().optional(),
});

export const availabilitySlotSchema = z.object({
  date: z.string(),
  timeStart: z.string(),
  timeEnd: z.string(),
  status: z.enum(["available", "booked", "blocked"]).default("available"),
  blockReason: z.string().optional(),
});

export const availabilityPatternSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  timeStart: z.string(),
  timeEnd: z.string(),
  isActive: z.boolean().default(true),
});

export const settingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
  type: z.string().default("string"),
  description: z.string().optional(),
});
