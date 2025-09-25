import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { PageHeader } from "@/components/admin/PageHeader"
import { AdminSettings } from "@/components/admin/AdminSettings"


// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <PageHeader title="Settings" description="Manage your account settings and preferences" />
        <AdminSettings />
      </AdminLayout>
    </ProtectedRoute>
  )
}
