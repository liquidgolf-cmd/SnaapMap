/**
 * Vercel serverless proxy for Anthropic API.
 * Keeps the API key server-side; frontend calls this route with no key.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey || !apiKey.trim()) {
    res.status(500).json({
      error: 'ANTHROPIC_API_KEY is not set. Add it in Vercel → Project → Settings → Environment Variables.',
    })
    return
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json().catch(() => ({}))
    res.status(response.status).json(data)
  } catch (err) {
    console.error('[SnappMap proxy]', err)
    res.status(500).json({ error: err.message || 'Proxy request failed' })
  }
}
