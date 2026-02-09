export interface StepConfig {
  num: number
  id: string
  label: string
  subtitle: string
  path?: string
}

export const STEPS: StepConfig[] = [
  { num: 1, id: 'foundation', label: 'Foundation', subtitle: 'Why are you building this?', path: '/' },
  { num: 2, id: 'people', label: 'People', subtitle: 'Who is this for?', path: '/' },
  { num: 3, id: 'goals', label: 'Goals', subtitle: 'What do they want?', path: '/' },
  { num: 4, id: 'solution', label: 'Solution', subtitle: 'How will it work?', path: '/' },
  { num: 5, id: 'design', label: 'Design', subtitle: 'What should it look like?', path: '/' },
  { num: 6, id: 'impact', label: 'Impact', subtitle: 'Why does this matter?', path: '/' },
  { num: 7, id: 'export', label: 'Export', subtitle: 'Generate & download', path: '/prompts' },
]

export type StepId = (typeof STEPS)[number]['id']

export function getStepByNum(num: number): StepConfig | undefined {
  return STEPS.find((s) => s.num === num)
}

export function getStepById(id: StepId): StepConfig | undefined {
  return STEPS.find((s) => s.id === id)
}
