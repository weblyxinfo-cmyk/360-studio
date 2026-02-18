import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as users from "./schema/users";
import * as reviews from "./schema/reviews";
import * as galleryItems from "./schema/gallery-items";
import * as packages from "./schema/packages";
import * as vouchers from "./schema/vouchers";
import * as bookings from "./schema/bookings";
import * as payments from "./schema/payments";
import * as availability from "./schema/availability";
import * as settings from "./schema/settings";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, {
  schema: {
    ...users,
    ...reviews,
    ...galleryItems,
    ...packages,
    ...vouchers,
    ...bookings,
    ...payments,
    ...availability,
    ...settings,
  },
});

export type Database = typeof db;
