import { auth } from "@/auth";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import { contactsQueryOptions } from "@/utils/contacts";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { toast } from "sonner";
import { getWebRequest } from "vinxi/http";

const isAuthenticated = createServerFn({ method: "GET" }).handler(async () => {
  const { headers } = getWebRequest();
  const session = await auth.api.getSession({ headers });

  console.log(
    { session: session?.session, user: session?.user },
    "[session isAuthenticated serverFn]",
  );

  if (!session?.user.id) {
    toast.warning("Session is missing", {
      description: "Something happend",
    });
    return false;
  }

  return true;
});

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const isLoggedIn = await isAuthenticated();

    if (!isLoggedIn) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  validateSearch: (
    search: Record<string, unknown>,
  ): { q: string } | undefined => {
    if (!search.q) {
      return undefined;
    }

    return { q: String(search.q) };
  },
  loaderDeps: ({ search }) => {
    return { q: search.q };
  },
  loader: async ({ context, deps }) => {
    const query = deps.q;
    await context.queryClient.ensureQueryData(contactsQueryOptions(query));
  },
  component: AuthenticatedRootComponent,
});

function AuthenticatedRootComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4 w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
