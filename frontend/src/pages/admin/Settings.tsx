
import { useState } from "react"
import api from "@/api/axios"
import { useAuthContext } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import UserAvatar from "@/components/common/UserAvatar"
import { toast } from "sonner"
import ChangePassword from "../employee/ChangePassword"

export default function Settings() {
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
      <Card>
        <CardHeader>
          <CardTitle>Avatar</CardTitle>
          <CardDescription>Upload a new avatar for your profile.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-4">
          <UserAvatar name={user.name} avatar={user.avatar} size={64} />

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="avatar-upload">Upload Avatar</Label>
            <Input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <Button onClick={uploadAvatar} disabled={loading}>
            {loading ? "Uploading..." : "Upload Avatar"}
          </Button>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password for enhanced security.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePassword />
        </CardContent>
      </Card>

    </div>
  )
}
