import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { FacultySidebar } from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const FacultyLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="min-h-screen flex">
      <FacultySidebar role="faculty" />
      <main className="flex-1">
        <Navbar role="faculty" />
        <div className="py-5">{children}</div>
      </main>
    </SidebarProvider>
  );
};

export default FacultyLayout;
