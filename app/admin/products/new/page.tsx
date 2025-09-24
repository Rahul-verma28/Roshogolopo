import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { ProductForm } from "@/components/admin/ProductForm"

export default function NewProductPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <ProductForm />
      </AdminLayout>
    </ProtectedRoute>
  )
}
