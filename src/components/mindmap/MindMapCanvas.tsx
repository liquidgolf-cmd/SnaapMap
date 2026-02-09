import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  Handle,
  Position,
  useReactFlow,
  type Node,
  type Edge,
  type OnConnect,
  type NodeTypes,
  type Connection,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useAudit, MINDMAP_STORAGE_KEY } from '../../context/AuditContext'
import { useMindMapZoom } from '../../context/MindMapZoomContext'

interface MindMapNodeProps {
  data: { label: string; type?: string }
  id: string
  selected?: boolean
}

function MindMapNode({ data, id, selected }: MindMapNodeProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editLabel, setEditLabel] = useState(data.label)
  const inputRef = useRef<HTMLInputElement>(null)
  const type = (data.type ?? 'default') as string
  const isRoot = type === 'root'
  const isApp = type === 'app'
  const isFeature = type === 'feature'
  const isUser = type === 'user'
  const isBenefit = type === 'benefit'

  const bgClass = isRoot || isApp
    ? 'bg-blue-500 text-white'
    : isFeature
      ? 'bg-slate-600 border-slate-500'
      : isUser
        ? 'bg-slate-600 border-green-500/50'
        : isBenefit
          ? 'bg-slate-600 border-amber-500/50'
          : 'bg-slate-600 border-slate-500'

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  useEffect(() => {
    setEditLabel(data.label)
  }, [data.label])

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editLabel.trim()) {
      const event = new CustomEvent('nodeLabelChange', {
        detail: { id, label: editLabel.trim() },
      })
      window.dispatchEvent(event)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditLabel(data.label)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      handleCancel()
    }
  }

  return (
    <div
      className={`px-4 py-2 rounded-xl border-2 shadow-sm min-w-[120px] text-center font-medium text-sm relative ${bgClass} ${selected ? 'ring-2 ring-blue-400' : ''}`}
      onDoubleClick={handleDoubleClick}
    >
      <Handle type="target" position={Position.Top} className="!bg-slate-400" />
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editLabel}
          onChange={(e) => setEditLabel(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent border-none outline-none text-center font-medium text-sm"
          style={{ color: isRoot || isApp ? 'white' : 'inherit' }}
        />
      ) : (
        <span>{data.label || 'Untitled'}</span>
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-slate-400" />
    </div>
  )
}

const nodeTypes: NodeTypes = {
  mindmap: MindMapNode as any,
}

function MindMapZoomRegistrar() {
  const { zoomIn, zoomOut, fitView } = useReactFlow()
  const { registerActions } = useMindMapZoom()

  useEffect(() => {
    registerActions({ zoomIn, zoomOut, fitView })
    return () => registerActions(null)
  }, [registerActions, zoomIn, zoomOut, fitView])

  return null
}

function buildInitialNodesFromAudit(responses: Record<string, string | string[]>) {
  const appName = (responses.app_name as string) || 'My App'
  const primaryUsers = (responses.primary_users as string) || 'Users'
  const keyActions = (responses.key_actions as string) || ''
  const coreValue = (responses.core_value as string) || ''

  const features = keyActions
    ? keyActions.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean).slice(0, 5)
    : ['Feature 1', 'Feature 2']
  const benefits = coreValue
    ? coreValue.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean).slice(0, 3)
    : ['Benefit 1']

  const nodes: Node[] = [
    {
      id: 'root',
      type: 'mindmap',
      position: { x: 250, y: 50 },
      data: { label: appName, type: 'root' },
    },
    {
      id: 'users',
      type: 'mindmap',
      position: { x: 50, y: 180 },
      data: { label: primaryUsers, type: 'user' },
    },
    ...features.map((label, i) => ({
      id: `feature-${i}`,
      type: 'mindmap' as const,
      position: { x: 200 + i * 100, y: 200 + i * 40 },
      data: { label, type: 'feature' as const },
    })),
    ...benefits.map((label, i) => ({
      id: `benefit-${i}`,
      type: 'mindmap' as const,
      position: { x: 350, y: 320 + i * 60 },
      data: { label, type: 'benefit' as const },
    })),
  ]

  const edges: Edge[] = [
    { id: 'root-users', source: 'root', target: 'users' },
    ...features.map((_, i) => ({
      id: `root-feature-${i}`,
      source: 'root',
      target: `feature-${i}`,
    })),
    ...benefits.map((_, i) => ({
      id: `root-benefit-${i}`,
      source: 'root',
      target: `benefit-${i}`,
    })),
  ]

  return { nodes, edges }
}

