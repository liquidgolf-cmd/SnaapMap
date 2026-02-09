# Production Deployment: AI Features

## Important Warning

The AI features (Prompt AI, Enhance with AI, Generate with AI) use the Anthropic API. In **development**, a Vite proxy avoids CORS by forwarding requests to Anthropic. However:

- **Your API key is bundled into the client** when you build. Anyone can extract it from the built JavaScript.
- **AI features will not work** when deployed to a static host (Vercel, Netlify, GitHub Pages, etc.) because:
  1. There is no proxy on a static host, so requests to Anthropic fail with CORS.
  2. Exposing your API key publicly is a security risk.

## What You Need to Do for Production

Before deploying an app that uses AI features to a public URL, you **must** add a backend proxy:

1. **Remove the API key from the client** – The frontend must never receive or store the key.
2. **Add a server endpoint** that:
   - Receives requests from your frontend (e.g. `POST /api/chat`)
   - Adds the API key from server-side environment variables
   - Forwards the request to `https://api.anthropic.com/v1/messages`
   - Returns the response to your frontend

## Implementation Options

### Option A: Express backend (Node.js)

1. Add an Express server in a `server/` folder.
2. Create a route like `POST /api/anthropic/messages` that proxies to Anthropic.
3. Store the API key in `process.env.ANTHROPIC_API_KEY` (not `VITE_`).
4. Run the server alongside your app (e.g. Vite on 5173, Express on 3001).
5. Configure your host to serve the API route from the same domain or a backend subdomain.

### Option B: Serverless functions (Vercel / Netlify)

1. Create an API route (Vercel) or serverless function (Netlify).
2. The function receives the request, adds the API key from env, calls Anthropic, returns the response.
3. Frontend calls `/api/anthropic` (same origin) – your host routes it to the function.

### Option C: Disable AI for production

If you deploy as a static site and don't add a backend:

1. **Do not** set `VITE_ANTHROPIC_API_KEY` when building for production (or leave it empty).
2. AI features will be hidden/disabled; the rest of the app will work.

## Summary

| Environment | AI works? | API key exposed? |
|-------------|-----------|------------------|
| `npm run dev` | Yes (Vite proxy) | Yes, in client (dev only) |
| `npm run preview` | Yes (Vite proxy) | Yes, in client |
| Static deploy (Vercel/Netlify/etc.) | No (CORS) | Yes if key was set at build – **do not do this** |
| Deploy with backend proxy | Yes | No (key stays on server) |

Add a backend proxy before deploying to production if you want AI features to work securely.
