"use client"

import type React from "react"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Plus, Edit, Trash2 } from "lucide-react"
import type { RootState } from "@/lib/redux/store"
import { updateUserProfile } from "@/lib/redux/slices/authSlice"
import { toast } from "sonner"

interface Address {
  type: "home" | "work" | "other"
  street: string
  city: string
  state: string
  zipCode: string
  isDefault: boolean
}

export default function AddressManager() {
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector((state: RootState) => state.auth)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState<Address>({
    type: "home",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    isDefault: false,
  })

  const addresses = user?.addresses || []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      let updatedAddresses = [...addresses]

      if (editingIndex !== null) {
        updatedAddresses[editingIndex] = formData
      } else {
        updatedAddresses.push(formData)
      }

      // If this is set as default, remove default from others
      if (formData.isDefault) {
        updatedAddresses = updatedAddresses.map((addr, index) => ({
          ...addr,
          isDefault: index === (editingIndex ?? updatedAddresses.length - 1),
        }))
      }

      await dispatch(updateUserProfile({ addresses: updatedAddresses })).unwrap()

      toast.success(editingIndex !== null ? "Address updated successfully" : "Address added successfully")

      setIsDialogOpen(false)
      resetForm()
    } catch (error: any) {
      toast.error(error.message || "Failed to save address")
    }
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setFormData(addresses[index])
    setIsDialogOpen(true)
  }

  const handleDelete = async (index: number) => {
    try {
      const updatedAddresses = addresses.filter((_, i) => i !== index)
      await dispatch(updateUserProfile({ addresses: updatedAddresses })).unwrap()

      toast.success("Address deleted successfully")
    } catch (error: any) {
      toast.error(error.message || "Failed to delete address")
    }
  }

  const resetForm = () => {
    setFormData({
      type: "home",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      isDefault: false,
    })
    setEditingIndex(null)
  }

  const handleChange = (field: keyof Address, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Delivery Addresses</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingIndex !== null ? "Edit Address" : "Add New Address"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Address Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  value={formData.street}
                  onChange={(e) => handleChange("street", e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleChange("zipCode", e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={(e) => handleChange("isDefault", e.target.checked)}
                />
                <Label htmlFor="isDefault">Set as default address</Label>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Address"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium capitalize">{address.type}</span>
                  {address.isDefault && <Badge variant="secondary">Default</Badge>}
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(index)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(index)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {address.street}
                <br />
                {address.city}, {address.state} {address.zipCode}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {addresses.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No addresses added yet</p>
            <p className="text-sm text-muted-foreground">Add your first delivery address to get started</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
