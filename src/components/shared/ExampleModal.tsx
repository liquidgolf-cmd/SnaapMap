import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  exampleLibrary,
  EXAMPLE_CATEGORIES,
  hasExamplesForField,
  type ExampleCategory,
} from '../../data/exampleLibrary'
import {
  isAiAvailable,
  generateContextualExamples,
  type AuditContextForAi,
  type GeneratedExamples,
} from '../../lib/ai'

interface ExampleModalProps {
  fieldId: string
  questionLabel: string
  auditContext?: AuditContextForAi | null
  onClose: () => void
  onUse: (text: string) => void
}

export function ExampleModal({
  fieldId,
  questionLabel,
  auditContext,
  onClose,
  onUse,
}: ExampleModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<ExampleCategory>('fitness')
  const [aiExamples, setAiExamples] = useState<GeneratedExamples | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'canned' | 'ai'>('canned')

  const fieldExamples = exampleLibrary[fieldId]
  const cannedExamples = fieldExamples?.[selectedCategory]
  const examples = viewMode === 'ai' && aiExamples ? aiExamples : cannedExamples

  const canGenerateAi = isAiAvailable() && auditContext

  const handleGenerateAi = async () => {
    if (!canGenerateAi || !auditContext) return
    setAiLoading(true)
    setAiError(null)
    try {
      const generated = await generateContextualExamples(questionLabel, auditContext)
      setAiExamples(generated)
      setViewMode('ai')
    } catch (e) {
      setAiError(e instanceof Error ? e.message : 'Failed to generate examples')
    } finally {
      setAiLoading(false)
    }
  }

  if (!hasExamplesForField(fieldId) && !canGenerateAi) {
    return createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="example-modal-title"
      >
        <div
          className="bg-slate-700 border border-slate-600 rounded-xl p-6 max-w-md shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-slate-300">No examples for this field yet.</p>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 px-4 py-2 rounded-lg bg-slate-600 text-slate-200 hover:bg-slate-500"
          >
            Close
          </button>
        </div>
      </div>,
      document.body
    )
  }


  const content = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="example-modal-title"
    >
      <div
        className="bg-slate-700 border border-slate-600 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-600 shrink-0">
          <h2 id="example-modal-title" className="text-lg font-semibold text-slate-100">
            Example Answers
          </h2>
          <div className="flex items-center gap-2">
            {canGenerateAi && (
              <button
                type="button"
                onClick={handleGenerateAi}
                disabled={aiLoading}
                className="px-3 py-1.5 rounded-lg bg-red-600 text-slate-100 hover:bg-red-500 disabled:opacity-50 text-sm transition-colors"
              >
                {aiLoading ? 'Generating...' : viewMode === 'ai' ? 'Regenerate' : 'Generate with AI'}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:bg-slate-600 hover:text-slate-200 transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
        {hasExamplesForField(fieldId) && (
          <div className="flex flex-wrap gap-2 p-4 border-b border-slate-600 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('canned')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                viewMode === 'canned'
                  ? 'bg-slate-600 text-slate-100'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-600 hover:text-slate-200'
              }`}
            >
              Canned
            </button>
            {viewMode === 'ai' && (
              <span className="px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 text-sm">
                AI Generated
              </span>
            )}
            {EXAMPLE_CATEGORIES.map((cat) => (
              <button
              key={cat}
              type="button"
              onClick={() => { setSelectedCategory(cat); setViewMode('canned') }}
              className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${
                viewMode === 'canned' && selectedCategory === cat
                  ? 'bg-slate-600 text-slate-100'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-600 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
          </div>
        )}
        {!hasExamplesForField(fieldId) && canGenerateAi && (
          <div className="flex flex-wrap gap-2 p-4 border-b border-slate-600 shrink-0">
            <span className="px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 text-sm">
              {viewMode === 'ai' ? 'AI Generated' : 'Generate contextual examples'}
            </span>
          </div>
        )}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {aiError && (
            <p className="text-sm text-red-500">{aiError}</p>
          )}
          {examples ? (
          <>
          <div className="rounded-lg border border-red-900/50 bg-red-950/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-400">Poor</span>
            </div>
            <blockquote className="text-sm text-slate-300 mb-2 italic">
              &ldquo;{examples.poor.text}&rdquo;
            </blockquote>
            <p className="text-xs text-slate-500">Why this fails: {examples.poor.why}</p>
          </div>
          <div className="rounded-lg border border-amber-900/50 bg-amber-950/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-400">Good</span>
            </div>
            <blockquote className="text-sm text-slate-300 mb-2 italic">
              &ldquo;{examples.good.text}&rdquo;
            </blockquote>
            <p className="text-xs text-slate-500">Better because: {examples.good.why}</p>
          </div>
          <div className="rounded-lg border border-green-900/50 bg-green-950/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-400">Excellent</span>
            </div>
            <blockquote className="text-sm text-slate-300 mb-2 italic">
              &ldquo;{examples.excellent.text}&rdquo;
            </blockquote>
            <p className="text-xs text-slate-500 mb-4">
              This is great because: {examples.excellent.why}
            </p>
            <button
              type="button"
              onClick={() => onUse(examples.excellent.text)}
              className="px-3 py-1.5 rounded-lg bg-slate-600 text-slate-200 hover:bg-slate-500 text-sm transition-colors"
            >
              Use This Example
            </button>
          </div>
          </>
          ) : canGenerateAi ? (
            <div className="py-8 text-center text-slate-400">
              <p className="mb-4">Get AI-generated examples tailored to your app based on what you&apos;ve already answered.</p>
              <button
                type="button"
                onClick={handleGenerateAi}
                disabled={aiLoading}
                className="px-4 py-2 rounded-lg bg-red-600 text-slate-100 hover:bg-red-500 disabled:opacity-50 transition-colors"
              >
                {aiLoading ? 'Generating...' : 'Generate with AI'}
              </button>
            </div>
          ) : (
            <p className="text-slate-400">No examples available for this field.</p>
          )}
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
