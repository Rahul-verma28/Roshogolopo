import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { CategoryForm } from "@/components/admin/CategoryForm"

export default function NewCategoryPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <CategoryForm />
      </AdminLayout>
    </ProtectedRoute>
  )
}
