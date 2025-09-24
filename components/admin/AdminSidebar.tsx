"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Cake,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Star,
  Tag,
  ImageIcon,
  Settings,
  Menu,
  ChevronDown,
  BarChart3,
  Gift,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface NavItem {
  title: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  // {
  //   title: "Products",
  //   icon: Package,
  //   children: [
  //     { title: "All Products", href: "/admin/products", icon: Package },
  //     { title: "Add Product", href: "/admin/products/new", icon: Package },
  //     { title: "Categories", href: "/admin/categories", icon: Tag },
  //   ],
  // },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: Tag,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Reviews",
    href: "/admin/reviews",
    icon: Star,
  },
  {
    title: "Coupons",
    href: "/admin/coupons",
    icon: Gift,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

interface SidebarProps {
  className?: string
}

function NavItemComponent({ item, level = 0 }: { item: NavItem; level?: number }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  if (hasChildren) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 h-10 px-3",
              level > 0 && "pl-6",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left">{item.title}</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1">
          {item.children?.map((child, index) => (
            <NavItemComponent key={index} item={child} level={level + 1} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  const isActive = pathname === item.href

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 h-10 px-3",
        level > 0 && "pl-6",
        isActive
          ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      )}
      asChild
    >
      <Link href={item.href!}>
        <item.icon className="h-4 w-4 shrink-0" />
        <span>{item.title}</span>
      </Link>
    </Button>
  )
}

function SidebarContent({ className }: SidebarProps) {
  return (
    <div className={cn("flex h-full flex-col bg-sidebar", className)}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-sidebar-border">
        <div className="bg-sidebar-primary/10 p-2 rounded-lg">
          <Cake className="h-6 w-6 text-sidebar-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-sidebar-foreground">Roshogolpo</h2>
          <p className="text-xs text-sidebar-foreground/60">Admin Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item, index) => (
            <NavItemComponent key={index} item={item} />
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}

export function AdminSidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
