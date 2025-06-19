import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { FacultySidebar } from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="min-h-screen flex">
      <FacultySidebar role="admin" />
      <main className="flex-1">
        <Navbar role="admin" />
        <div className="py-5">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;
