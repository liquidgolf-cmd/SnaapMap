import { useState } from 'react'
import { useAudit } from '../../context/AuditContext'
import { promptTemplates } from '../../data/promptTemplates'
import { fillTemplate } from '../../lib/templateEngine'
import { isAiAvailable, enhanceWithAi } from '../../lib/ai'

export function GeneratedPrompts() {
  const { responses } = useAudit()
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [enhancedPrompts, setEnhancedPrompts] = useState<Record<string, string>>({})
  const [enhancingId, setEnhancingId] = useState<string | null>(null)
  const [enhanceError, setEnhanceError] = useState<string | null>(null)
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set())

  const toggleCollapsed = (id: string) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // fallback: ignored
    }
  }

  const handleCopyAll = async () => {
    const allText = promptTemplates
      .map((t) => {
        const text = enhancedPrompts[t.id] ?? fillTemplate(t.template, responses)
        return `## ${t.title}\n\n${text}\n\n`
      })
      .join('---\n\n')
    try {
      await navigator.clipboard.writeText(allText)
      setCopiedId('all')
      setTimeout(() => setCopiedId(null), 2000)
    } catch {
      // fallback: ignored
    }
  }

  const handleEnhance = async (templateId: string) => {
    if (!isAiAvailable()) {
      setEnhanceError('Add VITE_ANTHROPIC_API_KEY to your .env to use AI enhancement.')
      return
    }
    const template = promptTemplates.find((t) => t.id === templateId)
    if (!template) return
    const filled = fillTemplate(template.template, responses)
    if (!filled.trim()) return
    setEnhancingId(templateId)
    setEnhanceError(null)
    try {
      const context = [
        responses.app_name && `App: ${responses.app_name}`,
        responses.app_description && `Description: ${responses.app_description}`,
      ]
        .filter(Boolean)
        .join('\n')
      const enhanced = await enhanceWithAi(filled, context)
      setEnhancedPrompts((prev) => ({ ...prev, [templateId]: enhanced }))
    } catch (e) {
      setEnhanceError(e instanceof Error ? e.message : 'Enhancement failed')
    } finally {
      setEnhancingId(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={handleCopyAll}
          className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition-colors"
        >
          {copiedId === 'all' ? 'Copied!' : 'Copy All'}
        </button>
      </div>
      <p className="text-sm text-slate-400">
        Use these prompts with your vibe coder to build your MVP. Complete the
        audit for more detailed prompts.
      </p>
      {!isAiAvailable() && (
        <p className="text-xs text-amber-400">
          Add VITE_ANTHROPIC_API_KEY to your .env file to enable AI enhancement.
        </p>
      )}
      {enhanceError && (
        <p className="text-sm text-red-500">{enhanceError}</p>
      )}
      <div className="space-y-4">
        {promptTemplates.map((template) => {
          const filled = fillTemplate(template.template, responses)
          const displayText = enhancedPrompts[template.id] ?? filled
          const isEmpty = !displayText.trim()
          const isEnhancing = enhancingId === template.id
          const isCollapsed = collapsedIds.has(template.id)
          return (
            <div
              key={template.id}
              className="bg-slate-700 rounded-xl shadow-sm border border-slate-600 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleCollapsed(template.id)}
                className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-slate-600 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-100">
                    {template.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {template.description}
                  </p>
                </div>
                <span
                  className={`shrink-0 text-slate-400 transition-transform ${
                    isCollapsed ? '' : 'rotate-180'
                  }`}
                >
                  ▼
                </span>
              </button>
              {!isCollapsed && (
                <div className="px-4 pb-4 pt-0 border-t border-slate-600">
                  <pre className="bg-slate-800 rounded-lg p-4 text-sm text-slate-300 whitespace-pre-wrap font-sans overflow-x-auto max-h-64 overflow-y-auto mt-4">
                    {isEmpty ? 'Complete the audit to populate this prompt.' : displayText}
                  </pre>
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(template.id, displayText)}
                      disabled={isEmpty}
                      className="px-3 py-1.5 rounded-lg border border-slate-600 text-sm text-slate-300 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {copiedId === template.id ? 'Copied!' : 'Copy'}
                    </button>
                    {isAiAvailable() && !isEmpty && (
                      <button
                        type="button"
                        onClick={() => handleEnhance(template.id)}
                        disabled={isEnhancing}
                        className="px-3 py-1.5 rounded-lg bg-slate-600 text-slate-200 text-sm hover:bg-slate-500 disabled:opacity-50 transition-colors"
                      >
                        {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
