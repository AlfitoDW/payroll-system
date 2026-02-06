import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import EmployeeForm from "./EmployeeForm"
import type { Employee } from "@/types/employee"

type Props = {
  open: boolean
  setOpen: (v: boolean) => void
  onSuccess: () => void
  employee: Employee | null
}

export default function EmployeeDialog({
  open,
  setOpen,
  onSuccess,
  employee,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {employee ? "Edit Employee" : "Add Employee"}
          </DialogTitle>
        </DialogHeader>

        <EmployeeForm
          employee={employee ?? undefined}
          onSuccess={() => {
            setOpen(false)
            onSuccess()
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
