import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useUser } from '../context/UserContext'

export function Splash() {
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
    <div className="app-layout min-h-screen bg-slate-800 text-slate-100">
      {/* Hero */}
      <header className="text-center pt-16 pb-12 px-6">
        <h1 className="text-4xl font-bold text-slate-100 mb-3">
          Welcome to SnaapMap
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Your Vibe Coder Prompt Tool
        </p>
        <p className="text-slate-300 mt-4 max-w-xl mx-auto">
          Define your app idea and generate prompts for AI coding tools like Cursor, Bolt, Lovable, or Replit.
        </p>
        <a
          href="#get-started"
          className="inline-block mt-6 px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
        >
          Get started
        </a>
      </header>

      {/* What you get */}
      <section className="max-w-3xl mx-auto px-6 py-10">
        <h2 className="text-lg font-semibold text-slate-100 mb-4 text-center">
          What you get
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 shrink-0">✓</span>
            <span>HomeRun Method audit to define your app</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 shrink-0">✓</span>
            <span>Mind map to visualize your idea</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 shrink-0">✓</span>
            <span>Export prompts ready for your vibe coder</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 shrink-0">✓</span>
            <span>Progress saved automatically</span>
          </li>
        </ul>
      </section>

      {/* Pricing */}
      <section className="max-w-2xl mx-auto px-6 py-10">
        <h2 className="text-lg font-semibold text-slate-100 mb-4 text-center">
          Pricing
        </h2>
        <div className="bg-slate-700 rounded-xl border border-slate-600 p-6 text-center">
          <p className="text-slate-200 font-medium">Free during beta</p>
          <p className="text-slate-400 text-sm mt-1">
            Use SnaapMap at no cost while we’re in beta. No credit card required.
          </p>
        </div>
      </section>

      {/* Get started (signup form) */}
      <section id="get-started" className="max-w-md mx-auto px-6 py-8 pb-20 scroll-mt-8">
        <div className="bg-slate-700 rounded-xl border border-slate-600 p-6">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">
            Get started
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="splash-name" className="block text-sm font-medium text-slate-300 mb-1">
                Name
              </label>
              <input
                id="splash-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="splash-email" className="block text-sm font-medium text-slate-300 mb-1">
                Email
              </label>
              <input
                id="splash-email"
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
      </section>
    </div>
  )
}
