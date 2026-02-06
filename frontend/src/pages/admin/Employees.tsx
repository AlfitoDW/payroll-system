import { useEffect, useState } from "react"
import type { Employee } from "@/types/employee"
import { EmployeeService } from "@/services/employee.service"
import EmployeeDialog from "@/components/employees/EmployeeDialog"
import { Button } from "@/components/ui/button"
import EmployeeDeleteDialog from "@/components/employees/EmployeeDeleteDialog"

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null)
  const [open, setOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null)

  const fetchEmployees = async () => {
    setLoading(true)
    const data = await EmployeeService.getAll()
    setEmployees(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleCreate = () => {
    setSelectedEmployee(null)
    setOpen(true)
  }

  const handleEdit = (emp: Employee) => {
    setSelectedEmployee(emp)
    setOpen(true)
  }

  const handleDelete = (emp: Employee) => {
    setEmployeeToDelete(emp)
    setDeleteOpen(true)
  }

  if (loading) return <div>Loading employees...</div>

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Employees</h1>
        <Button onClick={handleCreate}>+ Add Employee</Button>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-lg">
        <table className="w-full text-sm">
          <thead className="border-b bg-neutral-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Position</th>
              <th className="p-3 text-right">Salary</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b">
                <td className="p-3">{emp.name}</td>
                <td className="p-3">{emp.email}</td>
                <td className="p-3">{emp.position}</td>
                <td className="p-3 text-right">
                  Rp {Math.round(emp.salary).toLocaleString("id-ID")}
                </td>
                <td className="p-3 text-right flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(emp)}
                  >
                    Edit
                  </Button>
                  <Button 
                    size = "sm"
                    variant="destructive"
                    onClick={() => handleDelete(emp)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ SATU DIALOG SAJA */}
      <EmployeeDialog
        open={open}
        setOpen={setOpen}
        employee={selectedEmployee}
        onSuccess={fetchEmployees}
      />

      <EmployeeDeleteDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        employee={employeeToDelete}
        onSuccess={fetchEmployees}
      />
    </div>
  )
}
