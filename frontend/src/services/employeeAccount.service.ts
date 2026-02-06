import api from "@/api/axios"

export const EmployeeAccountService = {
  getAll: async () => {
    const res = await api.get("/employee-users")
    return res.data
  },

  create: async (payload: {
    employee_id: number
    email: string
  }) => {
    const res = await api.post("/employee-users", payload)
    return res.data
  },

  resetPassword: async (id: number) => {
    const res = await api.post(`/employee-users/${id}/reset`)
    return res.data
  },
}
