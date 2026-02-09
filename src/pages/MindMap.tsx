import { useAudit } from '../context/AuditContext'
import { MindMapCanvas } from '../components/mindmap/MindMapCanvas'

export function MindMap() {
  const { mindMapVersion } = useAudit()
  return (
    <div className="h-full">
      <MindMapCanvas key={mindMapVersion} />
    </div>
  )
}
