import { Link, useNavigate } from 'react-router-dom'
import { useAudit } from '../context/AuditContext'
import { auditSections, type SectionId } from '../data/auditQuestions'
import { BUTTON_STYLES } from '../lib/buttonStyles'

const TESTIMONIALS = [
  {
    quote: 'This made prompt writing so much easier. Clear structure from idea to prompt.',
    author: 'Builder',
  },
  {
    quote: 'The HomeRun steps kept our team aligned. We shipped our MVP faster.',
    author: 'Product Lead',
  },
  {
    quote: 'Finally a tool that bridges the gap between vision and code. Highly recommend.',
    author: 'Developer',
  },
]

export function Home() {
  const navigate = useNavigate()
  const {
    completedSections,
    progressPercent,
    setCurrentSection,
  } = useAudit()

  const auditStepsCount = 6
  const completedCount = completedSections.size
  const nextIncompleteSection = auditSections.find(
    (s) => !completedSections.has(s.id as SectionId)
  )

  const handleStartOrContinueAudit = () => {
    if (nextIncompleteSection) {
      setCurrentSection(nextIncompleteSection.id as SectionId)
    }
    navigate('/app/audit')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Guide / How it works */}
      <section className="text-center pt-4">
        <p className="text-lg text-slate-400 mb-4">
          What to expect and how to use SnappMap
        </p>
        <p className="text-slate-300 max-w-2xl mx-auto">
          The HomeRun Method helps you define your app idea and generate prompts for
          AI coding tools like Cursor, Bolt, Lovable, or Replit.
        </p>
      </section>

      {/* Progress dashboard */}
      {(completedCount > 0 || progressPercent > 0) && (
        <section className="bg-slate-700 rounded-xl border border-slate-600 p-6">
          <h2 className="text-lg font-semibold text-slate-100 mb-3">
            Your progress
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-100">
                {progressPercent}%
              </span>
              <span className="text-slate-400 text-sm">
                ({completedCount} of {auditStepsCount} sections completed)
              </span>
            </div>
            <button
              type="button"
              onClick={handleStartOrContinueAudit}
              className={BUTTON_STYLES.primary.medium}
            >
              {nextIncompleteSection ? 'Continue audit' : 'View audit'}
            </button>
          </div>
        </section>
      )}

      {/* Quick action cards */}
      <section>
        <h2 className="text-lg font-semibold text-slate-100 mb-4">
          Quick actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={handleStartOrContinueAudit}
            className="flex flex-col items-start p-5 rounded-xl bg-slate-700 border border-slate-600 text-left hover:bg-slate-600 transition-colors"
            aria-label="Start or continue audit"
          >
            <span className="font-medium text-slate-100">
              {completedCount > 0 ? 'Continue' : 'Start'} Audit
            </span>
            <span className="text-sm text-slate-400 mt-1">
              Complete the HomeRun Method
            </span>
          </button>
          <Link
            to="/app/mindmap"
            className="flex flex-col items-start p-5 rounded-xl bg-slate-700 border border-slate-600 text-left hover:bg-slate-600 transition-colors no-underline"
            aria-label="Open Mind Map"
          >
            <span className="font-medium text-slate-100">Mind Map</span>
            <span className="text-sm text-slate-400 mt-1">
              Visualize your app idea
            </span>
          </Link>
          <Link
            to="/app/prompts"
            className="flex flex-col items-start p-5 rounded-xl bg-slate-700 border border-slate-600 text-left hover:bg-slate-600 transition-colors no-underline"
            aria-label="Export prompts"
          >
            <span className="font-medium text-slate-100">Export Prompts</span>
            <span className="text-sm text-slate-400 mt-1">
              Generate and download prompts
            </span>
          </Link>
          <Link
            to="/app/settings"
            className="flex flex-col items-start p-5 rounded-xl bg-slate-700 border border-slate-600 text-left hover:bg-slate-600 transition-colors no-underline"
            aria-label="Open settings"
          >
            <span className="font-medium text-slate-100">Settings</span>
            <span className="text-sm text-slate-400 mt-1">
              Data, sessions, and preferences
            </span>
          </Link>
        </div>
      </section>

      {/* Getting started tips */}
      <section className="bg-slate-700 rounded-xl border border-slate-600 p-6">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">
          Getting started
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
          <li>Complete the audit (Foundation through Impact).</li>
          <li>Review and edit your mind map to visualize relationships.</li>
          <li>Go to Export and generate prompts from your answers.</li>
          <li>Copy or download prompts and use them with Cursor, Bolt, Lovable, or Replit.</li>
        </ol>
        <ul className="mt-4 space-y-1 text-slate-400 text-sm list-disc list-inside">
          <li>You can return to any step later; progress is saved automatically.</li>
          <li>Use the sidebar to jump between steps or tools anytime.</li>
        </ul>
      </section>

      {/* Testimonials */}
      <section>
        <h2 className="text-lg font-semibold text-slate-100 mb-4">
          What people say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <blockquote
              key={i}
              className="p-4 rounded-xl bg-slate-700 border border-slate-600 text-slate-300 text-sm"
            >
              <p className="italic">&ldquo;{t.quote}&rdquo;</p>
              <cite className="not-italic text-slate-400 text-xs mt-2 block">
                — {t.author}
              </cite>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  )
}
