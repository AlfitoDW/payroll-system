import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { EmployeeService } from "@/services/employee.service"
import type { Employee } from "@/types/employee"

type Props = {
  employee?: Employee
  onSuccess: () => void
}

export default function EmployeeForm({ employee, onSuccess }: Props) {
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "",
    salary: "", // 🔥 STRING ONLY (INTEGER)
  })

  /* ================= PREFILL SAAT EDIT ================= */
  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name,
        email: employee.email,
        position: employee.position,
        salary: String(Math.round(employee.salary)), // 🔥 PAKSA INTEGER
      })
    } else {
      setForm({
        name: "",
        email: "",
        position: "",
        salary: "",
      })
    }
  }, [employee])

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // 🔥 KHUSUS SALARY: HANYA ANGKA BULAT
    if (name === "salary") {
      setForm({
        ...form,
        salary: value.replace(/\D/g, ""), // ❌ koma ❌ titik
      })
      return
    }

    setForm({ ...form, [name]: value })
  }

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.position || !form.salary) {
      toast.error("Semua field wajib diisi")
      return
    }

    try {
      setLoading(true)

      const payload = {
        ...form,
        salary: parseInt(form.salary, 10), // 🔥 PASTI INTEGER
      }

      if (employee) {
        // 🔥 UPDATE
        await EmployeeService.update(employee.id, payload)
        toast.success("Employee berhasil diupdate")
      } else {
        // 🔥 CREATE
        await EmployeeService.create(payload)
        toast.success("Employee berhasil ditambahkan")
      }

      onSuccess()
    } catch {
      toast.error("Terjadi kesalahan")
    } finally {
      setLoading(false)
    }
  }

  /* ================= UI ================= */
  return (
    <div className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="mt-2"
        />
      </div>

      <div>
        <Label>Email</Label>
        <Input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="mt-2"
        />
      </div>

      <div>
        <Label>Position</Label>
        <Input
          name="position"
          value={form.position}
          onChange={handleChange}
          className="mt-2"
        />
      </div>

      <div>
        <Label>Salary (Rp)</Label>
        <Input
          name="salary"
          type="text"
          inputMode="numeric"
          placeholder="Contoh: 3000000"
          value={form.salary}
          onChange={handleChange}
          className="mt-2"
        />
      </div>

      <Button onClick={handleSubmit} disabled={loading} className="w-full">
        {loading
          ? "Saving..."
          : employee
          ? "Update Employee"
          : "Save Employee"}
      </Button>
    </div>
  )
}
