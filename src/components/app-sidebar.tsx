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

import { House } from "lucide-react";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useMeQuery();

  const userData = user?.data;

  const navItems = userData ? getDeshbordSidebarItems(userData!.role) : [];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>

      <SidebarContent>
        <div className="relative h-full">
          <SidebarMenu className="gap-1">
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild isActive={false}>
                  <a href={item.path}>{item.label}</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <SidebarMenu className="absolute left-2 bottom-10">
            {" "}
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <House />
              <button className="cursor-pointer">Home</button>
            </Link>
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
