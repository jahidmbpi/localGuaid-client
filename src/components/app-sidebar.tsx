"use client";
import * as React from "react";
import { SearchForm } from "@/components/search-form";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useMeQuery } from "@/redux/feature/auth/auth.api";
import { getDeshbordSidebarItems } from "@/component/uitls/getDeshbordItem";

// This is sample data
// const data = {
//   versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
//   navMain: [],
// };

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useMeQuery();

  const userData = user?.data;

  const navItems = getDeshbordSidebarItems(userData!.role);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="gap-1">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild isActive={false}>
                <a href={item.path}>{item.label}</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
