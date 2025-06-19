"use client";

import {
  Calendar,
  Inbox,
  LayoutDashboard,
  User,
  User2,
  ChevronUp,
} from "lucide-react";
import logo from "../../public/logo.png";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

const itemsFaculty = [
  {
    title: "Dashboard",
    url: "/faculty",
    icon: LayoutDashboard,
  },
  {
    title: "Request Resource",
    url: "/faculty/slots",
    icon: Inbox,
  },
  {
    title: "My Bookings",
    url: "/faculty/bookings",
    icon: Calendar,
  },
  {
    title: "Profile",
    url: "/faculty/profile",
    icon: User,
  },
];

const itemsAdmin = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Add Resource",
    url: "/admin/resources",
    icon: Inbox,
  },
  {
    title: "Booking Requests",
    url: "/admin/bookings",
    icon: Calendar,
  },
  {
    title: "Add User",
    url: "/admin/users",
    icon: User2,
  },
  {
    title: "Profile",
    url: "/admin/profile",
    icon: User,
  },
];

export function FacultySidebar({ role }: { role: string }) {
  const router = useRouter();
  const items = role === "faculty" ? itemsFaculty : itemsAdmin;

  const handleSignOut = () => {
    if (role === "faculty") {
      router.push("/loginfaculty");
    }
    if (role === "admin") {
      router.push("/loginadmin");
    }
  };

  return (
    <div className="flex flex-start">
      <Sidebar>
        <SidebarContent
          className="text-white text-xl "
          style={styles.sideBarBackground}
        >
          <SidebarGroup>
            <SidebarGroupLabel className="my-20 flex justify-center items-center">
              <div className="flex flex-col items-center gap-2">
                <Image src={logo} alt="Logo" width={100} />
                <p className="text-white text-center text-xl font-bold">
                  Resource Booking Portal
                </p>
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} className="py-3 font-bold">
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span className="text-l">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter
          style={styles.sideBarBackground}
          className="text-white font-bold text-xl"
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem onClick={handleSignOut}>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}

const styles = {
  sideBarBackground: {
    background:
      "linear-gradient(to right, var(--color-gradient-start), var(--color-gradient-end))",
  },
};
