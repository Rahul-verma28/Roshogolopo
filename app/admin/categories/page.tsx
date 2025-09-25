import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { PageHeader } from "@/components/admin/PageHeader"
import { CategoriesTable } from "@/components/admin/CategoriesTable"


// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'

export default function CategoriesPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <PageHeader title="Categories" description="Manage product categories and organize your sweet collections" />
        <CategoriesTable />
      </AdminLayout>
    </ProtectedRoute>
  )
}
