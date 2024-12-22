import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import { eq } from "drizzle-orm";

export const APIRoute = createAPIFileRoute("/api/users/$id")({
  GET: async ({ request, params }) => {
    console.info(`Fetching users by id=${params.id}... @`, request.url);
    try {
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, parseInt(params.id)));

      return json(user[0]);
    } catch (error) {
      console.error(error);
      return json({ error: "User not found" }, { status: 404 });
    }
  },
});
