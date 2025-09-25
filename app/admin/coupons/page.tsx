import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { PageHeader } from "@/components/admin/PageHeader"
import { CouponsTable } from "@/components/admin/CouponsTable"


// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'

export default function CouponsPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <PageHeader title="Coupons" description="Create and manage discount coupons for your customers" />
        <CouponsTable />
      </AdminLayout>
    </ProtectedRoute>
  )
}
