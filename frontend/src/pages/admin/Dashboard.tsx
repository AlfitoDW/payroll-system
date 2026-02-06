import { useEffect, useState } from "react"
import SummaryCard from "@/components/dashboard/SummaryCard"
import { EmployeeService } from "@/services/employee.service"
import api from "@/api/axios"
import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

import {
  Users,
  Wallet,
  CheckCircle,
  Clock,
  CalendarIcon,
} from "lucide-react"

import { format } from "date-fns"

type PayrollSummary = {
  month: string
  total_employee: number
  total_paid: number
  paid: number
  pending: number
}

export default function Dashboard() {
  const now = new Date()

  // 📅 calendar state
  const [date, setDate] = useState<Date>(now)

  // backend expects YYYY-MM
  const month = format(date, "yyyy-MM")

  const [employeeCount, setEmployeeCount] = useState(0)
  const [summary, setSummary] = useState<PayrollSummary | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchDashboard = async () => {
    setLoading(true)
    try {
      const [employeesRes, summaryRes] = await Promise.all([
        EmployeeService.getAll(),
        api.get(`/payrolls/summary/${month}`),
      ])

      setEmployeeCount(employeesRes.length)
      setSummary(summaryRes.data)
    } catch (err) {
      console.error("Gagal load dashboard", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [month])

  if (loading) return <div>Loading dashboard...</div>

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dashboard</h1>

        {/* MONTH PICKER */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2"
            >
              <CalendarIcon size={16} />
              {format(date, "MMMM yyyy")}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => d && setDate(d)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Total Employees"
          value={employeeCount}
          icon={<Users size={28} />}
        />

        <SummaryCard
          title="Total Payroll"
          value={`Rp ${Math.round(summary?.total_paid ?? 0).toLocaleString("id-ID")}`}
          description={`Bulan ${format(date, "MMMM yyyy")}`}
          icon={<Wallet size={28} />}
        />

        <SummaryCard
          title="Paid"
          value={summary?.paid ?? 0}
          icon={<CheckCircle size={28} />}
        />

        <SummaryCard
          title="Pending"
          value={summary?.pending ?? 0}
          icon={<Clock size={28} />}
        />
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white border rounded-lg p-4">
        <h2 className="text-sm font-medium mb-3">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => (window.location.href = "/admin/payroll")}
          >
            Payroll List
          </Button>

          <Button
            variant="outline"
            onClick={() => (window.location.href = "/admin/employees")}
          >
            Employees
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              (window.location.href = "/admin/employee-accounts")
            }
          >
            Employee Accounts
          </Button>
        </div>
      </div>
    </div>
  )
}
