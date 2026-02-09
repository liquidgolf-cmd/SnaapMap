import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useUser } from '../context/UserContext'

export function SignIn() {
  const navigate = useNavigate()
  const { recordUser } = useUser()
  const { firebaseUser, authLoading, signInWithGoogle } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [googleLoading, setGoogleLoading] = useState(false)

  if (!authLoading && firebaseUser) {
    return <Navigate to="/app/audit" replace />
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    if (!trimmedName || !trimmedEmail) return
    recordUser(trimmedName, trimmedEmail)
    navigate('/app/audit')
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    try {
      await signInWithGoogle()
      navigate('/app/audit')
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="app-layout min-h-screen bg-slate-800 text-slate-100 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-slate-100 mb-2 text-center">
          Get started
        </h1>
        <p className="text-slate-400 text-center mb-6">
          Sign up or sign in to use SnaapMap
        </p>
        <div className="bg-slate-700 rounded-xl border border-slate-600 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="signin-name" className="block text-sm font-medium text-slate-300 mb-1">
                Name
              </label>
              <input
                id="signin-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="signin-email" className="block text-sm font-medium text-slate-300 mb-1">
                Email
              </label>
              <input
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
            >
              Get started
            </button>
            <div className="relative my-4">
              <span className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-600" />
              </span>
              <span className="relative flex justify-center text-sm text-slate-400">or</span>
            </div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full px-4 py-3 rounded-lg border border-slate-600 text-slate-200 font-medium hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
            >
              {googleLoading ? (
                'Signing in…'
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Sign in with Google
                </>
              )}
            </button>
          </form>
        </div>
        <p className="text-center mt-6">
          <Link to="/" className="text-slate-400 hover:text-slate-200 text-sm">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}
