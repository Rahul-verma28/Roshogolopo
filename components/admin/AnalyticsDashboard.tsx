"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "./PageHeader"
import { StatsCard } from "./StatsCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ShoppingBag, Users, Package, TrendingUp } from "lucide-react"
import { toast } from "sonner"

interface AnalyticsData {
  overview: {
    totalOrders: number
    totalRevenue: number
    totalCustomers: number
    totalProducts: number
    revenueGrowth: number
    orderGrowth: number
  }
  revenueOverTime: Array<{
    _id: string
    revenue: number
    orders: number
  }>
  topProducts: Array<{
    _id: string
    name: string
    totalSold: number
    revenue: number
  }>
  orderStatusDistribution: Array<{
    _id: string
    count: number
  }>
}

const statusColors = {
  Pending: "#f59e0b",
  Processing: "#3b82f6",
  Shipped: "#8b5cf6",
  Delivered: "#10b981",
  Cancelled: "#ef4444",
  Refunded: "#6b7280",
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState("30")

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/analytics?period=${period}`)
      if (!response.ok) throw new Error("Failed to fetch analytics")

      const analyticsData = await response.json()
      setData(analyticsData)
    } catch (error) {
      toast.error("Failed to load analytics data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Loading analytics...</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Failed to load analytics data</div>
      </div>
    )
  }

  const breadcrumbs = [{ label: "Dashboard", href: "/admin" }, { label: "Analytics" }]

  // Prepare chart data
  const revenueChartData = data.revenueOverTime.map((item) => ({
    date: formatDate(item._id),
    revenue: item.revenue,
    orders: item.orders,
  }))

  const pieChartData = data.orderStatusDistribution.map((item) => ({
    name: item._id,
    value: item.count,
    color: statusColors[item._id as keyof typeof statusColors] || "#6b7280",
  }))

  return (
    <>
      <PageHeader
        title="Analytics"
        description="Track your sweet shop's performance and growth"
        breadcrumbs={breadcrumbs}
        action={
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(data.overview.totalRevenue)}
          description="All time"
          icon={<TrendingUp className="h-4 w-4" />}
          trend={{
            value: `${data.overview.revenueGrowth}%`,
            isPositive: data.overview.revenueGrowth >= 0,
          }}
          className="bg-gradient-to-br from-primary/5 to-primary/10"
        />
        <StatsCard
          title="Total Orders"
          value={data.overview.totalOrders.toLocaleString()}
          description="All time"
          icon={<ShoppingBag className="h-4 w-4" />}
          trend={{
            value: `${data.overview.orderGrowth}%`,
            isPositive: data.overview.orderGrowth >= 0,
          }}
          className="bg-gradient-to-br from-chart-2/5 to-chart-2/10"
        />
        <StatsCard
          title="Total Customers"
          value={data.overview.totalCustomers.toLocaleString()}
          description="Registered users"
          icon={<Users className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-3/5 to-chart-3/10"
        />
        <StatsCard
          title="Total Products"
          value={data.overview.totalProducts.toLocaleString()}
          description="Active products"
          icon={<Package className="h-4 w-4" />}
          className="bg-gradient-to-br from-chart-4/5 to-chart-4/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>Daily revenue for the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `₹${value / 1000}k`} />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
            <CardDescription>Breakdown of all orders by status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [value, "Orders"]}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {pieChartData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
          <CardDescription>Best performing products by quantity sold</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity Sold</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.topProducts.map((product, index) => {
                const maxSold = Math.max(...data.topProducts.map((p) => p.totalSold))
                const percentage = (product.totalSold / maxSold) * 100

                return (
                  <TableRow key={product._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium text-primary">
                          {index + 1}
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{product.totalSold}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{formatCurrency(product.revenue)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={percentage} className="flex-1" />
                        <span className="text-sm text-muted-foreground w-12">{Math.round(percentage)}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
