import { useEffect, useState } from "react"
import type { Payroll } from "@/types/payroll"
import api from "@/api/axios"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

export default function EmployeePayrollPage() {
  const [data, setData] = useState<Payroll[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPayrolls = async () => {
    try {
      setLoading(true)
      const res = await api.get("/my-payrolls")
      setData(res.data.data ?? [])
    } catch (err) {
      toast.error("Gagal memuat payroll")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPayrolls()
  }, [])

  const handleDownloadSlip = async (id: number) => {
    try {
      const res = await api.get(`/my-payrolls/${id}/slip`, {
        responseType: "blob",
      })

      const blob = new Blob([res.data], { type: "application/pdf" })
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = "slip-gaji.pdf"
      a.click()

      window.URL.revokeObjectURL(url)
    } catch {
      toast.error("Gagal download slip")
    }
  }

  if (loading) return <div>Loading payroll...</div>

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Payroll Saya</h1>

      <div className="bg-white border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b">
            <tr>
              <th className="p-3 text-left">Bulan</th>
              <th className="p-3 text-right">Total Gaji</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-center text-muted-foreground"
                >
                  Belum ada payroll
                </td>
              </tr>
            )}

            {data.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-3">{p.month}</td>

                <td className="p-3 text-right">
                  Rp {Math.round(p.total_salary).toLocaleString("id-ID")}
                </td>

                <td className="p-3 text-center">
                  {p.status === "paid" ? (
                    <span className="text-green-600 font-medium">
                      
                      Paid
                    </span>
                  ) : (
                    <Badge variant="secondary">
                       <Spinner data-icon="inline-start" />
                          Pending
                    </Badge>
                  )}
                </td>

                <td className="p-3 text-right">
                  {p.status === "paid" ? (
                    <Button
                      size="sm"
                      onClick={() => handleDownloadSlip(p.id)}
                    >
                      Download Slip
                    </Button>
                  ) : (
                    <span className="text-muted-foreground text-xs">
                      Belum tersedia
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
