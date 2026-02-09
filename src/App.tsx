import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuditProvider } from './context/AuditContext'
import { UserProvider } from './context/UserContext'
import { MindMapZoomProvider } from './context/MindMapZoomContext'
import { MainLayout } from './components/layout/MainLayout'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'
import { MindMap } from './pages/MindMap'
import { Prompts } from './pages/Prompts'
import { Settings } from './pages/Settings'
import { Splash } from './pages/Splash'

function App() {
  return (
    <UserProvider>
      <AuditProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="app" element={<MindMapZoomProvider><MainLayout /></MindMapZoomProvider>}>
              <Route index element={<Navigate to="/app/audit" replace />} />
              <Route path="audit" element={<Dashboard />} />
              <Route path="guide" element={<Home />} />
              <Route path="mindmap" element={<MindMap />} />
              <Route path="prompts" element={<Prompts />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuditProvider>
    </UserProvider>
  )
}

export default App
