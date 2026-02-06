// src/pages/employee/Profile.tsx
import { useState } from "react"
import api from "@/api/axios"
import { useAuthContext } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import UserAvatar from "@/components/common/UserAvatar"
import { toast } from "sonner"

export default function EmployeeProfile() {
  const { user, login } = useAuthContext()
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  if (!user) return null

  const uploadAvatar = async () => {
  if (!file) {
    toast.error("Pilih gambar dulu")
    return
  }

  const formData = new FormData()
  formData.append("avatar", file)

  try {
    setLoading(true)

    const res = await api.post("/me/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    
    login({
      user: {
        ...user,
        avatar: res.data.avatar,
      },
      token: sessionStorage.getItem("token")!,
    })

    toast.success("Avatar berhasil diupdate")
  } catch (err: any) {
    console.error(err.response?.data)
    toast.error("Gagal upload avatar")
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="space-y-4 max-w-sm">
      <h1 className="text-xl font-semibold">Profile</h1>

      <UserAvatar name={user.name} avatar={user.avatar} size={64} />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <Button onClick={uploadAvatar} disabled={loading}>
        {loading ? "Uploading..." : "Upload Avatar"}
      </Button>
    </div>
  )
}
