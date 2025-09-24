import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { OrderDetails } from "@/components/admin/OrderDetails"

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <OrderDetails orderId={params.id} />
      </AdminLayout>
    </ProtectedRoute>
  )
}
