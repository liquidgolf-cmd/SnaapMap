# Preferences roadmap (remaining)

The **starting set** is done: theme (dark/light), sidebar default, and confirm-before-destructive are in Settings and persisted via [PreferencesContext](src/context/PreferencesContext.tsx). The rest of the ideas below can be added in any order.

---

## 1. Appearance (further)

- **Font size** – Add `fontSize: 'small' | 'medium' | 'large'` to preferences. Apply via a CSS variable (e.g. `--text-base: 0.875rem` for small, `1rem` for medium, `1.125rem` for large) and use it in `index.css` for `body` or a layout wrapper. No need to change every component if the base is set once.
- **Full light theme** – Right now only `body` switches for light theme; the app chrome (sidebar, header, cards) still uses Tailwind `bg-slate-*`. To make the whole UI light:
  - Option A: Add a layout class when `data-theme="light"` and use CSS overrides for the main wrappers (e.g. `.app-layout`, `aside`, `header`) with light backgrounds and borders.
  - Option B: Use CSS variables for surfaces (e.g. `--bg-surface`, `--bg-card`, `--text-primary`) and set them in `index.css` for both `[data-theme="dark"]` and `[data-theme="light"]`, then gradually replace hard-coded slate classes with these variables.
- **Accent color** – Add `accentColor: 'blue' | 'purple' | …` to preferences. [index.css](src/index.css) already has `--color-accent`; define a small set of accent presets and apply the chosen one when the preference changes.

---

## 2. Audit and prompts

- **Default starting section** – Add `defaultAuditSection: 'first' | 'last' | 'firstIncomplete'` to preferences. In [AuditContext](src/context/AuditContext.tsx), when initializing `currentSectionId`, read this and (for `last`) load last section id from localStorage or (for `firstIncomplete`) compute from `completedSections` / responses.
- **Prompt template order or favorites** – Add `promptTemplateOrder: string[]` (template ids) or `promptTemplateFavorites: string[]` to preferences. In [Prompts](src/pages/Prompts.tsx) or [GeneratedPrompts](src/components/prompts/GeneratedPrompts.tsx), sort or filter [promptTemplates](src/data/promptTemplates.ts) using this list. Allow reorder via drag-and-drop or a “favorite” toggle that updates the preference.
- **Copy format** – Add `copyFormat: 'plain' | 'markdown'` to preferences. When copying a prompt to clipboard, if `plain`, strip markdown (or pass a flag into the copy handler); if `markdown`, copy as-is. Use this in the component that handles “Copy” for generated prompts.

---

## 3. Mind map

- **Default layout** – Add `mindMapStartFromAudit: boolean` (e.g. “Sync from audit on first open”). When `true`, on first visit to the mind map (or when no stored map exists), call the same logic as “Sync from Audit” to build nodes/edges from audit responses. When `false`, always load from [MINDMAP_STORAGE_KEY](src/context/AuditContext.tsx) only (or show empty and let user sync manually).
- **Node style** – Add `mindMapNodeStyle: 'compact' | 'spacious'` to preferences. In [MindMapCanvas](src/components/mindmap/MindMapCanvas.tsx), apply a class or inline style to the custom node (e.g. padding/min-width) based on this preference.
- **Auto-save interval** – Add `mindMapSaveDebounceMs: 0 | 3000 | 5000` (0 = immediate). In MindMapCanvas, the effect that writes to localStorage currently runs on every `nodes`/`edges` change. When debounce &gt; 0, debounce the write so large maps don’t trigger too many writes.

---

## 4. AI and privacy

- **Disable AI features** – Add `aiDisabled: boolean` to preferences. In [src/lib/ai.ts](src/lib/ai.ts), change `isAiAvailable()` to return `false` when `aiDisabled` is true (read from a hook or a small “preferences for AI” helper that reads from context/localStorage). In the UI, hide or disable “Prompt AI”, “Enhance with AI”, “Generate with AI” when AI is disabled.
- **Usage / analytics** – Add `allowUsageData: boolean` for a future backend. Persist in preferences; no implementation until you have an endpoint. When you do, only send anonymous usage when this is true.

---

## 5. Notifications and feedback

- **Success toasts** – Add a small toast system (e.g. a context + a fixed-position container that shows a “Copied!” or “Exported!” message for 2–3 seconds). Optionally add `showCopyToasts: boolean` to preferences so users can turn toasts off. Use the toast when copying a prompt to clipboard.

---

## Implementation notes

- **Single preferences object** – Keep using one `snappmap-preferences` JSON object and [PreferencesContext](src/context/PreferencesContext.tsx). Add new keys and default values there; extend the type in [PreferencesContext.tsx](src/context/PreferencesContext.tsx) (e.g. `Preferences` interface).
- **Settings UI** – Add new controls in [Settings](src/pages/Settings.tsx). If the list grows, consider grouping into tabs or collapsible sections (Appearance, Audit & prompts, Mind map, AI & privacy, Notifications).
- **Where to read** – Layout/theme: already read from preferences. Audit: AuditContext and Dashboard. Prompts: Prompts page and GeneratedPrompts. Mind map: MindMapCanvas. AI: ai.ts and any component that shows AI buttons. No routing changes needed.
