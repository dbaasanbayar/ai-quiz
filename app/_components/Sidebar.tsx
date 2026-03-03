"use client";
import { useEffect, useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

type historyType = { id: number; article: string; item: string };

export function Siderbar() {
  const [history, setHistory] = useState<historyType[]>([]);
 

  // useEffect(() => {
  //   async function loadData() {
  //     const res = await fetch("/api/history-sidebar");
  //     const data = await res.json();
  //     setHistory(data);
  //   }
  //   loadData();
  // }, []);

  return (
    <SidebarProvider>
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b px-4 py-3"><h2 className="text-lg font-semibold">History</h2></SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        {history.map((item: historyType) => (
          <p key={item.id}>{item.article}</p>
        ))}
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
    </SidebarProvider>
  );
}
