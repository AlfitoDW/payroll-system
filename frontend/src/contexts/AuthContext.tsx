import { createContext, useContext, useEffect, useState } from "react"
import api from "@/api/axios"

type User = {
  id: number
  name: string
  email: string
  role: "admin" | "employee"
  avatar?: string | null
}

type AuthContextType = {
  user: User | null
  token: string | null
  login: (data: { user: User; token: string }) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = sessionStorage.getItem("user")
    return saved ? JSON.parse(saved) : null
  })

  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("token")
  )

  const [isLoading, setIsLoading] = useState(true)

  // 🔥 BOOTSTRAP USER DARI TOKEN
  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const res = await api.get("/me")
        setUser(res.data)
        sessionStorage.setItem("user", JSON.stringify(res.data))
      } catch {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
        setToken(null)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    bootstrap()
  }, [token])

  const login = ({ user, token }: { user: User; token: string }) => {
    setUser(user)
    setToken(token)
    sessionStorage.setItem("token", token)
    sessionStorage.setItem("user", JSON.stringify(user))
  }

  const logout = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuthContext must be used inside AuthProvider")
  }
  return ctx
}
