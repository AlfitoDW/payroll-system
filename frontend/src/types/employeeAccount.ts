import type { Employee } from "./employee"

export type EmployeeAccount = {
  id: number
  email: string
  role: "employee"
  employee: Employee
}
