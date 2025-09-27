import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { CategoryForm } from "@/components/admin/CategoryForm"

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <CategoryForm categoryId={params.id} />
      </AdminLayout>
    </ProtectedRoute>
  )
}
