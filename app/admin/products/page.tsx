import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { ProductsTable } from "@/components/admin/ProductsTable"
import { PageHeader } from "@/components/admin/PageHeader"

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'

export default function ProductsPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <PageHeader title="Products" description="Manage your product listings and details" />
        <ProductsTable />
      </AdminLayout>
    </ProtectedRoute>
  )
}
