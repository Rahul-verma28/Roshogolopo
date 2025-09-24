import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { PageHeader } from "@/components/admin/PageHeader"
import { ReviewsTable } from "@/components/admin/ReviewsTable"

export default function ReviewsPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <PageHeader title="Reviews" description="Manage customer reviews and feedback for your products" />
        <ReviewsTable />
      </AdminLayout>
    </ProtectedRoute>
  )
}
