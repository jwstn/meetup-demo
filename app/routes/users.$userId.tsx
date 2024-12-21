import { NotFound } from "@/components/NotFound";
import { TypographyH4, TypographyP } from "@/components/typography";
import { userQueryOptions } from "@/utils/users";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorComponent, createFileRoute } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";

export const Route = createFileRoute("/users/$userId")({
  loader: async ({ context, params: { userId } }) => {
    await context.queryClient.ensureQueryData(userQueryOptions(userId));
  },
  errorComponent: UserErrorComponent,
  component: UserComponent,
  notFoundComponent: () => {
    return <NotFound>User not found</NotFound>;
  },
});

export function UserErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}

function UserComponent() {
  const params = Route.useParams();
  const userQuery = useSuspenseQuery(userQueryOptions(params.userId));
  const user = userQuery.data;

  return (
    <div className="space-y-2">
      <TypographyH4>{user.name}</TypographyH4>
      <TypographyP>{user.email}</TypographyP>
    </div>
  );
}
