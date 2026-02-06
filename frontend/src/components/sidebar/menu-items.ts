import type { LucideIcon } from "lucide-react"
import {
  Home,
  Users,
  Wallet,
  FileText,
  Settings,
} from "lucide-react"

/* ================= TYPES ================= */
export type MenuItem = {
  title: string
  icon: LucideIcon
  url?: string
  children?: {
    title: string
    url: string
  }[]
}

/* ================= ADMIN MENU ================= */
export const adminMenu: MenuItem[] = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/admin",
  },
  {
    title: "Employees",
    icon: Users,
    children: [
      { title: "Employee List", url: "/admin/employees" },
      { title: "Employee Accounts", url: "/admin/employee-accounts" },
      { title: "Attendance", url: "/admin/employees/attendance" },
      { title: "Salaries", url: "/admin/employees/salaries" },
    ],
  },
  {
    title: "Payroll",
    icon: Wallet,
    children: [
      { title: "Payroll", url: "/admin/payroll" },
      { title: "Process Payroll", url: "/admin/payroll/process" },
      { title: "History", url: "/admin/payroll/history" },
    ],
  },
  {
    title: "Reports",
    icon: FileText,
    url: "/admin/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/admin/settings",
  },
]

/* ================= EMPLOYEE MENU ================= */
export const employeeMenu: MenuItem[] = [
  {
    title: "Payroll Saya",
    icon: Wallet,
    url: "/employee/payroll",
  },
  {
    title : "Pengaturan Akun",
    icon: Settings,
    url: "/employee/settings",
  },
  {
    title : "Profil",
    icon: Users,
    url: "/employee/profile",
  }
]
