import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'

interface AuthContextValue {
  firebaseUser: FirebaseUser | null
  authLoading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null)
  const [authLoading, setAuthLoading] = useState(!!auth)

  useEffect(() => {
    if (!auth) {
      setAuthLoading(false)
      return
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user)
      setAuthLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const signInWithGoogle = useCallback(async () => {
    if (!auth || !db) return
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const { uid, displayName, email } = result.user
    const name = displayName ?? ''
    const emailStr = email ?? ''
    if (uid && (name || emailStr)) {
      await setDoc(
        doc(db, 'users', uid),
        { name, email: emailStr, updatedAt: new Date().toISOString() },
        { merge: true }
      )
    }
  }, [])

  const signOut = useCallback(async () => {
    if (auth) await firebaseSignOut(auth)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ firebaseUser, authLoading, signInWithGoogle, signOut }),
    [firebaseUser, authLoading, signInWithGoogle, signOut]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
