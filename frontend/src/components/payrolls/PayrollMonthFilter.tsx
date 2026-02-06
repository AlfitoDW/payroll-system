import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const months = [
  { value: 1, label: "Januari" },
  { value: 2, label: "Februari" },
  { value: 3, label: "Maret" },
  { value: 4, label: "April" },
  { value: 5, label: "Mei" },
  { value: 6, label: "Juni" },
  { value: 7, label: "Juli" },
  { value: 8, label: "Agustus" },
  { value: 9, label: "September" },
  { value: 10, label: "Oktober" },
  { value: 11, label: "November" },
  { value: 12, label: "Desember" },
]

type Props = {
  month: number
  year: number
  onChange: (month: number, year: number) => void
}

export default function PayrollMonthFilter({
  month,
  year,
  onChange,
}: Props) {
  const years = Array.from({ length: 10 }, (_, i) => 2023 + i)

  return (
    <div className="flex gap-2">
      {/* MONTH */}
      <Select
        value={month.toString()}
        onValueChange={(v) => onChange(Number(v), year)}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Bulan" />
        </SelectTrigger>
        <SelectContent>
          {months.map((m) => (
            <SelectItem key={m.value} value={m.value.toString()}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* YEAR */}
      <Select
        value={year.toString()}
        onValueChange={(v) => onChange(month, Number(v))}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Tahun" />
        </SelectTrigger>
        <SelectContent>
          {years.map((y) => (
            <SelectItem key={y} value={y.toString()}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
