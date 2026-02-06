import type { ReactNode } from "react"

type Props = {
  title: string
  value: string | number
  description?: string
  icon?: ReactNode
}

export default function SummaryCard({
  title,
  value,
  description,
  icon,
}: Props) {
  return (
    <div className="bg-white border rounded-lg p-4 flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{title}</p>
        <h2 className="text-2xl font-semibold">{value}</h2>
        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {icon && (
        <div className="text-muted-foreground">
          {icon}
        </div>
      )}
    </div>
  )
}
