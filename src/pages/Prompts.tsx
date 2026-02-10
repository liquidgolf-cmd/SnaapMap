import { useEffect, useState } from 'react'
import { GeneratedPrompts } from '../components/prompts/GeneratedPrompts'
import { useFeedback } from '../context/FeedbackContext'

const FEEDBACK_REMINDER_KEY = 'snaapmap-feedback-reminder-shown'

export function Prompts() {
  const { openFeedback } = useFeedback()
  const [showReminder, setShowReminder] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(FEEDBACK_REMINDER_KEY)) setShowReminder(true)
    } catch {
      setShowReminder(false)
    }
  }, [])

  const handleLeaveFeedback = () => {
    try {
      localStorage.setItem(FEEDBACK_REMINDER_KEY, '1')
    } catch {
      // ignore
    }
    setShowReminder(false)
    openFeedback()
  }

  const handleRemindLater = () => {
    try {
      localStorage.setItem(FEEDBACK_REMINDER_KEY, '1')
    } catch {
      // ignore
    }
    setShowReminder(false)
  }

  return (
    <div className="space-y-6">
      {showReminder && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-700 border border-slate-600">
          <p className="text-slate-200 text-sm">
            Thanks for using SnaapMap. We'd love to hear what you think—leave feedback when you're done.
          </p>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={handleRemindLater}
              className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-600 transition-colors text-sm"
            >
              Remind later
            </button>
            <button
              type="button"
              onClick={handleLeaveFeedback}
              className="px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors text-sm"
            >
              Leave feedback
            </button>
          </div>
        </div>
      )}
      <GeneratedPrompts />
    </div>
  )
}
