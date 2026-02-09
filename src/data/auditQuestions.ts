export type QuestionType = 'text' | 'textarea' | 'select' | 'multiselect'

export interface QuestionOption {
  value: string
  label: string
}

export interface AuditQuestion {
  id: string
  sectionId: string
  question: string
  placeholder?: string
  type: QuestionType
  options?: QuestionOption[]
  required?: boolean
}

export interface AuditSection {
  id: string
  stepNum: number
  title: string
  description: string
  questions: AuditQuestion[]
}

export const auditSections: AuditSection[] = [
  {
    id: 'foundation',
    stepNum: 1,
    title: 'Foundation',
    description: 'Why are you building this?',
    questions: [
      {
        id: 'app_name',
        sectionId: 'foundation',
        question: "What's the name of your app?",
        placeholder: 'e.g., TaskFlow',
        type: 'text',
        required: true,
      },
      {
        id: 'app_description',
        sectionId: 'foundation',
        question: 'Describe your app in one or two sentences.',
        placeholder: 'A simple task manager that helps teams stay organized...',
        type: 'textarea',
        required: true,
      },
      {
        id: 'why',
        sectionId: 'foundation',
        question: "What's your main motivation for building this app?",
        placeholder: 'Explain why this project matters to you and why now.',
        type: 'textarea',
        required: true,
      },
      {
        id: 'problem',
        sectionId: 'foundation',
        question: 'What problem does it solve?',
        type: 'textarea',
        required: true,
      },
    ],
  },
  {
    id: 'people',
    stepNum: 2,
    title: 'People',
    description: 'Who is this for?',
    questions: [
      {
        id: 'primary_users',
        sectionId: 'people',
        question: 'Who are your primary users?',
        placeholder: 'e.g., Small team leaders, freelancers, students...',
        type: 'text',
        required: true,
      },
      {
        id: 'primaryPain',
        sectionId: 'people',
        question: "What's their main pain point?",
        placeholder: 'The problem or frustration they experience today.',
        type: 'textarea',
        required: true,
      },
      {
        id: 'user_needs',
        sectionId: 'people',
        question: "What do these users need that your app provides?",
        type: 'textarea',
        required: true,
      },
      {
        id: 'user_context',
        sectionId: 'people',
        question: "Where and when will they use it?",
        placeholder: 'e.g., On the go, at their desk, in meetings...',
        type: 'text',
      },
    ],
  },
  {
    id: 'goals',
    stepNum: 3,
    title: 'Goals',
    description: 'What do they want?',
    questions: [
      {
        id: 'whatTheyWant',
        sectionId: 'goals',
        question: "What does success look like for them?",
        placeholder: 'What do users want to achieve or feel when using your app?',
        type: 'textarea',
        required: true,
      },
      {
        id: 'core_value',
        sectionId: 'goals',
        question: "What's the main benefit users get?",
        type: 'textarea',
        required: true,
      },
      {
        id: 'mvp_scope',
        sectionId: 'goals',
        question: 'What features must be in the first version (MVP)?',
        placeholder: 'List the core features needed for launch.',
        type: 'textarea',
        required: true,
      },
      {
        id: 'differentiator',
        sectionId: 'goals',
        question: "What makes your app different from similar tools?",
        type: 'textarea',
      },
    ],
  },
  {
    id: 'solution',
    stepNum: 4,
    title: 'Solution',
    description: 'How will it work?',
    questions: [
      {
        id: 'howItWorks',
        sectionId: 'solution',
        question: 'Describe the main user flow.',
        placeholder: 'Step through how a user would typically use the app from start to finish.',
        type: 'textarea',
        required: true,
      },
      {
        id: 'key_actions',
        sectionId: 'solution',
        question: 'What are the main things users do in the app?',
        placeholder: 'e.g., Create tasks, assign to teammates, track progress...',
        type: 'textarea',
        required: true,
      },
      {
        id: 'outcome',
        sectionId: 'solution',
        question: 'What outcome or result do users experience?',
        placeholder: 'e.g., Save time, feel organized, collaborate better...',
        type: 'textarea',
      },
    ],
  },
  {
    id: 'design',
    stepNum: 5,
    title: 'Design',
    description: 'What should it look like?',
    questions: [
      {
        id: 'visualStyle',
        sectionId: 'design',
        question: "How would you describe the look and feel?",
        placeholder: 'e.g., Clean, minimalist, mobile-first, professional...',
        type: 'textarea',
        required: true,
      },
      {
        id: 'colorPreference',
        sectionId: 'design',
        question: 'Color preference or palette?',
        placeholder: 'e.g., Dark mode, blues and grays, vibrant accents...',
        type: 'text',
        required: true,
      },
      {
        id: 'app_look',
        sectionId: 'design',
        question: 'Any design system preferences?',
        placeholder: 'e.g., Typography, spacing, rounded corners, shadows...',
        type: 'textarea',
      },
    ],
  },
  {
    id: 'impact',
    stepNum: 6,
    title: 'Impact',
    description: 'Why does this matter?',
    questions: [
      {
        id: 'whyItMatters',
        sectionId: 'impact',
        question: 'Why does this matter to you?',
        placeholder: 'The transformation or impact you hope to create.',
        type: 'textarea',
        required: true,
      },
      {
        id: 'success_looks_like',
        sectionId: 'impact',
        question: "What does success look like for you?",
        type: 'textarea',
        required: true,
      },
      {
        id: 'feel_better',
        sectionId: 'impact',
        question: 'How do you want to feel after launching this app?',
        placeholder: 'e.g., Accomplished, proud, helpful...',
        type: 'textarea',
      },
    ],
  },
]

export type SectionId = (typeof auditSections)[number]['id']

export function getSectionById(id: SectionId): AuditSection | undefined {
  return auditSections.find((s) => s.id === id)
}

export function getSectionByStepNum(stepNum: number): AuditSection | undefined {
  return auditSections.find((s) => s.stepNum === stepNum)
}

export function getQuestionById(id: string): AuditQuestion | undefined {
  for (const section of auditSections) {
    const q = section.questions.find((q) => q.id === id)
    if (q) return q
  }
  return undefined
}

export function getAllQuestions(): AuditQuestion[] {
  return auditSections.flatMap((s) => s.questions)
}
