"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, Eye, ShoppingCart, Star, Users } from "lucide-react"
import { toast } from "sonner"

interface ProductAnalyticsProps {
  productId: string
}

interface ProductAnalyticsData {
  product: {
    _id: string
    name: string
    slug: string
    images: string[]
    category: string
    ratings: number
    numReviews: number
    isActive: boolean
    isFeatured: boolean
    createdAt: string
  }
  analytics: {
    totalViews: number
    totalOrders: number
    totalRevenue: number
    averageOrderValue: number
    conversionRate: number
    viewsThisMonth: number
    ordersThisMonth: number
    revenueThisMonth: number
    topSellingWeight: string
    recentReviews: Array<{
      _id: string
      rating: number
      comment: string
      user: { name: string }
      createdAt: string
    }>
  }
}

export function ProductAnalytics({ productId }: ProductAnalyticsProps) {
  const [data, setData] = useState<ProductAnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [productId])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/admin/products/${productId}/analytics`)
      if (response.ok) {
        const analyticsData = await response.json()
        setData(analyticsData)
      } else {
        throw new Error("Failed to fetch analytics")
      }
    } catch (error) {
      console.error("Error fetching analytics:", error)
      toast.error("Failed to load product analytics")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center py-8">Loading analytics...</div>
  }

  if (!data) {
    return <div className="text-center py-8 text-muted-foreground">Analytics data not available</div>
  }

  const { product, analytics } = data

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>
      </div>

      {/* Product Header */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <img
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="text-muted-foreground">{product.slug}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">{product.category}</Badge>
                {product.isFeatured && <Badge>Featured</Badge>}
                <Badge variant={product.isActive ? "default" : "secondary"}>
                  {product.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.ratings.toFixed(1)}</span>
              </div>
              <p className="text-sm text-muted-foreground">{product.numReviews} reviews</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{analytics.viewsThisMonth} this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{analytics.ordersThisMonth} this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{analytics.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">₹{analytics.revenueThisMonth.toLocaleString()} this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Avg. order: ₹{analytics.averageOrderValue.toFixed(0)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
            <CardDescription>Key metrics and trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Top Selling Weight</p>
                <p className="text-sm text-muted-foreground">{analytics.topSellingWeight}</p>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Average Order Value</p>
                <p className="text-sm text-muted-foreground">₹{analytics.averageOrderValue.toFixed(0)}</p>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Customer Rating</p>
                <p className="text-sm text-muted-foreground">{product.ratings.toFixed(1)}/5.0 stars</p>
              </div>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
            <CardDescription>Latest customer feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentReviews.length > 0 ? (
                analytics.recentReviews.map((review) => (
                  <div key={review._id} className="border-b pb-3 last:border-b-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }, (_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{review.user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No reviews yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
