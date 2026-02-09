import { useState } from 'react'

interface RightPanelProps {
  children: React.ReactNode
  title?: string
}

export function RightPanel({ children, title }: RightPanelProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`bg-slate-800 border-l border-slate-600 flex flex-col shrink-0 transition-all ${
        collapsed ? 'w-12' : 'w-96'
      }`}
    >
      {!collapsed && (
        <div className="p-4 border-b border-slate-600 flex items-center justify-between shrink-0">
          {title && <h2 className="text-sm font-semibold text-slate-100">{title}</h2>}
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-colors"
            title="Collapse panel"
            aria-label="Collapse panel"
          >
            →
          </button>
        </div>
      )}
      {collapsed ? (
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="p-2 m-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-slate-200 transition-colors self-start"
          title="Expand panel"
          aria-label="Expand panel"
        >
          ←
        </button>
      ) : (
        <div className="flex-1 overflow-auto p-4">{children}</div>
      )}
    </aside>
  )
}
