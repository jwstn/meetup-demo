import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usersQueryOptions } from "@/utils/users";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export function AppSidebar() {
  const usersQuery = useSuspenseQuery(usersQueryOptions());
  return (
    <Sidebar>
      <SidebarContent>
        <form className="flex flex-nowrap gap-2 px-2 mt-5">
          <Input
            type="search"
            placeholder="Search users"
            className="w-full"
            aria-label="Search users"
          />
          <Button size="icon">
            <SearchIcon className="size-4" />
          </Button>
        </form>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {[...usersQuery.data].map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/users/$userId"
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
