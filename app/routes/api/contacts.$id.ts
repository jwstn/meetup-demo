import { db } from "@/db/index";
import { contactsTable } from "@/db/schema";
import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import { eq } from "drizzle-orm";

export const APIRoute = createAPIFileRoute("/api/contacts/$id")({
  GET: async ({ request, params }) => {
    console.info(`Fetching contacts by id=${params.id}... @`, request.url);
    try {
      const contact = await db
        .select()
        .from(contactsTable)
        .where(eq(contactsTable.id, Number.parseInt(params.id)));

      return json(contact[0]);
    } catch (error) {
      console.error(error);
      return json({ error: "contact not found" }, { status: 404 });
    }
  },
});
