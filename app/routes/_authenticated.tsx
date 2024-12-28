import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { usersQueryOptions } from "@/utils/users";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";

const isAuthenticated = async () => {
  const { data, error } = await authClient.getSession();

  console.log({ data, error }, "[session data]");

  if (error) {
    toast.warning("Authentication failed, please login in first.", {
      description: error.message || "An error occurred",
    });
    return false;
  }

  if (!data?.user.id) {
    toast.warning("Session is missing", {
      description: "Something happend",
    });
    return false;
  }

  return true;
};

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
    await context.queryClient.ensureQueryData(usersQueryOptions(query));
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
