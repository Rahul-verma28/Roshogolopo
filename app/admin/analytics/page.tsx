import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard"


// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <AnalyticsDashboard />
      </AdminLayout>
    </ProtectedRoute>
  )
}
