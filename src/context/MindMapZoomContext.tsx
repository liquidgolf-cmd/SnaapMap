import { createContext, useContext, useState, useCallback } from 'react'

export interface MindMapZoomActions {
  zoomIn: () => void
  zoomOut: () => void
  fitView: (options?: { padding?: number }) => void | Promise<unknown>
}

interface MindMapZoomContextValue {
  zoomIn: () => void
  zoomOut: () => void
  fitView: () => void
  isAvailable: boolean
  registerActions: (actions: MindMapZoomActions | null) => void
}

const MindMapZoomContext = createContext<MindMapZoomContextValue | null>(null)

export function MindMapZoomProvider({ children }: { children: React.ReactNode }) {
  const [actions, setActions] = useState<MindMapZoomActions | null>(null)

  const registerActions = useCallback((next: MindMapZoomActions | null) => {
    setActions(next)
  }, [])

  const value: MindMapZoomContextValue = {
    zoomIn: useCallback(() => actions?.zoomIn?.(), [actions]),
    zoomOut: useCallback(() => actions?.zoomOut?.(), [actions]),
    fitView: useCallback(() => actions?.fitView?.(), [actions]),
    isAvailable: !!actions,
    registerActions,
  }

  return (
    <MindMapZoomContext.Provider value={value}>
      {children}
    </MindMapZoomContext.Provider>
  )
}

export function useMindMapZoom(): MindMapZoomContextValue {
  const ctx = useContext(MindMapZoomContext)
  if (!ctx) {
    throw new Error('useMindMapZoom must be used within MindMapZoomProvider')
  }
  return ctx
}
