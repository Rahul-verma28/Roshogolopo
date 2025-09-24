import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { PageHeader } from "@/components/admin/PageHeader"
import { ProductAnalytics } from "@/components/admin/ProductAnalytics"

export default function ProductAnalyticsPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <PageHeader title="Product Analytics" description="Detailed insights and performance metrics" />
        <ProductAnalytics productId={params.id} />
      </AdminLayout>
    </ProtectedRoute>
  )
}
