import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { EmployeeService } from "@/services/employee.service"
import type { Employee } from "@/types/employee"

type Props = {
  open: boolean
  setOpen: (v: boolean) => void
  employee: Employee | null
  onSuccess: () => void
}

export default function EmployeeDeleteDialog({
  open,
  setOpen,
  employee,
  onSuccess,
}: Props) {
  const handleDelete = async () => {
    if (!employee) return

    try {
      await EmployeeService.delete(employee.id)
      toast.success("Employee berhasil dihapus")
      setOpen(false)
      onSuccess()
    } catch {
      toast.error("Gagal menghapus employee")
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Employee?</AlertDialogTitle>
          <AlertDialogDescription>
            Yakin ingin menghapus{" "}
            <strong>{employee?.name}</strong>?  
            Tindakan ini tidak bisa dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
