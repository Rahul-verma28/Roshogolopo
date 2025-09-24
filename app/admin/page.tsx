import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { PageHeader } from "@/components/admin/PageHeader"
import { StatsCard } from "@/components/admin/StatsCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Users, Star, TrendingUp, Plus, Eye } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <PageHeader title="Dashboard" description="Welcome back! Here's what's happening with your sweet shop today." />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Orders"
            value="1,234"
            description="This month"
            icon={<ShoppingBag className="h-4 w-4" />}
            trend={{ value: "12%", isPositive: true }}
            className="bg-gradient-to-br from-primary/5 to-primary/10"
          />
          <StatsCard
            title="Revenue"
            value="₹45,231"
            description="This month"
            icon={<TrendingUp className="h-4 w-4" />}
            trend={{ value: "8%", isPositive: true }}
            className="bg-gradient-to-br from-chart-2/5 to-chart-2/10"
          />
          <StatsCard
            title="Customers"
            value="573"
            description="Active customers"
            icon={<Users className="h-4 w-4" />}
            trend={{ value: "23 new", isPositive: true }}
            className="bg-gradient-to-br from-chart-3/5 to-chart-3/10"
          />
          <StatsCard
            title="Average Rating"
            value="4.8"
            description="From 234 reviews"
            icon={<Star className="h-4 w-4" />}
            trend={{ value: "0.2", isPositive: true }}
            className="bg-gradient-to-br from-chart-4/5 to-chart-4/10"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your sweet shop efficiently</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Plus className="h-5 w-5" />
                <span className="text-sm">Add Product</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <ShoppingBag className="h-5 w-5" />
                <span className="text-sm">View Orders</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Users className="h-5 w-5" />
                <span className="text-sm">Customers</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Eye className="h-5 w-5" />
                <span className="text-sm">Analytics</span>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your shop</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New order received</p>
                    <p className="text-xs text-muted-foreground">Order #1234 - ₹850</p>
                  </div>
                  <span className="text-xs text-muted-foreground">2m ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Product review added</p>
                    <p className="text-xs text-muted-foreground">5-star review for Rasgulla</p>
                  </div>
                  <span className="text-xs text-muted-foreground">15m ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Low stock alert</p>
                    <p className="text-xs text-muted-foreground">Gulab Jamun running low</p>
                  </div>
                  <span className="text-xs text-muted-foreground">1h ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-chart-4 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New customer registered</p>
                    <p className="text-xs text-muted-foreground">Priya Sharma joined</p>
                  </div>
                  <span className="text-xs text-muted-foreground">3h ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
