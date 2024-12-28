import { client } from "@/api-client";
import { db } from "@/db/index";
import { usersTable } from "@/db/schema/schema";
import { createUserFormSchema } from "@/routes/users.new";
import type { User } from "@/types";
import { parseWithZod } from "@conform-to/zod";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn, json } from "@tanstack/start";
import { eq } from "drizzle-orm";

export const usersQueryOptions = (query: string) => {
  return queryOptions({
    queryKey: ["users", "search", query],
    queryFn: () => client.get<Array<User>>(`users/search/${query}`).json(),
  });
};

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

    const user = await db
      .insert(usersTable)
      .values({ ...submission.value })
      .returning();

    return json({ ...user[0] }, { status: 200 });
  },
);

export const deleteUser = createServerFn({ method: "POST" }).handler(
  // @ts-ignore
  async ({ data: { id } }) => {
    await db.delete(usersTable).where(eq(usersTable.id, Number.parseInt(id)));
    return json({ message: "User deleted successfully" }, { status: 200 });
  },
);
