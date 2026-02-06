import api from "@/api/axios"
import type { CreatePayrollPayload } from "@/types/payroll"


type GetPayrollParams = {
  month?: number
  year?: number
}

export const PayrollService = {
 
  getAll: async (params?: GetPayrollParams) => {
    const res = await api.get("/payrolls", {
      params,
    })
    return res.data.data
  },

  
  create: async (payload: CreatePayrollPayload) => {
    const res = await api.post("/payrolls", payload)
    return res.data
  },

  
  pay: async (id: number) => {
    const res = await api.post(`/payrolls/${id}/pay`)
    return res.data
  },

  update: async (id: number, payload: any) => {
  const res = await api.put(`/payrolls/${id}`, payload)
  return res.data
},

  delete: async (id: number) => {
    const res = await api.delete(`/payrolls/${id}`)
    return res.data
  },

  getMyPayrolls: async () => {
  const res = await api.get("/my-payrolls")
  return res.data.data
},

}
