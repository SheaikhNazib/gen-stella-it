"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Settings,
  MessageSquare,
  FileText,
  PanelLeftClose,
  ChevronRight,
  LogOut,
  UserCog
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { signOut, useSession } from "next-auth/react"

const items = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Team", url: "/admin/team", icon: Users },
  { title: "Portfolio", url: "/admin/portfolio", icon: FolderKanban },
  { title: "Services", url: "/admin/services", icon: LayoutDashboard },
  { title: "Testimonials", url: "/admin/testimonials", icon: MessageSquare },
  { title: "Blog", url: "/admin/blog", icon: FileText },
  { title: "Users", url: "/admin/users", icon: UserCog },
  { title: "Settings", url: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { isMobile, open, toggleSidebar } = useSidebar()
  const { data: session } = useSession()

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-card">
      <SidebarHeader className="h-16 flex items-center px-4 border-b border-border/50">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="font-bold text-primary-foreground">GS</span>
          </div>
          {open && (
            <span className="font-bold text-lg truncate whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
              Gen Stella IT
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="py-6 px-2 space-y-1">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url || (item.url !== "/admin" && pathname.startsWith(item.url))
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive}
                  tooltip={item.title}
                  className={cn(
                    "h-11 justify-start gap-4 transition-all duration-200",
                    isActive ? "bg-primary/10 text-primary hover:bg-primary/15" : "hover:bg-accent/50"
                  )}
                >
                  <Link href={item.url} className="flex items-center w-full">
                    <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
                    <span className={cn(
                      "font-medium whitespace-nowrap overflow-hidden transition-all duration-300",
                      open ? "opacity-100 w-auto ml-1" : "opacity-0 w-0 ml-0"
                    )}>
                      {item.title}
                    </span>
                    {open && isActive && (
                      <div className="ml-auto w-1 h-1 rounded-full bg-primary" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
             <SidebarMenuButton 
               onClick={() => signOut({ callbackUrl: "/" })}
               className="h-11 gap-4 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
             >
                <LogOut className="h-5 w-5 shrink-0" />
                <span className={cn(
                  "font-medium transition-all duration-300",
                  open ? "opacity-100" : "opacity-0 w-0"
                )}>
                  Logout
                </span>
             </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
