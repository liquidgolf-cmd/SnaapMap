import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { auditSections, type SectionId } from '../data/auditQuestions'

const STORAGE_KEY = 'snaapmap-audit-responses'
const SESSION_KEY = 'snaapmap-session-id'

export type AuditResponses = Record<string, string | string[]>

export const MINDMAP_STORAGE_KEY = 'snaapmap-mindmap'

interface AuditContextValue {
  responses: AuditResponses
  currentSectionId: SectionId | null
  setCurrentSection: (id: SectionId | null) => void
  setResponse: (questionId: string, value: string | string[]) => void
  setResponses: (responses: AuditResponses) => void
  completedSections: Set<SectionId>
  progressPercent: number
  sessionId: string
  startNewSession: () => void
  mindMapVersion: number
  clearMindMap: () => void
}

function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function loadSessionId(): string {
  try {
    const stored = localStorage.getItem(SESSION_KEY)
    if (stored) return stored
  } catch {
    // ignore
  }
  const id = generateSessionId()
  localStorage.setItem(SESSION_KEY, id)
  return id
}

function loadResponses(sessionId: string): AuditResponses {
  try {
    const key = `${STORAGE_KEY}-${sessionId}`
    const stored = localStorage.getItem(key)
    if (stored) {
      const parsed = JSON.parse(stored) as AuditResponses
      return parsed || {}
    }
  } catch {
    // ignore
  }
  return {}
}

function saveResponses(sessionId: string, responses: AuditResponses): void {
  try {
    const key = `${STORAGE_KEY}-${sessionId}`
    localStorage.setItem(key, JSON.stringify(responses))
  } catch {
    // ignore
  }
}

function isSectionComplete(sectionId: SectionId, responses: AuditResponses): boolean {
  const section = auditSections.find((s) => s.id === sectionId)
  if (!section) return false
  const required = section.questions.filter((q) => q.required)
  return required.every((q) => {
    const val = responses[q.id]
    if (Array.isArray(val)) return val.length > 0
    return typeof val === 'string' && val.trim().length > 0
  })
}

const AuditContext = createContext<AuditContextValue | null>(null)

export function AuditProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState(loadSessionId)
  const [responses, setResponsesState] = useState<AuditResponses>(() =>
    loadResponses(loadSessionId())
  )
  const [currentSectionId, setCurrentSectionId] = useState<SectionId | null>(
    auditSections[0]?.id ?? null
  )
  const [mindMapVersion, setMindMapVersion] = useState(0)

  useEffect(() => {
    saveResponses(sessionId, responses)
  }, [sessionId, responses])

  const startNewSession = useCallback(() => {
    const newId = generateSessionId()
    try {
      localStorage.setItem(SESSION_KEY, newId)
    } catch {
      // ignore
    }
    setSessionId(newId)
    setResponsesState({})
    setCurrentSectionId(auditSections[0]?.id ?? null)
    try {
      localStorage.removeItem(MINDMAP_STORAGE_KEY)
    } catch {
      // ignore
    }
    setMindMapVersion((v) => v + 1)
  }, [])

  const clearMindMap = useCallback(() => {
    try {
      localStorage.removeItem(MINDMAP_STORAGE_KEY)
    } catch {
      // ignore
    }
    setMindMapVersion((v) => v + 1)
  }, [])

  const setResponses = useCallback((next: AuditResponses) => {
    setResponsesState(next)
  }, [])

  const setResponse = useCallback((questionId: string, value: string | string[]) => {
    setResponsesState((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }, [])

  const completedSections = useMemo(() => {
    const set = new Set<SectionId>()
    for (const s of auditSections) {
      if (isSectionComplete(s.id, responses)) set.add(s.id)
    }
    return set
  }, [responses])

  const totalRequired = useMemo(
    () => auditSections.reduce((n, s) => n + s.questions.filter((q) => q.required).length, 0),
    []
  )
  const answeredRequired = useMemo(() => {
    let n = 0
    for (const s of auditSections) {
      for (const q of s.questions) {
        if (!q.required) continue
        const val = responses[q.id]
        if (Array.isArray(val) ? val.length > 0 : typeof val === 'string' && val.trim().length > 0) {
          n += 1
        }
      }
    }
    return n
  }, [responses])

  const progressPercent = totalRequired > 0 ? Math.round((answeredRequired / totalRequired) * 100) : 0

  const value: AuditContextValue = useMemo(
    () => ({
      responses,
      currentSectionId,
      setCurrentSection: setCurrentSectionId,
      setResponse,
      setResponses,
      completedSections,
      progressPercent,
      sessionId,
      startNewSession,
      mindMapVersion,
      clearMindMap,
    }),
    [
      responses,
      currentSectionId,
      setResponse,
      setResponses,
      completedSections,
      progressPercent,
      sessionId,
      startNewSession,
      mindMapVersion,
      clearMindMap,
    ]
  )

  return <AuditContext.Provider value={value}>{children}</AuditContext.Provider>
}

export function useAudit() {
  const ctx = useContext(AuditContext)
  if (!ctx) throw new Error('useAudit must be used within AuditProvider')
  return ctx
}
