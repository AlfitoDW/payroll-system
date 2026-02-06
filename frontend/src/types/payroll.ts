import type { Employee } from "./employee"

export type Payroll = {
  id: number
  employee_id: number 
  month: string
  basic_salary: number
  allowance: number
  deduction: number
  total_salary: number
  status: "pending" | "paid"
  paid_at?: string | null
  employee: Employee
}

export type CreatePayrollPayload = {
  employee_id: number
  month: string
  basic_salary: number
  allowance: number
  deduction: number
}
