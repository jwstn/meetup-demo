import { db } from "@/db/index";
import { contactsTable } from "@/db/schema";
import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import { like } from "drizzle-orm";

export const APIRoute = createAPIFileRoute("/api/contacts/search/$query")({
  GET: async ({ request, params }) => {
    console.info(`Fetching contacts by query=${params.query}... @`, request.url);

    try {
      if (params.query === "undefined") {
        return json(await db.select().from(contactsTable));
      }

      const contacts = await db
        .select()
        .from(contactsTable)
        .where(like(contactsTable.name, `%${params.query}%`));

      return json(contacts);
    } catch (error) {
      console.error(error);
      return json({ error: "User not found" }, { status: 404 });
    }
  },
});
