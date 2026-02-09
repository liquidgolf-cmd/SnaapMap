import { useAudit } from '../context/AuditContext'
import {
  auditSections,
  getSectionById,
  type SectionId,
} from '../data/auditQuestions'
import { STEPS } from '../data/steps'
import { ProgressBar } from '../components/progress/ProgressBar'
import { QuestionFlow } from '../components/chat/QuestionFlow'

export function Dashboard() {
  const { currentSectionId, setCurrentSection } = useAudit()
  const section = currentSectionId ? getSectionById(currentSectionId) : null
  const auditSteps = STEPS.filter((s) => s.num <= 6)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="sticky top-0 z-10 -mx-6 px-6 py-4 bg-slate-800/95 backdrop-blur-sm border-b border-slate-600/50 mb-6">
        <ProgressBar />
      </div>

      {!section ? (
        <div className="bg-slate-700 rounded-xl shadow-sm border border-slate-600 p-8 text-center">
          <h2 className="text-lg font-semibold text-slate-100 mb-2">
            Choose a step to begin
          </h2>
          <p className="text-slate-400 mb-6">
            Select a step from the sidebar or below to start the HomeRun Method
            audit.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {auditSteps.map((step) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentSection(step.id as SectionId)}
                className="px-4 py-2 rounded-lg bg-slate-600 text-slate-200 hover:bg-slate-500 transition-colors text-sm font-medium"
              >
                {step.num}. {step.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          <nav
            aria-label="Step breadcrumb"
            className="flex flex-wrap items-center gap-1 text-sm text-slate-400 mb-6"
          >
            {auditSections.map((s, i) => {
              const isClickable = s.id !== currentSectionId
              return (
                <span key={s.id} className="flex items-center gap-1">
                  {i > 0 && <span className="text-slate-600">/</span>}
                  {isClickable ? (
                    <button
                      type="button"
                      onClick={() => setCurrentSection(s.id as SectionId)}
                      className="hover:text-slate-200 transition-colors"
                    >
                      {s.title}
                    </button>
                  ) : (
                    <span className="text-slate-100 font-medium">{s.title}</span>
                  )}
                </span>
              )
            })}
          </nav>
          <QuestionFlow />
        </>
      )}
    </div>
  )
}
