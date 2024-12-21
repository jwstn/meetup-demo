import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const APIRoute = createAPIFileRoute("/api/users")({
  GET: async ({ request }) => {
    console.info("Fetching users... @", request.url);
    const users = await db.select().from(usersTable);

    return json(users);
  },
});
