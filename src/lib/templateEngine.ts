import type { AuditResponses } from '../context/AuditContext'

export function fillTemplate(
  template: string,
  responses: AuditResponses
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const val = responses[key]
    if (val === undefined || val === null) return ''
    if (Array.isArray(val)) return val.join(', ')
    return String(val).trim()
  })
}

export function getPlaceholderMap(
  placeholders: string[],
  responses: AuditResponses
): Record<string, string> {
  const map: Record<string, string> = {}
  for (const key of placeholders) {
    const val = responses[key]
    if (val === undefined || val === null) map[key] = ''
    else if (Array.isArray(val)) map[key] = val.join(', ')
    else map[key] = String(val).trim()
  }
  return map
}
