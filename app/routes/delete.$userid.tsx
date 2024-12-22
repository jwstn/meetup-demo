import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { eq } from "drizzle-orm";

export const Route = createFileRoute("/delete/$userid")({
  beforeLoad: async ({ params }) => {
    await db.delete(usersTable).where(eq(usersTable.id, params.userid));
    throw redirect({
      to: "/",
    });
  },
});
