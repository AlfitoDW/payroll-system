import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { EmployeeService } from "@/services/employee.service"
import { EmployeeAccountService } from "@/services/employeeAccount.service"
import type { Employee } from "@/types/employee"

type Props = {
  open: boolean
  setOpen: (v: boolean) => void
  onSuccess: () => void
}

export default function CreateEmployeeAccountDialog({
  open,
  setOpen,
  onSuccess,
}: Props) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [employeeId, setEmployeeId] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    EmployeeService.getAll().then((res) => setEmployees(res ?? []))
  }, [])

  const handleSubmit = async () => {
    if (!employeeId || !email) {
      toast.error("Employee dan email wajib diisi")
      return
    }

    setLoading(true)

    try {
      const res = await EmployeeAccountService.create({
        employee_id: Number(employeeId),
        email,
      })

      toast.success(
        `Akun dibuat. Password: ${res.password}`,
        { duration: 10000 }
      )

      onSuccess()
      setOpen(false)
      setEmployeeId("")
      setEmail("")
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ??
          "Gagal membuat akun"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Employee Account</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Select value={employeeId} onValueChange={setEmployeeId}>
            <SelectTrigger>
              <SelectValue placeholder="Select Employee" />
            </SelectTrigger>
            <SelectContent>
              {employees.map((e) => (
                <SelectItem key={e.id} value={String(e.id)}>
                  {e.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Create Account"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
