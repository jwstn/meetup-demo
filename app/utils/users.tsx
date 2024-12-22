import { client } from "@/api-client";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { createUserFormSchema } from "@/routes/users.new";
import type { User } from "@/types";
import { parseWithZod } from "@conform-to/zod";
import { queryOptions } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { createServerFn, json } from "@tanstack/start";

export const usersQueryOptions = () =>
  queryOptions({
    queryKey: ["users"],
    queryFn: () => client.get<Array<User>>("users").json(),
  });

export const userQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["users", id],
    queryFn: () => client.get<User>(`users/${id}`).json(),
  });

export const createUser = createServerFn({ method: "POST" }).handler(
  // @ts-ignore
  async ({ data: formData }) => {
    // @ts-ignore
    const submission = parseWithZod(formData, { schema: createUserFormSchema });

    if (submission.status !== "success") {
      return json(submission.reply());
    }

    await db.insert(usersTable).values({ ...submission.value });
    // return json({ message: "User created successfully" }, { status: 201 });
    throw redirect({
      to: "/",
    });
  },
);
