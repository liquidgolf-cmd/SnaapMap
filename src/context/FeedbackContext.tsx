import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

interface FeedbackContextValue {
  isOpen: boolean
  openFeedback: () => void
  closeFeedback: () => void
}

const FeedbackContext = createContext<FeedbackContextValue | null>(null)

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openFeedback = useCallback(() => setIsOpen(true), [])
  const closeFeedback = useCallback(() => setIsOpen(false), [])

  const value = useMemo<FeedbackContextValue>(
    () => ({ isOpen, openFeedback, closeFeedback }),
    [isOpen, openFeedback, closeFeedback]
  )

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  )
}

export function useFeedback() {
  const ctx = useContext(FeedbackContext)
  if (!ctx) throw new Error('useFeedback must be used within FeedbackProvider')
  return ctx
}
