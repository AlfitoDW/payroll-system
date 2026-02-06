import api from "@/api/axios"
import type { Employee } from "@/types/employee"



export const EmployeeService = {
async getAll(): Promise<Employee[]> {
  const res = await api.get("/employees")
  return res.data.data ?? res.data
}
,

  async create(payload: Partial<Employee>) {
    return api.post("/employees", payload)
  },

  async update(id: number, payload: Partial<Employee>) {
    return api.put(`/employees/${id}`, payload)
  },

  async delete(id: number) {
    return api.delete(`/employees/${id}`)
  },
}
