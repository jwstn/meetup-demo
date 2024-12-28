import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usersQueryOptions } from "@/utils/users";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

const isAuthenticated = () => {
  return false;
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
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
