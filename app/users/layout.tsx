import React from "react";

import Sidebar from "@/app/components/sidebar/Sidebar";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <div className="lg:pl-20 h-full">{children}</div>
    </Sidebar>
  );
}
