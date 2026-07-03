import { db } from "@/db/index";
import { contactsTable } from "@/db/schema";
import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";

export const APIRoute = createAPIFileRoute("/api/contacts")({
  GET: async ({ request }) => {
    console.info("Fetching contacts... @", request.url);
    const contacts = await db.select().from(contactsTable);

    return json(contacts);
  },
});
