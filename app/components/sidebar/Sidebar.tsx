import React from "react";
import DesktopSidebar from "@/app/components/sidebar/DesktopSidebar";
import MobileFooter from "@/app/components/sidebar/MobileFooter";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { User } from "@prisma/client";

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  const currentUser: User = (await getCurrentUser()) as User;

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
};

export default Sidebar;
