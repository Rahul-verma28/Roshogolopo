import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { PageHeader } from "@/components/admin/PageHeader"
import { CouponForm } from "@/components/admin/CouponForm"

export default function EditCouponPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <PageHeader title="Edit Coupon" description="Update coupon settings and restrictions" />
        <CouponForm couponId={params.id} />
      </AdminLayout>
    </ProtectedRoute>
  )
}
