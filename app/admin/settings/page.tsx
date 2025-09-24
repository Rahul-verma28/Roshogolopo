import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { PageHeader } from "@/components/admin/PageHeader"
import { AdminSettings } from "@/components/admin/AdminSettings"

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
