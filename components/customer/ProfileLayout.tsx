"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, MapPin, Package, Star, Settings, LogOut } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { logout } from "@/lib/redux/slices/authSlice"

interface ProfileLayoutProps {
  children: React.ReactNode
  activeTab: string
}

export default function ProfileLayout({ children, activeTab }: ProfileLayoutProps) {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    window.location.href = "/login"
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="text-lg">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{user.name}</CardTitle>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge variant="secondary">
                  <Star className="w-3 h-3 mr-1" />
                  {user.rewardPoints} Points
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <a href="/profile">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </a>
                </Button>
                <Button
                  variant={activeTab === "addresses" ? "default" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <a href="/profile/addresses">
                    <MapPin className="w-4 h-4 mr-2" />
                    Addresses
                  </a>
                </Button>
                <Button variant={activeTab === "orders" ? "default" : "ghost"} className="w-full justify-start" asChild>
                  <a href="/profile/orders">
                    <Package className="w-4 h-4 mr-2" />
                    Orders
                  </a>
                </Button>
                <Button
                  variant={activeTab === "reviews" ? "default" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <a href="/profile/reviews">
                    <Star className="w-4 h-4 mr-2" />
                    Reviews
                  </a>
                </Button>
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className="w-full justify-start"
                  asChild
                >
                  <a href="/profile/settings">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">{children}</div>
      </div>
    </div>
  )
}
