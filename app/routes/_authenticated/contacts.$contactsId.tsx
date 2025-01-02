import { NotFound } from "@/components/NotFound";
import { TypographyH1, TypographyP } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { contactQueryOptions, deleteContact } from "@/utils/contacts";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { ErrorComponent, createFileRoute } from "@tanstack/react-router";
import { Trash2Icon } from "lucide-react";
import type { FormEvent } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/contacts/$contactsId")({
  validateSearch: (search: Record<string, unknown>): { q: string } | undefined => {
    if (!search.q) {
      return undefined;
    }

    return { q: String(search.q) };
  },
  loaderDeps: ({ search }) => {
    return { q: search.q };
  },
  loader: async ({ context, params: { contactsId } }) => {
    await context.queryClient.ensureQueryData(contactQueryOptions(contactsId));
  },
  errorComponent: ContactErrorComponent,
  component: ContactComponent,
  notFoundComponent: () => {
    return <NotFound>Contact not found</NotFound>;
  },
});

export function ContactErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}

function ContactComponent() {
  const params = Route.useParams();
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const { data: contact } = useSuspenseQuery(contactQueryOptions(params.contactsId));
  const queryClient = useQueryClient();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    event.stopPropagation();

    await deleteContact({ data: { id: String(contact.id) } });
    toast.success("Contact deleted successfully!");
    queryClient.invalidateQueries({
      queryKey: ["contacts", "search", search?.q],
    });
    navigate({ to: "/" });
  }

  return (
    <div className="flex w-full max-w-screen-lg">
      <img alt="" src="" className="min-w-96 min-h-96" />
      <div className="space-y-0 px-2">
        <TypographyH1>{contact.name}</TypographyH1>
        <TypographyP>{contact.email}</TypographyP>
      </div>

      <form method="POST" onSubmit={handleSubmit}>
        <Button type="submit" variant="destructive" size="icon">
          <Trash2Icon />
        </Button>
      </form>
    </div>
  );
}
