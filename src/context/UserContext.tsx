import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'snaapmap-user'

export interface User {
  name: string
  email: string
}

interface UserContextValue {
  user: User | null
  recordUser: (name: string, email: string) => void
}

const UserContext = createContext<UserContextValue | null>(null)

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as User
    if (parsed?.name && parsed?.email) return parsed
  } catch {
    // ignore
  }
  return null
}

function saveUser(user: User) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } catch {
    // ignore
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadUser())

  const recordUser = useCallback((name: string, email: string) => {
    const trimmedName = name?.trim() ?? ''
    const trimmedEmail = email?.trim() ?? ''
    if (!trimmedName || !trimmedEmail) return
    const next: User = { name: trimmedName, email: trimmedEmail }
    setUser(next)
    saveUser(next)
    // TODO: POST to your API to record signups when you add a backend
  }, [])

  useEffect(() => {
    setUser(loadUser())
  }, [])

  const value = useMemo<UserContextValue>(
    () => ({ user, recordUser }),
    [user, recordUser]
  )

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
