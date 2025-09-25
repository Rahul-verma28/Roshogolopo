import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { CustomersTable } from "@/components/admin/CustomersTable"


// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'

export default function CustomersPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <CustomersTable />
      </AdminLayout>
    </ProtectedRoute>
  )
}
