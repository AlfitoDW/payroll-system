import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import api from "@/api/axios"
import { toast } from "sonner"

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] =
    useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!currentPassword || !password || !passwordConfirmation) {
      toast.error("Semua field wajib diisi")
      return
    }

    if (password !== passwordConfirmation) {
      toast.error("Konfirmasi password tidak sama")
      return
    }

    try {
      setLoading(true)

      await api.post("/change-password", {
        current_password: currentPassword,
        password,
        password_confirmation: passwordConfirmation,
      })

      toast.success("Password berhasil diubah")

      setCurrentPassword("")
      setPassword("")
      setPasswordConfirmation("")
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ??
          "Gagal mengubah password"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-xl font-semibold">
        Ganti Password
      </h1>

      <div>
        <label className="text-sm">Password Lama</label>
        <Input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm">Password Baru</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm">Konfirmasi Password Baru</label>
        <Input
          type="password"
          value={passwordConfirmation}
          onChange={(e) =>
            setPasswordConfirmation(e.target.value)
          }
        />
      </div>

      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Processing..." : "Update Password"}
      </Button>
    </div>
  )
}
