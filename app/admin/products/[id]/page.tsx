import { ProductForm } from "@/components/admin/ProductForm"
import { PageHeader } from "@/components/admin/PageHeader"
import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"

interface ProductEditPageProps {
  params: {
    id: string
  }
}

export default function ProductEditPage({ params }: ProductEditPageProps) {
  return (
        <ProtectedRoute>
          <AdminLayout>
            <ProductForm productId={params.id} />
          </AdminLayout>
        </ProtectedRoute>
    // <div className="space-y-6">

    // </div>
  )
}
