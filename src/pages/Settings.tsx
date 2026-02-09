import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAiAvailable } from '../lib/ai'
import { useAudit } from '../context/AuditContext'
import { useFeedback } from '../context/FeedbackContext'
import { usePreferences } from '../context/PreferencesContext'
import type { Theme } from '../context/PreferencesContext'

export function Settings() {
  const navigate = useNavigate()
  const { responses, sessionId, startNewSession, clearMindMap, setResponses } = useAudit()
  const { openFeedback } = useFeedback()
  const { preferences, setTheme, setSidebarStartsCollapsed, setConfirmDestructive } = usePreferences()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [importError, setImportError] = useState<string | null>(null)

  const handleStartNewSession = () => {
    if (preferences.confirmDestructive && !window.confirm('Start a new session? Your current audit data will be replaced. You can export it first if you want to keep a copy.')) {
      return
    }
    startNewSession()
  }

  const handleClearMindMap = () => {
    if (preferences.confirmDestructive && !window.confirm('Clear the mind map? This cannot be undone.')) {
      return
    }
    clearMindMap()
  }

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
      <div className="flex items-center justify-end">
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
          <h3 className="font-medium text-slate-300 mb-2">Preferences</h3>
          <p className="text-sm text-slate-400 mb-4">
            Appearance and behavior. Changes are saved automatically.
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="settings-theme" className="block text-sm font-medium text-slate-300 mb-1">
                Theme
              </label>
              <select
                id="settings-theme"
                value={preferences.theme}
                onChange={(e) => setTheme(e.target.value as Theme)}
                className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 text-sm"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.sidebarStartsCollapsed}
                onChange={(e) => setSidebarStartsCollapsed(e.target.checked)}
                className="rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-300">Sidebar starts collapsed</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.confirmDestructive}
                onChange={(e) => setConfirmDestructive(e.target.checked)}
                className="rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-300">Confirm before destructive actions (e.g. Clear Mind Map, Start New Session)</span>
            </label>
          </div>
        </div>

        <div className="border-t border-slate-600 pt-6">
          <h3 className="font-medium text-slate-300 mb-2">Data & Sessions</h3>
          <p className="text-sm text-slate-400 mb-4">
            Manage your audit data and sessions. Data is saved automatically as you type.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleStartNewSession}
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
              onClick={handleClearMindMap}
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
          <h3 className="font-medium text-slate-300 mb-2">Feedback</h3>
          <p className="text-sm text-slate-400 mb-3">
            Help us improve by leaving a comment or feedback.
          </p>
          <button
            type="button"
            onClick={openFeedback}
            className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-600 transition-colors text-sm"
          >
            Leave feedback
          </button>
        </div>

        <div className="border-t border-slate-600 pt-6">
          <h3 className="font-medium text-slate-300 mb-2">AI Enhancement</h3>
          <p className="text-sm text-slate-400 mb-2">When enabled, AI provides:</p>
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
