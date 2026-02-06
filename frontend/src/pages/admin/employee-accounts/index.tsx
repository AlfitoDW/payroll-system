import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import type { EmployeeAccount } from "@/types/employeeAccount"
import { EmployeeAccountService } from "@/services/employeeAccount.service"
import CreateEmployeeAccountDialog from "@/components/employees-accounts/CreateEmployeeAccountDialog"

export default function AdminEmployeeAccountPage() {
  const [data, setData] = useState<EmployeeAccount[]>([])
  const [open, setOpen] = useState(false)

  const fetchData = async () => {
    const res = await EmployeeAccountService.getAll()
    setData(res ?? [])
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Employee Accounts</h1>
        <Button onClick={() => setOpen(true)}>
          + Create Account
        </Button>
      </div>

      <div className="border rounded bg-white">
        <table className="w-full text-sm">
          <thead className="bg-muted border-b">
            <tr>
              <th className="p-3 text-left">Employee</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-muted-foreground">
                  Belum ada akun employee
                </td>
              </tr>
            )}

            {data.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="p-3">{u.employee?.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => {
                      const res = await EmployeeAccountService.resetPassword(u.id)
                      toast.success(
                        `Password baru: ${res.password}`,
                        { duration: 10000 }
                      )
                    }}
                  >
                    Reset Password
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateEmployeeAccountDialog
        open={open}
        setOpen={setOpen}
        onSuccess={fetchData}
      />
    </div>
  )
}
