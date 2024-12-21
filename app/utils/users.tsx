import { client } from "@/api-client";
import type { User } from "@/types";
import { queryOptions } from "@tanstack/react-query";

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
