import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { createUserFormSchema } from "@/routes/users.new";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "@tanstack/react-router";
import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";

export const APIRoute = createAPIFileRoute("/api/users/new")({
  POST: async ({ request }) => {
    console.log(request, "[request]");
    const formData = await request.formData();
    const submission = parseWithZod(formData, { schema: createUserFormSchema });

    if (submission.status !== "success") {
      return json(submission.reply());
    }
    console.log(Object.fromEntries(formData));
    await db.insert(usersTable).values();

    throw redirect({
      to: "/",
    });
  },
});
