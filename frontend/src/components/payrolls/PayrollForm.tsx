import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PayrollService } from "@/services/payroll.service"
import { EmployeeService } from "@/services/employee.service"
import type { Employee } from "@/types/employee"
import type { Payroll } from "@/types/payroll"
import { toast } from "sonner"

type Props = {
  payroll?: Payroll | null
  onSuccess: () => void
}

/* ================= HELPERS ================= */
const parseIntSafe = (val: string): number => {
  if (!val || val.trim() === "") return 0
  return Number.isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10)
}

export default function PayrollForm({ payroll, onSuccess }: Props) {
  const isEdit = !!payroll

  const [employees, setEmployees] = useState<Employee[]>([])
  const [employeeId, setEmployeeId] = useState("")
  const [basicSalary, setBasicSalary] = useState(0)

  const [month, setMonth] = useState("")
  const [allowance, setAllowance] = useState("")
  const [deduction, setDeduction] = useState("")
  const [loading, setLoading] = useState(false)

  /* ================= FETCH EMPLOYEES ================= */
  useEffect(() => {
    EmployeeService.getAll()
      .then((res) => setEmployees(res ?? []))
      .catch(() => toast.error("Gagal load employee"))
  }, [])

  /* ================= PREFILL SAAT EDIT ================= */
  useEffect(() => {
    if (!payroll) return

    setEmployeeId(String(payroll.employee_id))
    setMonth(payroll.month)
    setBasicSalary(payroll.basic_salary)
    setAllowance(payroll.allowance?.toString() ?? "")
    setDeduction(payroll.deduction?.toString() ?? "")
  }, [payroll])

  /* ================= SYNC BASIC SALARY (CREATE ONLY) ================= */
  useEffect(() => {
    if (isEdit) return
    if (!employeeId) {
      setBasicSalary(0)
      return
    }

    const emp = employees.find((e) => e.id === Number(employeeId))
    setBasicSalary(Math.round(emp?.salary ?? 0))
  }, [employeeId, employees, isEdit])

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!employeeId || !month) {
      toast.error("Employee dan bulan wajib diisi")
      return
    }

    setLoading(true)

    try {
      const payload = {
        employee_id: Number(employeeId),
        month,
        basic_salary: basicSalary,
        allowance: parseIntSafe(allowance),
        deduction: parseIntSafe(deduction),
      }

      if (isEdit && payroll) {
        await PayrollService.update(payroll.id, payload)
        toast.success("Payroll berhasil diperbarui")
      } else {
        await PayrollService.create(payload)
        toast.success("Payroll berhasil dibuat")
      }

      onSuccess()
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ??
          "Gagal memproses payroll"
      )
    } finally {
      setLoading(false)
    }
  }

  /* ================= TOTAL ================= */
  const totalSalary = Math.round(
    basicSalary +
      parseIntSafe(allowance) -
      parseIntSafe(deduction)
  )

  /* ================= UI ================= */
  return (
    <div className="space-y-4">
      <label>Employee</label>
      <Select
        value={employeeId}
        onValueChange={setEmployeeId}
        disabled={isEdit}
      >
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

      <label>Month</label>
      <Input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        disabled={isEdit}
      />

      <label>Basic Salary</label>
      <Input
        value={basicSalary.toLocaleString("id-ID")}
        readOnly
        className="bg-muted"
      />

      <label>Allowance (Tunjangan)</label>
      <Input
        type="text"
        inputMode="numeric"
        placeholder="0"
        value={allowance}
        onChange={(e) => {
          const raw = e.target.value
          if (/^\d*$/.test(raw)) setAllowance(raw)
        }}
      />

      <label>Deduction (Potongan)</label>
      <Input
        type="text"
        inputMode="numeric"
        placeholder="0"
        value={deduction}
        onChange={(e) => {
          const raw = e.target.value
          if (/^\d*$/.test(raw)) setDeduction(raw)
        }}
      />

      <div className="text-sm text-muted-foreground">
        Total Salary:{" "}
        <b>Rp {totalSalary.toLocaleString("id-ID")}</b>
      </div>

      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : isEdit
          ? "Update Payroll"
          : "Generate Payroll"}
      </Button>
    </div>
  )
}
