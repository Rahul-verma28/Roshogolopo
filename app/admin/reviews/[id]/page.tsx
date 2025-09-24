import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { PageHeader } from "@/components/admin/PageHeader"
import { ReviewDetails } from "@/components/admin/ReviewDetails"

export default function ReviewDetailsPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <PageHeader title="Review Details" description="View and manage customer review" />
        <ReviewDetails reviewId={params.id} />
      </AdminLayout>
    </ProtectedRoute>
  )
}
