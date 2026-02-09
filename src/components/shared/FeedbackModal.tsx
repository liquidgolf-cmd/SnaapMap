import { useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useAuth } from '../../context/AuthContext'
import { useUser } from '../../context/UserContext'
import { useFeedback } from '../../context/FeedbackContext'

export function FeedbackModal() {
  const { isOpen, closeFeedback } = useFeedback()
  const { user } = useUser()
  const { firebaseUser } = useAuth()
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    setSubmitting(true)
    setError(null)
    try {
      if (db) {
        await addDoc(collection(db, 'feedback'), {
          text: trimmed,
          userEmail: user?.email ?? null,
          userId: firebaseUser?.uid ?? null,
          createdAt: new Date().toISOString(),
        })
      }
      setSent(true)
      setText('')
      setTimeout(() => {
        setSent(false)
        closeFeedback()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send feedback')
    } finally {
      setSubmitting(false)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeFeedback()
  }

  const content = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
    >
      <div
        className="bg-slate-700 rounded-xl border border-slate-600 shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="feedback-title" className="text-lg font-semibold text-slate-100 mb-2">
          Leave feedback
        </h2>
        <p className="text-sm text-slate-400 mb-4">
          Your feedback helps us improve SnaapMap. Thanks for taking the time.
        </p>
        {sent ? (
          <p className="text-green-400 text-sm">Thanks! Your feedback has been sent.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="feedback-text" className="block text-sm font-medium text-slate-300 mb-1">
                Comment or feedback
              </label>
              <textarea
                id="feedback-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                rows={4}
                placeholder="Tell us what you think..."
                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
              />
            </div>
            {user?.email && (
              <p className="text-xs text-slate-500">
                Submitting as: {user.email}
              </p>
            )}
            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={closeFeedback}
                className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-600 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting || !text.trim()}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 transition-colors text-sm"
              >
                {submitting ? 'Sending…' : 'Send feedback'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
