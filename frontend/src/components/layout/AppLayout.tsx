import { Outlet } from "react-router-dom"
import AppSidebar from "@/components/sidebar/AppSidebar"
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/* Top Bar */}
        <header className="flex h-14 items-center gap-2 border-b px-4 rounded-md">
          <SidebarTrigger className="h-9 w-9 rounded-md border bg-background hover:bg-accent" />
          <h1 className="text-sm font-medium">Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
