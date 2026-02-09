import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAudit } from '../../context/AuditContext'
import { useMindMapZoom } from '../../context/MindMapZoomContext'
import { STEPS } from '../../data/steps'
import { auditSections, type SectionId } from '../../data/auditQuestions'

export function Sidebar() {
  const [homeRunCollapsed, setHomeRunCollapsed] = useState(false)
  const [canvasCollapsed, setCanvasCollapsed] = useState(false)
  const [toolsCollapsed, setToolsCollapsed] = useState(false)
  const navigate = useNavigate()
  const { currentSectionId, setCurrentSection, completedSections } = useAudit()
  const { zoomIn, zoomOut, fitView, isAvailable } = useMindMapZoom()

  return (
    <aside className="w-64 h-full overflow-auto bg-slate-900 text-white flex flex-col shrink-0">
      <div className="shrink-0 border-b border-slate-700 px-4 pt-4 pb-3 space-y-1">
        <NavLink
          to="/app/audit"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          <span className="text-slate-400">⌂</span>
          <span className="font-medium">Audit</span>
        </NavLink>
        <NavLink
          to="/app/guide"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          <span className="text-slate-400">📖</span>
          <span className="font-medium">Guide</span>
        </NavLink>
      </div>
      <div className="shrink-0 border-b border-slate-700 px-4">
        <div className="flex items-center justify-between h-10 min-h-10">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            HomeRun Method
          </div>
          <button
            type="button"
            onClick={() => setHomeRunCollapsed((c) => !c)}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors shrink-0"
            title={homeRunCollapsed ? 'Expand HomeRun Method' : 'Collapse HomeRun Method'}
            aria-label={homeRunCollapsed ? 'Expand HomeRun Method' : 'Collapse HomeRun Method'}
          >
            <span className={`inline-block transition-transform ${homeRunCollapsed ? 'rotate-90' : ''}`}>▼</span>
          </button>
        </div>
        {!homeRunCollapsed && (
          <nav className="pb-3 space-y-1">
            {STEPS.filter((s) => s.num <= 6).map((step) => {
              const section = auditSections.find((a) => a.id === step.id)
              const isCurrent = currentSectionId === step.id
              const isCompleted = section ? completedSections.has(section.id as SectionId) : false
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => {
                    setCurrentSection(step.id as SectionId)
                    navigate('/app/audit')
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    isCurrent
                      ? 'bg-white/10 text-white'
                      : isCompleted
                        ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    isCurrent ? 'bg-red-500 text-white' : isCompleted ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {isCompleted && !isCurrent ? '✓' : step.num}
                  </span>
                  <div className="min-w-0">
                    <div className="font-medium truncate">{step.label}</div>
                    <div className="text-xs text-slate-500 truncate">{step.subtitle}</div>
                  </div>
                </button>
              )
            })}
            <NavLink
              to="/app/prompts"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium bg-slate-700">
                7
              </span>
              <div className="min-w-0">
                <div className="font-medium">Export</div>
                <div className="text-xs text-slate-500">Generate & download</div>
              </div>
            </NavLink>
          </nav>
        )}
      </div>
      <div className="shrink-0 border-t border-slate-700 px-4">
        <div className="flex items-center justify-between h-10 min-h-10">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Tools
          </div>
          <button
            type="button"
            onClick={() => setToolsCollapsed((c) => !c)}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors shrink-0"
            title={toolsCollapsed ? 'Expand tools' : 'Collapse tools'}
            aria-label={toolsCollapsed ? 'Expand tools' : 'Collapse tools'}
          >
            <span className={`inline-block transition-transform ${toolsCollapsed ? 'rotate-90' : ''}`}>▼</span>
          </button>
        </div>
        {!toolsCollapsed && (
          <div className="pb-3 space-y-1">
            <NavLink
              to="/app/mindmap"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <span className="text-red-500">◇</span>
              <span>Mind Map</span>
            </NavLink>
            <NavLink
              to="/app/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <span className="text-red-500">⚙</span>
              <span>Settings</span>
            </NavLink>
          </div>
        )}
      </div>
      <div className="shrink-0 border-t border-slate-700 px-4">
        <div className="flex items-center justify-between h-10 min-h-10">
          <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Canvas
          </div>
          <button
            type="button"
            onClick={() => setCanvasCollapsed((c) => !c)}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors shrink-0"
            title={canvasCollapsed ? 'Expand canvas controls' : 'Collapse canvas controls'}
            aria-label={canvasCollapsed ? 'Expand canvas controls' : 'Collapse canvas controls'}
          >
            <span className={`inline-block transition-transform ${canvasCollapsed ? 'rotate-90' : ''}`}>▼</span>
          </button>
        </div>
        {!canvasCollapsed && (
          <div className="pb-3 space-y-1">
            <button
              type="button"
              onClick={() => isAvailable && zoomIn()}
              disabled={!isAvailable}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full"
              title={isAvailable ? 'Zoom in' : 'Open Mind Map to use canvas controls'}
            >
              <span>+</span>
              <span className="text-sm">Zoom In</span>
            </button>
            <button
              type="button"
              onClick={() => isAvailable && zoomOut()}
              disabled={!isAvailable}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full"
              title={isAvailable ? 'Zoom out' : 'Open Mind Map to use canvas controls'}
            >
              <span>−</span>
              <span className="text-sm">Zoom Out</span>
            </button>
            <button
              type="button"
              onClick={() => isAvailable && fitView()}
              disabled={!isAvailable}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full"
              title={isAvailable ? 'Fit to screen' : 'Open Mind Map to use canvas controls'}
            >
              <span>⊡</span>
              <span className="text-sm">Fit to Screen</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