export function MindMapCanvas() {
  const { responses } = useAudit()
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [history, setHistory] = useState<Array<{ nodes: Node[]; edges: Edge[] }>>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const historyTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const reactFlowInstance = useReactFlow()

  const initial = useMemo(
    () => buildInitialNodesFromAudit(responses),
    []
  )

  const saveToHistory = useCallback((nodesToSave: Node[], edgesToSave: Edge[]) => {
    if (historyTimeoutRef.current) {
      clearTimeout(historyTimeoutRef.current)
    }
    historyTimeoutRef.current = setTimeout(() => {
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1)
        const stateToSave = {
          nodes: JSON.parse(JSON.stringify(nodesToSave)),
          edges: JSON.parse(JSON.stringify(edgesToSave)),
        }
        newHistory.push(stateToSave)
        const newIndex = newHistory.length - 1
        if (newHistory.length > 50) {
          newHistory.shift()
        } else {
          setHistoryIndex(newIndex)
        }
        return newHistory
      })
    }, 300)
  }, [historyIndex])

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1]
      setNodes(prevState.nodes)
      setEdges(prevState.edges)
      setHistoryIndex(historyIndex - 1)
    }
  }, [historyIndex, history])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1]
      setNodes(nextState.nodes)
      setEdges(nextState.edges)
      setHistoryIndex(historyIndex + 1)
    }
  }, [historyIndex, history])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') {
        e.preventDefault()
        undo()
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault()
        redo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])

  useEffect(() => {
    const handleNodeLabelChange = (e: CustomEvent<{ id: string; label: string }>) => {
      setNodes((nds) => {
        const updated = nds.map((node) =>
          node.id === e.detail.id ? { ...node, data: { ...node.data, label: e.detail.label } } : node
        )
        setTimeout(() => saveToHistory(updated, edges), 0)
        return updated
      })
    }

    window.addEventListener('nodeLabelChange', handleNodeLabelChange as EventListener)
    return () => window.removeEventListener('nodeLabelChange', handleNodeLabelChange as EventListener)
  }, [edges, saveToHistory])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(MINDMAP_STORAGE_KEY)
      if (stored) {
        const { nodes: n, edges: e } = JSON.parse(stored) as {
          nodes: Node[]
          edges: Edge[]
        }
        if (n?.length) {
          setNodes(n)
          setHistory([{ nodes: n, edges: e || [] }])
          setHistoryIndex(0)
        }
        if (e?.length) setEdges(e)
      } else {
        const initialNodes = initial.nodes.map((n) => ({ ...n, type: 'mindmap' }))
        setNodes(initialNodes)
        setEdges(initial.edges)
        setHistory([{ nodes: initialNodes, edges: initial.edges }])
        setHistoryIndex(0)
      }
    } catch {
      const initialNodes = initial.nodes.map((n) => ({ ...n, type: 'mindmap' }))
      setNodes(initialNodes)
      setEdges(initial.edges)
      setHistory([{ nodes: initialNodes, edges: initial.edges }])
      setHistoryIndex(0)
    }
  }, [])

  const onNodesChange = useCallback(
    (changes: Parameters<typeof applyNodeChanges>[0]) => {
      setNodes((nds) => {
        const updated = applyNodeChanges(changes, nds)
        setTimeout(() => saveToHistory(updated, edges), 0)
        return updated
      })
    },
    [edges, saveToHistory]
  )
  const onEdgesChange = useCallback(
    (changes: Parameters<typeof applyEdgeChanges>[0]) => {
      setEdges((eds) => {
        const updated = applyEdgeChanges(changes, eds)
        setTimeout(() => {
          setNodes((nds) => {
            saveToHistory(nds, updated)
            return nds
          })
        }, 0)
        return updated
      })
    },
    [saveToHistory]
  )
  const onConnect = useCallback<OnConnect>(
    (params: Connection) => {
      setEdges((eds) => {
        const updated = addEdge(params, eds)
        setTimeout(() => {
          setNodes((nds) => {
            saveToHistory(nds, updated)
            return nds
          })
        }, 0)
        return updated
      })
    },
    [saveToHistory]
  )

  const onNodesDelete = useCallback(
    (nodesToDelete: Node[]) => {
      const rootNode = nodesToDelete.find((n) => n.id === 'root')
      if (rootNode) {
        return
      }
      setNodes((nds) => {
        const updated = nds.filter((n) => !nodesToDelete.some((d) => d.id === n.id))
        setEdges((eds) => {
          const updatedEdges = eds.filter(
            (e) => !nodesToDelete.some((n) => n.id === e.source || n.id === e.target)
          )
          saveToHistory(updated, updatedEdges)
          return updatedEdges
        })
        return updated
      })
    },
    [saveToHistory]
  )

  const addNode = useCallback(() => {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const position = reactFlowInstance.screenToFlowPosition({ x: centerX, y: centerY })
    const newNodeId = `node-${Date.now()}`
    const newNode: Node = {
      id: newNodeId,
      type: 'mindmap',
      position,
      data: { label: 'New Node', type: 'default' },
      selected: true,
    }
    setNodes((nds) => {
      const updated = [...nds, newNode]
      saveToHistory(updated, edges)
      return updated
    })
  }, [reactFlowInstance, edges, saveToHistory])

  const exportToPng = useCallback(async () => {
    try {
      const reactFlowViewport = document.querySelector('.react-flow__viewport') as HTMLElement
      if (!reactFlowViewport) {
        throw new Error('React Flow viewport not found')
      }

      const html2canvas = (window as any).html2canvas
      if (html2canvas) {
        const canvas = await html2canvas(reactFlowViewport, {
          backgroundColor: '#1e293b',
          useCORS: true,
        })
        const dataUrl = canvas.toDataURL('image/png')
        const a = document.createElement('a')
        a.href = dataUrl
        a.download = 'mindmap.png'
        a.click()
      } else {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          throw new Error('Could not get canvas context')
        }
        
        const bounds = reactFlowInstance.getNodesBounds(reactFlowInstance.getNodes())
        canvas.width = bounds.width + 40
        canvas.height = bounds.height + 40
        ctx.fillStyle = '#1e293b'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        const img = new Image()
        const svgElement = reactFlowViewport.querySelector('svg')
        if (svgElement) {
          const svgData = new XMLSerializer().serializeToString(svgElement)
          const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
          const url = URL.createObjectURL(svgBlob)
          
          img.onload = () => {
            ctx.drawImage(img, 0, 0)
            canvas.toBlob((blob) => {
              if (blob) {
                const a = document.createElement('a')
                a.href = URL.createObjectURL(blob)
                a.download = 'mindmap.png'
                a.click()
                URL.revokeObjectURL(a.href)
              }
              URL.revokeObjectURL(url)
            }, 'image/png')
          }
          img.src = url
        } else {
          throw new Error('SVG element not found')
        }
      }
    } catch (error) {
      console.error('Failed to export PNG:', error)
      alert('Failed to export PNG. For best results, install html2canvas: npm install html2canvas')
    }
  }, [reactFlowInstance])

  useEffect(() => {
    try {
      localStorage.setItem(
        MINDMAP_STORAGE_KEY,
        JSON.stringify({ nodes, edges })
      )
    } catch {
      // ignore
    }
  }, [nodes, edges])

  const syncFromAudit = useCallback(() => {
    const { nodes: n, edges: e } = buildInitialNodesFromAudit(responses)
    const updatedNodes = n.map((node) => ({ ...node, type: 'mindmap' }))
    setNodes(updatedNodes)
    setEdges(e)
    setHistory([{ nodes: updatedNodes, edges: e }])
    setHistoryIndex(0)
  }, [responses])

  return (
    <div className="relative h-[calc(100vh-12rem)] min-h-[400px] rounded-xl overflow-hidden border border-slate-600 bg-slate-700">
      <div className="absolute top-2 left-2 z-10 flex gap-2">
        <button
          type="button"
          onClick={addNode}
          className="px-3 py-1.5 rounded-lg bg-slate-600 text-slate-200 text-sm hover:bg-slate-500 transition-colors"
          title="Add Node"
        >
          + Add Node
        </button>
        <button
          type="button"
          onClick={exportToPng}
          className="px-3 py-1.5 rounded-lg bg-slate-600 text-slate-200 text-sm hover:bg-slate-500 transition-colors"
          title="Export as PNG"
        >
          Export PNG
        </button>
      </div>
      <div className="absolute top-2 right-2 z-10">
        <button
          type="button"
          onClick={syncFromAudit}
          className="px-3 py-1.5 rounded-lg bg-slate-600 text-slate-200 text-sm hover:bg-slate-500 transition-colors"
        >
          Sync from Audit
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={onNodesDelete}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        className="dark"
      >
        <Background />
        <Controls />
        <MindMapZoomRegistrar />
      </ReactFlow>
    </div>
  )
}
