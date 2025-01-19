import { client } from "@/api-client";
import { db } from "@/db/index";
import { contactsTable } from "@/db/schema";
import { createContactFormSchema } from "@/routes/_authenticated/contacts.new";
import type { User } from "@/types";
import { parseWithZod } from "@conform-to/zod";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn, json } from "@tanstack/start";
import { eq } from "drizzle-orm";

export const contactsQueryOptions = (query: string) => {
  return queryOptions({
    queryKey: ["contacts", "search", query],
    queryFn: () => client.get<Array<User>>(`contacts/search/${query}`).json(),
  });
};

export const contactQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["contacts", id],
    queryFn: () => client.get<User>(`contacts/${id}`).json(),
  });

export const createContact = createServerFn({ method: "POST" }).handler(
  // @ts-ignore
  async ({ data: formData }) => {
    // @ts-ignore
    const submission = parseWithZod(formData, {
      schema: createContactFormSchema,
    });

    if (submission.status !== "success") {
      return json(submission.reply());
    }

    const [contact] = await db
      .insert(contactsTable)
      .values({ ...submission.value })
      .returning();

    return contact;
  },
);

export const deleteContact = createServerFn({ method: "POST" }).handler(
  // @ts-ignore
  async ({ data: { id } }) => {
    await db
      .delete(contactsTable)
      .where(eq(contactsTable.id, Number.parseInt(id)));
    return json({ message: "Contact deleted successfully" }, { status: 200 });
  },
);
