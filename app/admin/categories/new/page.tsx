import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { PageHeader } from "@/components/admin/PageHeader"
import { CategoryForm } from "@/components/admin/CategoryForm"

export default function NewCategoryPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <PageHeader title="Add New Category" description="Create a new category to organize your products" />
        <CategoryForm />
      </AdminLayout>
    </ProtectedRoute>
  )
}
