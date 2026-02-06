import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"
import { useAuthContext } from "@/contexts/AuthContext"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { login } = useAuthContext()
  const navigate = useNavigate() 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Email dan password wajib diisi")
      return
    }

    try {
      setLoading(true)

      const res = await api.post("/login", { email, password })

      // simpan ke context + localStorage
      login({
        user: res.data.user,
        token: res.data.token,
      })

      toast.success("Login berhasil")

      // REDIRECT BERDASARKAN ROLE
      setTimeout(() => {
        if (res.data.user.role === "admin") {
          navigate("/admin", { replace: true })
        } else {
          navigate("/employee", { replace: true })
        }
      }, 300)

    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Email atau password salah"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white border border-neutral-800 rounded-xl p-6 shadow-lg">
        <h1 className="text-xl font-semibold mb-1">Payroll System</h1>
        <p className="text-sm mb-6">Sign in to continue</p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="text-xs">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="text-xs">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border px-3 py-2 pr-10 rounded-md"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-md"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  )
}
