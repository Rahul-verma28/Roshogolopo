"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PageHeader } from "./PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User, Mail, Phone, MapPin, ShoppingBag, Calendar, TrendingUp } from "lucide-react"
import type { User as UserType, Order } from "@/lib/types"
import { toast } from "sonner"

interface CustomerWithStats extends UserType {
  orderCount: number
  totalSpent: number
}

interface CustomerData {
  customer: CustomerWithStats
  orders: Order[]
}

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Processing: "bg-blue-100 text-blue-800",
  Shipped: "bg-purple-100 text-purple-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
  Refunded: "bg-gray-100 text-gray-800",
}

export function CustomerProfile({ customerId }: { customerId: string }) {
  const [data, setData] = useState<CustomerData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchCustomer = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/customers/${customerId}`)
      if (!response.ok) throw new Error("Failed to fetch customer")

      const customerData = await response.json()
      setData(customerData)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load customer data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCustomer()
  }, [customerId])

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    }
    return email?.slice(0, 2).toUpperCase() || "CU"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Loading customer profile...</div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Customer not found</div>
      </div>
    )
  }

  const { customer, orders } = data

  const breadcrumbs = [
    { label: "Dashboard", href: "/admin" },
    { label: "Customers", href: "/admin/customers" },
    { label: customer.name || customer.email },
  ]

  return (
    <>
      <PageHeader
        title="Customer Profile"
        description="View customer details and order history"
        breadcrumbs={breadcrumbs}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium text-lg">
                    {getInitials(customer.name, customer.email)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{customer.name || "Unknown"}</h3>
                  <Badge variant="secondary">{customer.role}</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{customer.email}</span>
                </div>
                {customer.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{customer.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Joined {formatDate(customer.createdAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Total Orders</span>
                  </div>
                  <span className="font-semibold">{customer.orderCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Total Spent</span>
                  </div>
                  <span className="font-semibold">₹{customer.totalSpent.toLocaleString()}</span>
                </div>
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Rewards Points</span>
                  </div>
                  <span className="font-semibold">{customer.rewards}</span>
                </div> */}
              </div>
            </CardContent>
          </Card>

          {/* Addresses */}
          {customer.addresses && customer.addresses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Addresses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customer.addresses.map((address, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      {address.default && <Badge className="mb-2">Default</Badge>}
                      <div className="space-y-1 text-sm">
                        <div className="font-medium">{address.name}</div>
                        <div>{address.addressLine1}</div>
                        {address.addressLine2 && <div>{address.addressLine2}</div>}
                        <div>
                          {address.city}, {address.state} {address.pincode}
                        </div>
                        {address.phone && <div className="text-muted-foreground">{address.phone}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order History */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No orders found</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order._id.toString()}>
                        <TableCell>
                          <Link href={`/admin/orders/${order._id}`} className="font-mono text-sm hover:underline">
                            #{order._id.toString().slice(-8)}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {order.orderItems.length} item{order.orderItems.length > 1 ? "s" : ""}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">₹{order.totalPrice.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[order.orderStatus] || "bg-gray-100 text-gray-800"}>
                            {order.orderStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{formatDate(order.createdAt)}</div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
