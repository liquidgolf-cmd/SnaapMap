import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { RightPanel } from './RightPanel'
import { QuestionFlow } from '../chat/QuestionFlow'
import { ProgressBar } from '../progress/ProgressBar'
import { StepIndicator } from '../progress/StepIndicator'

export function MainLayout() {
  const location = useLocation()
  const isAuditRoute = location.pathname === '/app/audit'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-slate-800 flex">
      {!sidebarCollapsed && <Sidebar />}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          showFocusToggle={isAuditRoute || sidebarCollapsed}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
        />
        <main className="flex-1 flex min-h-0">
          <div className="flex-1 overflow-auto p-6">
            <Outlet />
          </div>
          {!isAuditRoute && (
            <RightPanel title="Chat & Questions">
              <div className="space-y-6">
                <ProgressBar />
                <StepIndicator />
                <div className="border-t border-slate-600 pt-4">
                  <QuestionFlow />
                </div>
              </div>
            </RightPanel>
          )}
        </main>
      </div>
    </div>
  )
}
