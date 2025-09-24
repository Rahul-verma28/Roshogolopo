"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface CouponFormProps {
  couponId?: string
}

interface CouponData {
  code: string
  type: "percent" | "fixed"
  value: number
  expiry: string
  minOrder: number
  maxUses: number
  isActive: boolean
}

export function CouponForm({ couponId }: CouponFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<CouponData>({
    code: "",
    type: "percent",
    value: 0,
    expiry: "",
    minOrder: 0,
    maxUses: 0,
    isActive: true,
  })

  useEffect(() => {
    if (couponId) {
      fetchCoupon()
    }
  }, [couponId])

  const fetchCoupon = async () => {
    try {
      const response = await fetch(`/api/admin/coupons/${couponId}`)
      if (response.ok) {
        const coupon = await response.json()
        setFormData({
          code: coupon.code || "",
          type: coupon.type || "percent",
          value: coupon.value || 0,
          expiry: coupon.expiry ? new Date(coupon.expiry).toISOString().split("T")[0] : "",
          minOrder: coupon.minOrder || 0,
          maxUses: coupon.maxUses || 0,
          isActive: coupon.isActive ?? true,
        })
      }
    } catch (error) {
      console.error("Error fetching coupon:", error)
      toast.error("Failed to load coupon data")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = couponId ? `/api/admin/coupons/${couponId}` : "/api/admin/coupons"
      const method = couponId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          code: formData.code.toUpperCase(),
          expiry: formData.expiry || null,
          minOrder: formData.minOrder || null,
          maxUses: formData.maxUses || null,
        }),
      })

      if (response.ok) {
        toast.success(`Coupon ${couponId ? "updated" : "created"} successfully`)
        router.push("/admin/coupons")
      } else {
        const error = await response.json()
        throw new Error(error.error || "Failed to save coupon")
      }
    } catch (error) {
      console.error("Error saving coupon:", error)
      toast.error(error instanceof Error ? error.message : "Failed to save coupon")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/admin/coupons">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Coupons
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{couponId ? "Edit Coupon" : "Create New Coupon"}</CardTitle>
          <CardDescription>
            {couponId ? "Update coupon settings and restrictions" : "Set up a new discount coupon for customers"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="code">Coupon Code *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value.toUpperCase() }))}
                  placeholder="e.g., SWEET20"
                  required
                />
                <p className="text-xs text-muted-foreground">Use uppercase letters and numbers only</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Discount Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: "percent" | "fixed") => setFormData((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percent">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="value">Discount Value * {formData.type === "percent" ? "(%)" : "(₹)"}</Label>
                <Input
                  id="value"
                  type="number"
                  min="0"
                  max={formData.type === "percent" ? "100" : undefined}
                  value={formData.value}
                  onChange={(e) => setFormData((prev) => ({ ...prev, value: Number.parseFloat(e.target.value) || 0 }))}
                  placeholder={formData.type === "percent" ? "20" : "100"}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  type="date"
                  value={formData.expiry}
                  onChange={(e) => setFormData((prev) => ({ ...prev, expiry: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground">Leave empty for no expiry</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="minOrder">Minimum Order Amount (₹)</Label>
                <Input
                  id="minOrder"
                  type="number"
                  min="0"
                  value={formData.minOrder}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, minOrder: Number.parseFloat(e.target.value) || 0 }))
                  }
                  placeholder="500"
                />
                <p className="text-xs text-muted-foreground">0 for no minimum</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxUses">Maximum Uses</Label>
                <Input
                  id="maxUses"
                  type="number"
                  min="0"
                  value={formData.maxUses}
                  onChange={(e) => setFormData((prev) => ({ ...prev, maxUses: Number.parseInt(e.target.value) || 0 }))}
                  placeholder="100"
                />
                <p className="text-xs text-muted-foreground">0 for unlimited uses</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
              />
              <Label htmlFor="isActive">Active Coupon</Label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Saving..." : couponId ? "Update Coupon" : "Create Coupon"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/coupons">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
