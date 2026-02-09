import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export function Splash() {
  const navigate = useNavigate()
  const { recordUser } = useUser()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    if (!trimmedName || !trimmedEmail) return
    recordUser(trimmedName, trimmedEmail)
    navigate('/app/audit')
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
      </header>

      {/* Signup form */}
      <section className="max-w-md mx-auto px-6 py-8">
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
          </form>
        </div>
      </section>

      {/* Features */}
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
        </div>
      </section>
    </div>
  )
}
