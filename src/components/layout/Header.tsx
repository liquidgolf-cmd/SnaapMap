import { Link, useLocation } from 'react-router-dom'
import { useAudit } from '../../context/AuditContext'
import { getSectionById } from '../../data/auditQuestions'

const routeTitles: Record<string, string> = {
  '/app/audit': 'Audit',
  '/app/guide': 'Guide',
  '/app/mindmap': 'Mind Map',
  '/app/prompts': 'Export',
  '/app/settings': 'Settings',
}

interface HeaderProps {
  showFocusToggle?: boolean
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export function Header({
  showFocusToggle = false,
  sidebarCollapsed = false,
  onToggleSidebar,
}: HeaderProps) {
  const location = useLocation()
  const { currentSectionId } = useAudit()
  const section = currentSectionId ? getSectionById(currentSectionId) : null
  const baseTitle = routeTitles[location.pathname] ?? 'SnaapMap'
  const title =
    location.pathname === '/app/audit' && section
      ? `Step ${section.stepNum}: ${section.title}`
      : baseTitle

  return (
    <header className="w-full bg-slate-800 border-b border-slate-600 flex items-center justify-between px-6 shrink-0 min-h-16 py-2">
      <div className="flex items-center gap-4 min-w-0">
        <Link
          to="/"
          className="shrink-0 flex flex-col items-center gap-0.5"
          aria-label="SnaapMap home"
        >
          <img src="/snappmaplogo.png" alt="SnaapMap" className="h-8 w-auto" />
          <span className="text-xs text-slate-400">Vibe Coder Prompt Tool</span>
        </Link>
        {showFocusToggle && onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-colors shrink-0"
            title={sidebarCollapsed ? 'Show sidebar' : 'Focus mode'}
            aria-label={sidebarCollapsed ? 'Show sidebar' : 'Focus mode'}
          >
            {sidebarCollapsed ? (
              <span className="text-lg">☰</span>
            ) : (
              <span className="text-sm">Focus</span>
            )}
          </button>
        )}
        <h1 className="text-xl font-semibold text-slate-100 truncate">{title}</h1>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <button
          type="button"
          className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
        >
          Need Support
        </button>
        <div className="w-9 h-9 rounded-full bg-slate-600 flex items-center justify-center text-slate-300 text-sm font-medium">
          U
        </div>
      </div>
    </header>
  )
}
