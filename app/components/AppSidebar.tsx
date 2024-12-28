import { buttonVariants } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usersQueryOptions } from "@/utils/users";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { Input } from "@/components/ui/input";

import { Route } from "@/routes/__root";
import { PlusCircleIcon } from "lucide-react";

export function AppSidebar() {
  const { q } = Route.useSearch();

  const usersQuery = useSuspenseQuery(usersQueryOptions(q));
  return (
    <Sidebar>
      <SidebarContent>
        <form className="flex flex-nowrap gap-2 px-2 mt-5">
          <Input
            name="q"
            type="search"
            defaultValue={q || ""}
            placeholder="Search users"
            className="w-full"
            aria-label="Search users"
          />
          <Link
            to="/users/new"
            search={{ q }}
            className={cn(buttonVariants({ size: "icon" }), "min-w-10")}
          >
            <PlusCircleIcon />
          </Link>
        </form>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarGroupLabel className="text-base flex justify-between">
              Contacts
              <Link
                className="text-sm text-muted-foreground"
                to="/"
                search={() => {}}
              >
                Reset
              </Link>
            </SidebarGroupLabel>
            <SidebarMenu>
              {[...usersQuery.data].map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/users/$userId"
                      search={{ q }}
                      params={{ userId: String(item.id) }}
                      className={cn(
                        buttonVariants({ variant: "link" }),
                        "text-lg justify-start",
                      )}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
