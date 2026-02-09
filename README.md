# SnaapMap

A tool that helps you gather all pertinent information needed to build an app with a vibe coder. It guides you through a structured audit and generates prompts ready for tools like Lovable, Bolt, Cursor, or Replit.

## Features

- **Intuitive Dashboard** – Chat interface with step-by-step audit questions
- **Progress Visuals** – Progress bar and step indicator for audit completion
- **Mind Mapping** – Simple mind map canvas (React Flow) for visualizing your app idea
- **Generated Prompts** – Template-based prompts filled from your audit responses
- **Copy to Clipboard** – One-click copy for each prompt or all prompts
- **AI Enhancement** (optional) – "Prompt AI" per field and "Enhance with AI" for prompts (requires OpenAI API key)

## Tech Stack

- React 18 + Vite + TypeScript
- Tailwind CSS
- React Router
- React Flow (@xyflow/react)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## AI Enhancement (Optional)

Add your Anthropic (Claude) API key to enable AI features:

1. Copy `.env.example` to `.env`
2. Add `VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here`
3. Restart the dev server

With AI enabled:
- **Prompt AI** buttons appear next to text/textarea fields in the audit
- **Enhance with AI** buttons appear on generated prompts in the Prompts view
- **Generate with AI** in the See Example modal for contextual examples

**Production warning:** The dev setup uses a Vite proxy and exposes your API key in the client. Before deploying to production, you must add a backend proxy. See [PRODUCTION.md](PRODUCTION.md) for details.

## Build

```bash
npm run build
```

Output is in the `dist` folder.
