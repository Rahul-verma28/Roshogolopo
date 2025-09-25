import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { OrdersTable } from "@/components/admin/OrdersTable"

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <OrdersTable />
      </AdminLayout>
    </ProtectedRoute>
  )
}
