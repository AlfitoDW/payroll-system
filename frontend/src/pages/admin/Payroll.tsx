import { useEffect, useState } from "react"
import type { Payroll } from "@/types/payroll"
import { PayrollService } from "@/services/payroll.service"
import { Button } from "@/components/ui/button"

import PayrollDialog from "@/components/payrolls/PayrollDialog"
import PayrollPayDialog from "@/components/payrolls/PayrollPayDialog"
import PayrollMonthFilter from "@/components/payrolls/PayrollMonthFilter"
import { toast } from "sonner"
import ConfirmDeletePayroll from "@/components/payrolls/ConfirmDeletePayroll"

export default function PayrollPage() {
  const [data, setData] = useState<Payroll[]>([])
  const [open, setOpen] = useState(false)
  const [payOpen, setPayOpen] = useState(false)
  const [selected, setSelected] = useState<Payroll | null>(null)

  // 👉 STATE FILTER BULAN & TAHUN
  const [month, setMonth] = useState<number>(
    new Date().getMonth() + 1
  )
  const [year, setYear] = useState<number>(
    new Date().getFullYear()
  )

  const fetchData = async () => {
    const res = await PayrollService.getAll({
      month,
      year,
    })
    setData(res ?? [])
  }

  // 👉 AUTO REFETCH SAAT BULAN / TAHUN BERUBAH
  useEffect(() => {
    fetchData()
  }, [month, year])

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Payroll</h1>

        <div className="flex gap-2">
          <PayrollMonthFilter
            month={month}
            year={year}
            onChange={(m, y) => {
              setMonth(m)
              setYear(y)
            }}
          />

          <Button
            onClick={() => {
              setSelected(null) 
              setOpen(true)
            }}
          >
            + Generate Payroll
          </Button>
        </div>
      </div>

      {/* TABLE */}
      <div className="border rounded bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b">
            <tr>
              <th className="p-3 text-left">Employee</th>
              <th className="p-3 text-center">Month</th>
              <th className="p-3 text-right">Salary</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-4 text-center text-muted-foreground"
                >
                  Tidak ada payroll
                </td>
              </tr>
            )}

            {data.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-3">{p.employee.name}</td>

                <td className="p-3 text-center">
                  {p.month}
                </td>

                <td className="p-3 text-right">
                  Rp {Math.round(p.total_salary).toLocaleString("id-ID")}
                </td>

                <td className="p-3 text-center">
                  {p.status === "paid" ? "Paid" : "Unpaid"}
                </td>

                <td className="p-3 text-right space-x-2">
  {/* PAY */}
  {p.status === "pending" && (
    <Button
      size="sm"
      onClick={() => {
        setSelected(p)
        setPayOpen(true)
      }}
    >
      Pay
    </Button>
  )}

  {/* EDIT & DELETE */}
  {p.status === "pending" && (
    <>
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setSelected(p)
          setOpen(true)
        }}
      >
        Edit
      </Button>

      <ConfirmDeletePayroll
        onConfirm={async () => {
          try {
            await PayrollService.delete(p.id)
            toast.success("Payroll berhasil dihapus")
            fetchData()
          } catch (err: any) {
            toast.error(
              err?.response?.data?.message ??
              "Gagal menghapus payroll"
            )
          }
        }}
      />
    </>
  )}

  {/* LOCKED */}
  {p.status === "paid" && (
    <span className="text-muted-foreground text-sm">
      Locked
    </span>
  )}
</td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DIALOG */}
      <PayrollDialog
        open={open}
        setOpen={setOpen}
        payroll={selected}
        onSuccess={fetchData}
      />

      <PayrollPayDialog
        open={payOpen}
        setOpen={setPayOpen}
        payroll={selected}
        onSuccess={fetchData}
      />
    </div>
  )
}
