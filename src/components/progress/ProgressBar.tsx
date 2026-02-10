import { useAudit } from '../../context/AuditContext'

export function ProgressBar() {
  const { progressPercent } = useAudit()

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-slate-400">Audit Progress</span>
        <span className="font-medium text-slate-200">{progressPercent}%</span>
      </div>
      <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
        <div
          className="h-full bg-red-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Audit completion progress"
        />
      </div>
    </div>
  )
}
