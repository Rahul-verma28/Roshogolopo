import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { CustomerProfile } from "@/components/admin/CustomerProfile"

export default function CustomerProfilePage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <CustomerProfile customerId={params.id} />
      </AdminLayout>
    </ProtectedRoute>
  )
}
