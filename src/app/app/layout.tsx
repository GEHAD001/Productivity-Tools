import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/features/authentication/utils/getCurrentUser";
import React from "react";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        username={user!.username}
        className="w-64 border-r min-w-[290px]"
      />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
