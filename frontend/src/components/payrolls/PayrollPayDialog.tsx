import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PayrollService } from "@/services/payroll.service"
import type { Payroll } from "@/types/payroll"

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  payroll: Payroll | null
  onSuccess: () => void
}

export default function PayrollPayDialog({
  open,
  setOpen,
  payroll,
  onSuccess,
}: Props) {
  if (!payroll) return null

  const handlePay = async () => {
    await PayrollService.pay(payroll.id)
    onSuccess()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Payment</DialogTitle>
        </DialogHeader>

        <p>
          Pay payroll for <b>{payroll.employee.name}</b>?
        </p>

        <Button onClick={handlePay}>Confirm Pay</Button>
      </DialogContent>
    </Dialog>
  )
}
