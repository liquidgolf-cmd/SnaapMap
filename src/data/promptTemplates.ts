export interface PromptTemplate {
  id: string
  title: string
  description: string
  template: string
  placeholders: string[]
}

export const promptTemplates: PromptTemplate[] = [
  {
    id: 'mvp-main',
    title: 'MVP Build Prompt',
    description: 'Main prompt to build your MVP with an AI coding tool',
    template: `Build an app called "{{app_name}}" for {{primary_users}}.

**What it does:**
{{app_description}}

**Key user actions:**
{{key_actions}}

**Look and feel:**
{{app_look}}

**Main value for users:**
{{core_value}}

**Problem it solves:**
{{problem}}

**MVP must include:**
{{mvp_scope}}

**Success means:**
{{success_looks_like}}

Use a modern, clean design with generous whitespace, rounded corners, and a professional color palette. Build a fully functional MVP.`,
    placeholders: [
      'app_name',
      'primary_users',
      'app_description',
      'key_actions',
      'app_look',
      'core_value',
      'problem',
      'mvp_scope',
      'success_looks_like',
    ],
  },
  {
    id: 'feature-focus',
    title: 'Feature Focus Prompt',
    description: 'Detailed prompt for core features',
    template: `For the app "{{app_name}}":

**Target users:** {{primary_users}}
**Their needs:** {{user_needs}}

**Core features to implement:**
{{mvp_scope}}

**User outcome:** {{outcome}}

Ensure each feature is intuitive and directly supports the user value proposition.`,
    placeholders: [
      'app_name',
      'primary_users',
      'user_needs',
      'mvp_scope',
      'outcome',
    ],
  },
  {
    id: 'ux-direction',
    title: 'UX Direction Prompt',
    description: 'Guidance for look, feel, and flow',
    template: `Design the app "{{app_name}}" with:

**Look and feel:** {{app_look}}

**Main actions users take:** {{key_actions}}

**Context of use:** {{user_context}}

**Differentiator:** {{differentiator}}

Create an intuitive flow that prioritizes the main user actions. Use generous whitespace, card-based layouts, rounded corners, and subtle shadows. Keep it professional and clean.`,
    placeholders: [
      'app_name',
      'app_look',
      'key_actions',
      'user_context',
      'differentiator',
    ],
  },
]
