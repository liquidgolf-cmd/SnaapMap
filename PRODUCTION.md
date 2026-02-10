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

### Option B: Serverless proxy (Vercel) — **included in this repo**

This project includes a Vercel serverless proxy so the API key never goes to the client.

**Steps:**

1. **Deploy** the app to Vercel (e.g. connect the GitHub repo). The `api/` folder is deployed as serverless functions.

2. **Set environment variables** in Vercel:
   - **Project → Settings → Environment Variables**
   - Add:
     - **`ANTHROPIC_API_KEY`** — your Anthropic API key (server-side only; not exposed to the browser).
     - **`VITE_AI_PROXY_ENABLED`** — set to **`true`** for Production (and optionally Preview). This tells the frontend that AI is available via the proxy so it does not need the key.

3. **Redeploy** after saving the env vars so the build gets `VITE_AI_PROXY_ENABLED` and the serverless function gets `ANTHROPIC_API_KEY`.

The frontend calls `/api/anthropic/v1/messages` (same origin). Vercel routes that to `api/anthropic/v1/messages.js`, which adds the key and forwards to Anthropic.

### Option C: Disable AI for production

If you deploy as a static site and don't add a backend:

1. **Do not** set `VITE_ANTHROPIC_API_KEY` when building for production (or leave it empty).
2. AI features will be hidden/disabled; the rest of the app will work.

## Summary

| Environment | AI works? | API key exposed? |
|-------------|-----------|------------------|
| `npm run dev` | Yes (Vite proxy) | Yes, in client (dev only) |
| `npm run preview` | Yes (Vite proxy) | Yes, in client |
| Static deploy (no proxy) | No (CORS) | N/A – don’t set key at build |
| Deploy with serverless proxy (Vercel) | Yes | No (key stays on server) |

Add a backend proxy before deploying to production if you want AI features to work securely.

---

## Vercel: SPA routing

The app uses client-side routing (React Router). `vercel.json` is configured so that routes like `/signin` and `/app/audit` serve `index.html`; the client then renders the correct page. Without this, direct requests or refreshes on those URLs would return 404.

---

## Firebase Auth: authorized domains

If you use Firebase Authentication (e.g. Google Sign-In) on a custom domain (e.g. `snappmap.vercel.app`), add that domain in Firebase:

1. Open [Firebase Console](https://console.firebase.google.com) → your project.
2. **Authentication** → **Settings** → **Authorized domains**.
3. Click **Add domain** and add your production domain (e.g. `snappmap.vercel.app`).

Otherwise you’ll see `auth/unauthorized-domain` and “The current domain is not authorized for OAuth operations” when using Sign in with Google in production.
