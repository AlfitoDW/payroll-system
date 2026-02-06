import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "@/contexts/AuthContext"

export default function ProtectedRoute({ role }: { role?: "admin" | "employee" }) {
  const { user, token, isLoading } = useAuthContext()

  if (isLoading) return null

  if (!token || !user) {
    return <Navigate to="/login" replace />
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
