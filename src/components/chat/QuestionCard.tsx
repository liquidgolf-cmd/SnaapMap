import { useState } from 'react'
import type { AuditQuestion } from '../../data/auditQuestions'
import { getSectionById } from '../../data/auditQuestions'
import { hasExamplesForField } from '../../data/exampleLibrary'
import { isAiAvailable, suggestFieldValue } from '../../lib/ai'
import { useAudit } from '../../context/AuditContext'
import { ExampleModal } from '../shared/ExampleModal'

interface QuestionCardProps {
  question: AuditQuestion
  value: string | string[] | undefined
  onChange: (value: string | string[]) => void
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  const { responses } = useAudit()
  const section = getSectionById(question.sectionId as import('../../data/auditQuestions').SectionId)
  const auditContext = section
    ? {
        sectionTitle: section.title,
        sectionDescription: section.description,
        responses,
        questionId: question.id,
      }
    : undefined
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showExampleModal, setShowExampleModal] = useState(false)
  const hasExamples = hasExamplesForField(question.id)
  const canShowExamples = hasExamples || (isAiAvailable() && !!auditContext)
  const stringValue = Array.isArray(value) ? value.join(', ') : (value ?? '')
  const arrayValue = Array.isArray(value) ? value : []
  const canPromptAi = isAiAvailable() && (question.type === 'text' || question.type === 'textarea')

  const handlePromptAi = async () => {
    if (!canPromptAi) return
    setLoading(true)
    setError(null)
    try {
      const suggested = await suggestFieldValue(
        question.question,
        stringValue,
        auditContext
      )
      if (suggested) onChange(suggested)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'AI suggestion failed')
    } finally {
      setLoading(false)
    }
  }

  switch (question.type) {
    case 'textarea':
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor={question.id}
              className="block text-sm font-medium text-slate-300 flex-1 min-w-0"
            >
              {question.question}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex gap-2 shrink-0">
              {canShowExamples && (
                <button
                  type="button"
                  onClick={() => setShowExampleModal(true)}
                  className="text-xs px-2 py-1 rounded bg-slate-600 text-slate-200 hover:bg-slate-500 transition-colors"
                >
                  See Example
                </button>
              )}
              {canPromptAi && (
                <button
                  type="button"
                  onClick={handlePromptAi}
                  disabled={loading}
                  className="text-xs px-2 py-1 rounded bg-slate-600 text-slate-200 hover:bg-slate-500 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Generating...' : 'Prompt AI'}
                </button>
              )}
            </div>
          </div>
          <textarea
            id={question.id}
            value={stringValue}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-slate-600 bg-slate-700 text-slate-100 placeholder-slate-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors resize-none"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          {showExampleModal && (
            <ExampleModal
              fieldId={question.id}
              questionLabel={question.question}
              auditContext={auditContext ?? null}
              onClose={() => setShowExampleModal(false)}
              onUse={(text) => {
                onChange(text)
                setShowExampleModal(false)
              }}
            />
          )}
        </div>
      )
    case 'select':
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor={question.id}
              className="block text-sm font-medium text-slate-300 flex-1 min-w-0"
            >
              {question.question}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {canShowExamples && (
              <button
                type="button"
                onClick={() => setShowExampleModal(true)}
                className="text-xs px-2 py-1 rounded bg-slate-600 text-slate-200 hover:bg-slate-500 transition-colors shrink-0"
              >
                See Example
              </button>
            )}
          </div>
          <select
            id={question.id}
            value={stringValue}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-600 bg-slate-700 text-slate-100 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
          >
            <option value="">Select an option...</option>
            {question.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {showExampleModal && (
            <ExampleModal
              fieldId={question.id}
              questionLabel={question.question}
              auditContext={auditContext ?? null}
              onClose={() => setShowExampleModal(false)}
              onUse={(text) => {
                onChange(text)
                setShowExampleModal(false)
              }}
            />
          )}
        </div>
      )
    case 'multiselect':
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="block text-sm font-medium text-slate-300 flex-1 min-w-0">
              {question.question}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </span>
            {canShowExamples && (
              <button
                type="button"
                onClick={() => setShowExampleModal(true)}
                className="text-xs px-2 py-1 rounded bg-slate-600 text-slate-200 hover:bg-slate-500 transition-colors shrink-0"
              >
                See Example
              </button>
            )}
          </div>
          <div className="space-y-2">
            {question.options?.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={arrayValue.includes(opt.value)}
                  onChange={(e) => {
                    const next = e.target.checked
                      ? [...arrayValue, opt.value]
                      : arrayValue.filter((v) => v !== opt.value)
                    onChange(next)
                  }}
                  className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                />
                <span className="text-sm text-slate-300">{opt.label}</span>
              </label>
            ))}
          </div>
          {showExampleModal && (
            <ExampleModal
              fieldId={question.id}
              questionLabel={question.question}
              auditContext={auditContext ?? null}
              onClose={() => setShowExampleModal(false)}
              onUse={(text) => {
                onChange(text)
                setShowExampleModal(false)
              }}
            />
          )}
        </div>
      )
    default:
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor={question.id}
              className="block text-sm font-medium text-slate-300 flex-1 min-w-0"
            >
              {question.question}
              {question.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex gap-2 shrink-0">
              {canShowExamples && (
                <button
                  type="button"
                  onClick={() => setShowExampleModal(true)}
                  className="text-xs px-2 py-1 rounded bg-slate-600 text-slate-200 hover:bg-slate-500 transition-colors"
                >
                  See Example
                </button>
              )}
              {canPromptAi && (
                <button
                  type="button"
                  onClick={handlePromptAi}
                  disabled={loading}
                  className="text-xs px-2 py-1 rounded bg-slate-600 text-slate-200 hover:bg-slate-500 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Generating...' : 'Prompt AI'}
                </button>
              )}
            </div>
          </div>
          <input
            id={question.id}
            type="text"
            value={stringValue}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder}
            className="w-full px-4 py-2 rounded-lg border border-slate-600 bg-slate-700 text-slate-100 placeholder-slate-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          {showExampleModal && (
            <ExampleModal
              fieldId={question.id}
              questionLabel={question.question}
              auditContext={auditContext ?? null}
              onClose={() => setShowExampleModal(false)}
              onUse={(text) => {
                onChange(text)
                setShowExampleModal(false)
              }}
            />
          )}
        </div>
      )
  }
}
