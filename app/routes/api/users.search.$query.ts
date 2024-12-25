import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import { like } from "drizzle-orm";

export const APIRoute = createAPIFileRoute("/api/users/search/$query")({
  GET: async ({ request, params }) => {
    console.info(`Fetching users by query=${params.query}... @`, request.url);

    try {
      if (params.query === "undefined") {
        return json(await db.select().from(usersTable));
      }

      const users = await db
        .select()
        .from(usersTable)
        .where(like(usersTable.name, `%${params.query}%`));

      return json(users);
    } catch (error) {
      console.error(error);
      return json({ error: "User not found" }, { status: 404 });
    }
  },
});
