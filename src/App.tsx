import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuditProvider } from './context/AuditContext'
import { MindMapZoomProvider } from './context/MindMapZoomContext'
import { MainLayout } from './components/layout/MainLayout'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'
import { MindMap } from './pages/MindMap'
import { Prompts } from './pages/Prompts'
import { Settings } from './pages/Settings'

function App() {
  return (
    <AuditProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MindMapZoomProvider><MainLayout /></MindMapZoomProvider>}>
            <Route index element={<Dashboard />} />
            <Route path="home" element={<Home />} />
            <Route path="mindmap" element={<MindMap />} />
            <Route path="prompts" element={<Prompts />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuditProvider>
  )
}

export default App
