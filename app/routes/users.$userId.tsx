import { NotFound } from "@/components/NotFound";
import { TypographyH1, TypographyP } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { deleteUser, userQueryOptions } from "@/utils/users";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { ErrorComponent, createFileRoute } from "@tanstack/react-router";
import { Trash2Icon } from "lucide-react";
import type { FormEvent } from "react";
import { toast } from "sonner";

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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    event.stopPropagation()

    await deleteUser({ data: { id: String(user.id) } })
    toast.success('User deleted successfully!')
  }

  return (
    <div className="flex w-full max-w-screen-lg">
      <img alt="" src="" className="min-w-96 min-h-96" />
      <div className="space-y-0 px-2">
        <TypographyH1>{user.name}</TypographyH1>
        <TypographyP>{user.email}</TypographyP>
      </div>

      <form method="POST" onSubmit={handleSubmit}>
        <Button type='submit' variant='destructive' size='icon'>
          <Trash2Icon />
        </Button>
      </form>
    </div>
  );
}
