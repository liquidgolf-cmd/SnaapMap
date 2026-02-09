export interface StepConfig {
  num: number
  id: string
  label: string
  subtitle: string
  path?: string
}

export const STEPS: StepConfig[] = [
  { num: 1, id: 'foundation', label: 'Foundation', subtitle: 'Why are you building this?', path: '/app/audit' },
  { num: 2, id: 'people', label: 'People', subtitle: 'Who is this for?', path: '/app/audit' },
  { num: 3, id: 'goals', label: 'Goals', subtitle: 'What do they want?', path: '/app/audit' },
  { num: 4, id: 'solution', label: 'Solution', subtitle: 'How will it work?', path: '/app/audit' },
  { num: 5, id: 'design', label: 'Design', subtitle: 'What should it look like?', path: '/app/audit' },
  { num: 6, id: 'impact', label: 'Impact', subtitle: 'Why does this matter?', path: '/app/audit' },
  { num: 7, id: 'export', label: 'Export', subtitle: 'Generate & download', path: '/app/prompts' },
]

export type StepId = (typeof STEPS)[number]['id']

export function getStepByNum(num: number): StepConfig | undefined {
  return STEPS.find((s) => s.num === num)
}

export function getStepById(id: StepId): StepConfig | undefined {
  return STEPS.find((s) => s.id === id)
}
