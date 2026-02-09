import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from './AuthContext'

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
  const { firebaseUser } = useAuth()
  const [localUser, setLocalUser] = useState<User | null>(() => loadUser())

  const user = useMemo<User | null>(() => {
    if (firebaseUser) {
      return {
        name: firebaseUser.displayName ?? '',
        email: firebaseUser.email ?? '',
      }
    }
    return localUser
  }, [firebaseUser, localUser])

  const recordUser = useCallback((name: string, email: string) => {
    const trimmedName = name?.trim() ?? ''
    const trimmedEmail = email?.trim() ?? ''
    if (!trimmedName || !trimmedEmail) return
    const next: User = { name: trimmedName, email: trimmedEmail }
    setLocalUser(next)
    saveUser(next)
    addDoc(collection(db, 'signups'), {
      name: trimmedName,
      email: trimmedEmail,
      createdAt: new Date().toISOString(),
    }).catch(() => {})
  }, [])

  useEffect(() => {
    if (!firebaseUser) setLocalUser(loadUser())
  }, [firebaseUser])

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
