import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Briefcase, MessageSquare, LayoutGrid, FileText, Settings } from "lucide-react"

const adminModules = [
  { 
    title: "Team Members", 
    desc: "Update your team page", 
    href: "/admin/team", 
    icon: Users,
    color: "bg-blue-500/10 text-blue-600"
  },
  { 
    title: "Portfolio", 
    desc: "Showcase your best projects", 
    href: "/admin/portfolio", 
    icon: Briefcase,
    color: "bg-purple-500/10 text-purple-600"
  },
  { 
    title: "Services", 
    desc: "Manage your offerings", 
    href: "/admin/services", 
    icon: LayoutGrid,
    color: "bg-emerald-500/10 text-emerald-600"
  },
  { 
    title: "Testimonials", 
    desc: "Client feedback & quotes", 
    href: "/admin/testimonials", 
    icon: MessageSquare,
    color: "bg-orange-500/10 text-orange-600"
  },
  { 
    title: "Blog Posts", 
    desc: "Write & publish articles", 
    href: "/admin/blog", 
    icon: FileText,
    color: "bg-pink-500/10 text-pink-600"
  },
  { 
    title: "Settings", 
    desc: "Site-wide configurations", 
    href: "/admin/settings", 
    icon: Settings,
    color: "bg-slate-500/10 text-slate-600"
  },
]

export default function AdminPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl mt-20">
      <div className="flex flex-col mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your website content with real-time live previews.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminModules.map((module) => (
          <Card key={module.href} className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 overflow-hidden">
            <CardHeader className="flex flex-row items-center space-x-4 pb-4">
              <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 duration-300 ${module.color}`}>
                <module.icon className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-xl">{module.title}</CardTitle>
                <CardDescription className="line-clamp-1">{module.desc}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full shadow-none" variant="secondary">
                <Link href={module.href}>Manage Content</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

