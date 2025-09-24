import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { OrdersTable } from "@/components/admin/OrdersTable"

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <OrdersTable />
      </AdminLayout>
    </ProtectedRoute>
  )
}
