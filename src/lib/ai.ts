const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY
const ANTHROPIC_MODEL = 'claude-3-5-haiku-20241022'

// Dev: Vite proxy forwards to Anthropic. Prod: Vercel serverless at same path adds key.
const ANTHROPIC_API_URL = '/api/anthropic/v1/messages'

/** In production with serverless proxy, AI is enabled via VITE_AI_PROXY_ENABLED (no key in client). */
const isProxyMode = import.meta.env.PROD && import.meta.env.VITE_AI_PROXY_ENABLED === 'true'

export function isAiAvailable(): boolean {
  if (import.meta.env.PROD) {
    return isProxyMode
  }
  return Boolean(API_KEY && API_KEY.trim().length > 0)
}

async function callAnthropic(systemPrompt: string, userContent: string): Promise<string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'anthropic-version': '2023-06-01',
  }
  // Only send API key in dev (Vite proxy forwards it). In prod the serverless proxy adds it.
  if (!import.meta.env.PROD && API_KEY) {
    headers['x-api-key'] = API_KEY
    headers['anthropic-dangerous-direct-browser-access'] = 'true'
  }

  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userContent }],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`AI request failed: ${err}`)
  }

  const data = (await response.json()) as {
    content?: { type: string; text?: string }[]
  }
  const textBlock = data.content?.find((b) => b.type === 'text')
  return textBlock?.text?.trim() ?? ''
}

export async function enhanceWithAi(
  prompt: string,
  context?: string
): Promise<string> {
  if (!isAiAvailable()) {
    throw new Error(
      import.meta.env.PROD
      ? 'AI is not configured. Set ANTHROPIC_API_KEY and VITE_AI_PROXY_ENABLED=true in Vercel.'
      : 'AI is not configured. Add VITE_ANTHROPIC_API_KEY to your .env file.'
    )
  }

  const systemPrompt = `You are a helpful assistant that refines prompts for AI-powered app builders (e.g. Lovable, Bolt, Cursor, Replit).
Given a prompt or template output, return an improved, more specific version that will help the tool build the app more accurately.
Keep the same intent but add clarity, structure, and useful details. Return only the refined prompt, no preamble.`

  const userContent = context
    ? `Context:\n${context}\n\nPrompt to enhance:\n${prompt}`
    : prompt

  return callAnthropic(systemPrompt, userContent)
}

export interface AuditContextForAi {
  sectionTitle: string
  sectionDescription: string
  responses: Record<string, string | string[]>
  questionId: string
}

function formatResponsesForContext(responses: Record<string, string | string[]>) {
  const entries = Object.entries(responses).filter(
    ([, v]) => v !== undefined && v !== '' && (Array.isArray(v) ? v.length > 0 : String(v).trim())
  )
  return entries
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
    .join('\n')
}

export async function suggestFieldValue(
  fieldLabel: string,
  currentValue: string,
  context?: string | AuditContextForAi
): Promise<string> {
  if (!isAiAvailable()) {
    throw new Error(
      import.meta.env.PROD
      ? 'AI is not configured. Set ANTHROPIC_API_KEY and VITE_AI_PROXY_ENABLED=true in Vercel.'
      : 'AI is not configured. Add VITE_ANTHROPIC_API_KEY to your .env file.'
    )
  }

  let contextStr: string
  if (typeof context === 'string') {
    contextStr = context
  } else if (context && typeof context === 'object') {
    const parts = [
      `Current section: ${context.sectionTitle} - ${context.sectionDescription}`,
      'What the user has answered so far:',
      formatResponsesForContext(context.responses),
    ]
    contextStr = parts.join('\n')
  } else {
    contextStr = ''
  }

  const systemPrompt = `You help users refine their app audit answers for AI-powered app builders. Use the full conversation context—section, prior answers, and the user's app idea—to suggest a more specific, actionable answer. Stay true to their app; do not invent a different product. Return only the suggested text, no preamble or explanation.`

  const userContent = contextStr
    ? `Context from the audit so far:\n${contextStr}\n\nCurrent question: ${fieldLabel}\nCurrent answer: ${currentValue || '(empty)'}\n\nSuggest a better or more specific answer based on this context. Return only the suggested value.`
    : `Question: ${fieldLabel}\nCurrent value: ${currentValue || '(empty)'}\n\nSuggest a better or more specific value. Return only the suggested value.`

  return callAnthropic(systemPrompt, userContent)
}

export interface ExampleTier {
  text: string
  why: string
}

export interface GeneratedExamples {
  poor: ExampleTier
  good: ExampleTier
  excellent: ExampleTier
}

export async function generateContextualExamples(
  questionLabel: string,
  context: AuditContextForAi
): Promise<GeneratedExamples> {
  if (!isAiAvailable()) {
    throw new Error(
      import.meta.env.PROD
      ? 'AI is not configured. Set ANTHROPIC_API_KEY and VITE_AI_PROXY_ENABLED=true in Vercel.'
      : 'AI is not configured. Add VITE_ANTHROPIC_API_KEY to your .env file.'
    )
  }

  const contextStr = [
    `Section: ${context.sectionTitle} - ${context.sectionDescription}`,
    'Audit answers so far:',
    formatResponsesForContext(context.responses),
  ].join('\n')

  const systemPrompt = `You generate example answers for app audit questions. Given the user's app context (section, prior answers), produce three example answers for the given question: poor (vague, generic), good (better but could improve), excellent (specific, actionable). Base examples on their actual app idea—do not invent a different product. Return valid JSON only, no markdown or extra text, in this exact shape:
{"poor":{"text":"...","why":"..."},"good":{"text":"...","why":"..."},"excellent":{"text":"...","why":"..."}}`

  const userContent = `Context:\n${contextStr}\n\nQuestion: ${questionLabel}\n\nGenerate poor, good, and excellent example answers as JSON.`

  const content = await callAnthropic(systemPrompt, userContent)

  const cleaned = content.replace(/^```(?:json)?\s*|\s*```$/g, '').trim()
  try {
    const parsed = JSON.parse(cleaned) as GeneratedExamples
    if (
      parsed?.poor?.text &&
      parsed?.good?.text &&
      parsed?.excellent?.text
    ) {
      return parsed
    }
  } catch {
    // fallthrough to throw
  }
  throw new Error('AI did not return valid example structure')
}
