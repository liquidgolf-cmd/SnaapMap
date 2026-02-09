import { useNavigate } from 'react-router-dom'
import { useAudit } from '../../context/AuditContext'
import {
  auditSections,
  getSectionById,
  type SectionId,
} from '../../data/auditQuestions'
import { QuestionCard } from './QuestionCard'

export function QuestionFlow() {
  const navigate = useNavigate()
  const {
    currentSectionId,
    setCurrentSection,
    responses,
    setResponse,
    completedSections,
  } = useAudit()

  const section = currentSectionId ? getSectionById(currentSectionId) : null
  const currentIndex = auditSections.findIndex((s) => s.id === currentSectionId)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < auditSections.length - 1 && currentIndex >= 0
  const isOnLastSection = currentIndex === auditSections.length - 1 && currentIndex >= 0

  const goPrev = () => {
    if (hasPrev) setCurrentSection(auditSections[currentIndex - 1].id)
  }

  const goNext = () => {
    if (isOnLastSection) {
      navigate('/prompts')
    } else if (hasNext) {
      setCurrentSection(auditSections[currentIndex + 1].id)
    }
  }

  if (!section) {
    return (
      <div className="p-4 text-slate-400 text-sm">
        Select a section to start the audit.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-slate-700 shadow-sm border border-slate-600 p-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-1">
          {section.title}
        </h3>
        <p className="text-sm text-slate-400 mb-6">{section.description}</p>
        <div className="space-y-6">
          {section.questions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              value={responses[q.id]}
              onChange={(v) => setResponse(q.id, v)}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          disabled={!hasPrev}
          className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>
        <div className="flex gap-2">
          {auditSections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrentSection(s.id as SectionId)}
              className={`w-2 h-2 rounded-full transition-colors ${
                s.id === currentSectionId
                  ? 'bg-blue-500'
                  : completedSections.has(s.id as SectionId)
                    ? 'bg-green-500'
                    : 'bg-slate-500 hover:bg-slate-400'
              }`}
              title={s.title}
              aria-label={`Go to ${s.title}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={goNext}
          disabled={!hasNext && !isOnLastSection}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isOnLastSection ? 'Go to Export' : 'Next'}
        </button>
      </div>
    </div>
  )
}
