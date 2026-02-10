import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Splash() {
  const { firebaseUser, authLoading } = useAuth()

  if (!authLoading && firebaseUser) {
    return <Navigate to="/app/guide" replace />
  }

  return (
    <div className="app-layout min-h-screen bg-slate-800 text-slate-100">
      {/* Hero */}
      <header className="text-center pt-16 pb-12 px-6">
        {/* Logo at 200% of header size (header uses h-8, so 200% = 4rem) */}
        <img
          src="/SnappMapLogo_dark.png"
          alt="SnaapMap"
          className="h-16 w-auto mx-auto mb-6"
        />
        <h1 className="text-4xl font-bold text-slate-100 mb-3">
          Welcome to SnaapMap
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Your Vibe Coder Prompt Tool
        </p>
        <p className="text-slate-300 mt-4 max-w-xl mx-auto">
          Stop wasting weeks building the wrong features with AI. Get a complete product blueprint in 30 minutes, so every line of AI-generated code actually fits together.
        </p>
        <Link
          to="/signin"
          className="inline-block mt-6 px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
        >
          Get started
        </Link>
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
      <section className="max-w-2xl mx-auto px-6 py-10 pb-20">
        <h2 className="text-lg font-semibold text-slate-100 mb-4 text-center">
          Pricing
        </h2>
        <div className="bg-slate-700 rounded-xl border border-slate-600 p-6 text-center">
          <p className="text-slate-200 font-medium">Free during beta</p>
          <p className="text-slate-400 text-sm mt-1">
            Use SnaapMap at no cost while we’re in beta. No credit card required.
          </p>
          <p className="text-slate-400 text-sm mt-3">
            Thanks for using SnaapMap. When you're done, we'd love to hear from you—please leave a comment or feedback.
          </p>
        </div>
      </section>
    </div>
  )
}
