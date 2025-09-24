import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { PageHeader } from "@/components/admin/PageHeader"
import { CategoryForm } from "@/components/admin/CategoryForm"

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <PageHeader title="Edit Category" description="Update category information and settings" />
        <CategoryForm categoryId={params.id} />
      </AdminLayout>
    </ProtectedRoute>
  )
}
