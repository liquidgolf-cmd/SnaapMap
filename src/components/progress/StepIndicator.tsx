import { useAudit } from '../../context/AuditContext'
import { auditSections, type SectionId } from '../../data/auditQuestions'

export function StepIndicator() {
  const { currentSectionId, setCurrentSection, completedSections } = useAudit()

  return (
    <nav aria-label="Audit sections" className="space-y-1">
      <div className="text-xs font-medium text-slate-500 uppercase tracking-wider px-2 py-1">
        Sections
      </div>
      {auditSections.map((section) => {
        const isCurrent = section.id === currentSectionId
        const isCompleted = completedSections.has(section.id as SectionId)
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => setCurrentSection(section.id as SectionId)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
              isCurrent
                ? 'bg-slate-600 text-slate-100 font-medium'
                : isCompleted
                  ? 'text-slate-400 hover:bg-slate-700'
                  : 'text-slate-500 hover:bg-slate-700'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                isCurrent
                  ? 'bg-red-500 text-white'
                  : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-600 text-slate-400'
              }`}
            >
              {isCompleted && !isCurrent ? '✓' : auditSections.indexOf(section) + 1}
            </span>
            <span>{section.title}</span>
          </button>
        )
      })}
    </nav>
  )
}
