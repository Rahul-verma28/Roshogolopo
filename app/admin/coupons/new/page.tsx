import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { PageHeader } from "@/components/admin/PageHeader"
import { CouponForm } from "@/components/admin/CouponForm"

export default function NewCouponPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <PageHeader title="Create New Coupon" description="Set up a new discount coupon for your customers" />
        <CouponForm />
      </AdminLayout>
    </ProtectedRoute>
  )
}
