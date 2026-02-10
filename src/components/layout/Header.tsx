import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useFeedback } from '../../context/FeedbackContext'
import { usePreferences } from '../../context/PreferencesContext'
import { useUser } from '../../context/UserContext'

interface HeaderProps {
  showFocusToggle?: boolean
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

function getInitial(user: { name: string; email: string } | null): string {
  if (!user) return 'U'
  const name = user.name?.trim()
  if (name) return name[0].toUpperCase()
  const email = user.email?.trim()
  if (email) return email[0].toUpperCase()
  return 'U'
}

export function Header({
  showFocusToggle = false,
  sidebarCollapsed = false,
  onToggleSidebar,
}: HeaderProps) {
  const navigate = useNavigate()
  const { user } = useUser()
  const { signOut } = useAuth()
  const { openFeedback } = useFeedback()
  const { preferences } = usePreferences()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const logoSrc = preferences.theme === 'light' ? '/SnappMapLogo_light.png' : '/SnappMapLogo_dark.png'

  useEffect(() => {
    if (!menuOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  const handleSignOut = async () => {
    setMenuOpen(false)
    await signOut()
    navigate('/', { replace: true })
  }

  return (
    <header className="w-full bg-slate-800 border-b border-slate-600 flex items-center justify-between px-6 shrink-0 min-h-16 py-2">
      <div className="flex items-center gap-4 min-w-0">
        <Link
          to="/"
          className="shrink-0 flex flex-col items-center gap-0.5"
          aria-label="SnappMap home"
        >
          <img src={logoSrc} alt="SnappMap" className="h-8 w-auto" />
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
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <button
          type="button"
          onClick={openFeedback}
          className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
        >
          Leave feedback
        </button>
        <button
          type="button"
          className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
        >
          Need Support
        </button>
        <div className="relative shrink-0" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="w-9 h-9 rounded-full bg-slate-600 flex items-center justify-center text-slate-300 text-sm font-medium hover:bg-slate-500 transition-colors"
            aria-label="Account menu"
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            {getInitial(user)}
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 py-1 min-w-[10rem] rounded-lg bg-slate-700 border border-slate-600 shadow-lg z-50">
              <Link
                to="/app/settings"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-600 transition-colors"
              >
                Settings
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-600 transition-colors"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
