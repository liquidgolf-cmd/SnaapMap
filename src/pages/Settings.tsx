import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAiAvailable } from '../lib/ai'
import { useAudit } from '../context/AuditContext'

export function Settings() {
  const navigate = useNavigate()
  const { responses, sessionId, startNewSession, clearMindMap, setResponses } = useAudit()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [importError, setImportError] = useState<string | null>(null)

  const handleExport = () => {
    const data = JSON.stringify({ sessionId, responses, exportedAt: new Date().toISOString() }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `snaapmap-audit-${sessionId}-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImportClick = () => {
    setImportError(null)
    fileInputRef.current?.click()
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setImportError(null)
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string)
        const data = parsed.responses ?? parsed
        if (typeof data !== 'object' || Array.isArray(data)) {
          throw new Error('Invalid format: expected an object with responses')
        }
        setResponses(data as Record<string, string | string[]>)
      } catch (err) {
        setImportError(err instanceof Error ? err.message : 'Failed to import file')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100">Settings</h2>
        <button
          type="button"
          onClick={() => navigate('/app/audit')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-slate-200 transition-colors text-sm"
          title="Back to Audit"
        >
          <span>←</span>
          Back to Audit
        </button>
      </div>

      <div className="bg-slate-700 rounded-xl shadow-sm border border-slate-600 p-6 space-y-6">
        <div>
          <h3 className="font-medium text-slate-300 mb-2">Data & Sessions</h3>
          <p className="text-sm text-slate-400 mb-4">
            Manage your audit data and sessions. Data is saved automatically as you type.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={startNewSession}
              className="px-4 py-2 rounded-lg bg-slate-600 text-slate-200 hover:bg-slate-500 transition-colors text-sm"
            >
              Start New Session
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-600 transition-colors text-sm"
            >
              Export Audit Data
            </button>
            <button
              type="button"
              onClick={handleImportClick}
              className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-600 transition-colors text-sm"
            >
              Import Audit Data
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <button
              type="button"
              onClick={clearMindMap}
              className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-600 transition-colors text-sm"
            >
              Clear Mind Map
            </button>
          </div>
          {importError && (
            <p className="mt-2 text-sm text-red-500">{importError}</p>
          )}
          <p className="mt-3 text-xs text-slate-500">
            Current session: <code className="bg-slate-800 px-1 rounded text-slate-400">{sessionId}</code>
          </p>
        </div>

        <div className="border-t border-slate-600 pt-6">
          <h3 className="font-medium text-slate-300 mb-2">AI Enhancement</h3>
          <p className="text-sm text-slate-400 mb-2">
            Add <code className="bg-slate-800 px-1 rounded text-slate-300">VITE_ANTHROPIC_API_KEY</code> to
            your <code className="bg-slate-800 px-1 rounded text-slate-300">.env</code> file to enable:
          </p>
          <ul className="text-sm text-slate-400 list-disc list-inside space-y-1">
            <li>Prompt AI buttons in audit questions</li>
            <li>Enhance with AI for generated prompts</li>
            <li>Generate with AI for contextual examples</li>
          </ul>
          <p className="mt-2 text-sm text-slate-400">
            Status: {isAiAvailable() ? (
              <span className="text-green-400">AI enabled</span>
            ) : (
              <span className="text-amber-400">AI not configured</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
