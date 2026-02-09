import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'snaapmap-preferences'

export type Theme = 'dark' | 'light'

export interface Preferences {
  theme: Theme
  sidebarStartsCollapsed: boolean
  confirmDestructive: boolean
}

const defaultPreferences: Preferences = {
  theme: 'dark',
  sidebarStartsCollapsed: false,
  confirmDestructive: true,
}

function loadPreferences(): Preferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultPreferences
    const parsed = JSON.parse(raw) as Partial<Preferences>
    return {
      theme: parsed.theme === 'light' ? 'light' : defaultPreferences.theme,
      sidebarStartsCollapsed:
        typeof parsed.sidebarStartsCollapsed === 'boolean'
          ? parsed.sidebarStartsCollapsed
          : defaultPreferences.sidebarStartsCollapsed,
      confirmDestructive:
        typeof parsed.confirmDestructive === 'boolean'
          ? parsed.confirmDestructive
          : defaultPreferences.confirmDestructive,
    }
  } catch {
    return defaultPreferences
  }
}

function savePreferences(prefs: Preferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch {
    // ignore
  }
}

interface PreferencesContextValue {
  preferences: Preferences
  setTheme: (theme: Theme) => void
  setSidebarStartsCollapsed: (value: boolean) => void
  setConfirmDestructive: (value: boolean) => void
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null)

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferencesState] = useState<Preferences>(() => {
    const p = loadPreferences()
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', p.theme)
    }
    return p
  })

  useEffect(() => {
    savePreferences(preferences)
  }, [preferences])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', preferences.theme)
  }, [preferences.theme])

  const setTheme = useCallback((theme: Theme) => {
    setPreferencesState((p) => ({ ...p, theme }))
  }, [])

  const setSidebarStartsCollapsed = useCallback((value: boolean) => {
    setPreferencesState((p) => ({ ...p, sidebarStartsCollapsed: value }))
  }, [])

  const setConfirmDestructive = useCallback((value: boolean) => {
    setPreferencesState((p) => ({ ...p, confirmDestructive: value }))
  }, [])

  const value = useMemo<PreferencesContextValue>(
    () => ({
      preferences,
      setTheme,
      setSidebarStartsCollapsed,
      setConfirmDestructive,
    }),
    [preferences, setTheme, setSidebarStartsCollapsed, setConfirmDestructive]
  )

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext)
  if (!ctx) throw new Error('usePreferences must be used within PreferencesProvider')
  return ctx
}
