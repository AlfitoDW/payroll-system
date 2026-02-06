import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import PayrollForm from "./PayrollForm"
import type { Payroll } from "@/types/payroll"

type Props = {
  open: boolean
  setOpen: (v: boolean) => void
  payroll?: Payroll | null
  onSuccess: () => void
}

export default function PayrollDialog({
  open,
  setOpen,
  payroll,
  onSuccess,
}: Props) {
  const isEdit = !!payroll

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) setOpen(false)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Payroll" : "Generate Payroll"}
          </DialogTitle>
        </DialogHeader>

        <PayrollForm
          payroll={payroll}
          onSuccess={() => {
            onSuccess()
            setOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
