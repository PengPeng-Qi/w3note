import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/toggle-theme";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes",
  description: "Your personal notes management",
};

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <ModeToggle />

      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
