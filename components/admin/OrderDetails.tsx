"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "./PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Package, User, MapPin, CreditCard, Calendar } from "lucide-react"
import type { Order } from "@/lib/types"
import { toast } from "sonner"

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Processing: "bg-blue-100 text-blue-800",
  Shipped: "bg-purple-100 text-purple-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
  Refunded: "bg-gray-100 text-gray-800",
}

export function OrderDetails({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  const fetchOrder = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/orders/${orderId}`)
      if (!response.ok) throw new Error("Failed to fetch order")

      const data = await response.json()
      setOrder(data.order)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load order details")
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (newStatus: string) => {
    try {
      setUpdating(true)
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderStatus: newStatus }),
      })

      if (!response.ok) throw new Error("Failed to update order status")

      const data = await response.json()
      setOrder(data.order)

      toast.success("Order status updated successfully")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update order status")
    } finally {
      setUpdating(false)
    }
  }

  useEffect(() => {
    fetchOrder()
  }, [orderId])

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Loading order details...</div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Order not found</div>
      </div>
    )
  }

  const breadcrumbs = [
    { label: "Dashboard", href: "/admin" },
    { label: "Orders", href: "/admin/orders" },
    { label: `Order #${order._id.toString().slice(-8)}` },
  ]

  return (
    <>
      <PageHeader
        title={`Order #${order._id.toString().slice(-8)}`}
        description={`Placed on ${formatDate(order.createdAt)}`}
        breadcrumbs={breadcrumbs}
        action={
          <div className="flex items-center gap-2">
            <Select value={order.orderStatus} onValueChange={updateOrderStatus} disabled={updating}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
                <SelectItem value="Refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Badge className={statusColors[order.orderStatus] || "bg-gray-100 text-gray-800"}>
              {order.orderStatus}
            </Badge>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    {typeof item.product === "object" && item.product.images?.[0] && (
                      <img
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.name || "Product"}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="text-sm text-muted-foreground">
                        Weight: {item.weight} • Quantity: {item.qty}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹{((item.price || 0) * (item.qty || 1)).toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">₹{item.price} each</div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Items Price:</span>
                  <span>₹{order.itemsPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>₹{order.taxPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>₹{order.shippingPrice.toLocaleString()}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-₹{order.discount.toLocaleString()}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>₹{order.totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Info Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="font-medium">
                  {typeof order.user === "object" ? order.user.name || "Unknown" : "Unknown"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {typeof order.user === "object" ? order.user.email : ""}
                </div>
                <div className="text-sm text-muted-foreground">
                  {typeof order.user === "object" ? order.user.phone : ""}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                <div className="font-medium">{(order.shippingAddress as any)?.name}</div>
                <div>{(order.shippingAddress as any)?.addressLine1}</div>
                {(order.shippingAddress as any)?.addressLine2 && (
                  <div>{(order.shippingAddress as any)?.addressLine2}</div>
                )}
                <div>
                  {(order.shippingAddress as any)?.city}, {(order.shippingAddress as any)?.state}{" "}
                  {(order.shippingAddress as any)?.pincode}
                </div>
                <div className="text-muted-foreground">{(order.shippingAddress as any)?.phone}</div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Method:</span>
                  <span className="text-sm font-medium">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Status:</span>
                  <Badge variant="secondary">{(order.paymentInfo as any)?.status || "Pending"}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Order Placed</div>
                    <div className="text-xs text-muted-foreground">{formatDate(order.createdAt)}</div>
                  </div>
                </div>
                {order.orderStatus !== "Pending" && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Processing</div>
                      <div className="text-xs text-muted-foreground">Order is being prepared</div>
                    </div>
                  </div>
                )}
                {(order.orderStatus === "Shipped" || order.orderStatus === "Delivered") && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Shipped</div>
                      <div className="text-xs text-muted-foreground">Order is on the way</div>
                    </div>
                  </div>
                )}
                {order.orderStatus === "Delivered" && order.deliveredAt && (
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Delivered</div>
                      <div className="text-xs text-muted-foreground">{formatDate(order.deliveredAt)}</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
