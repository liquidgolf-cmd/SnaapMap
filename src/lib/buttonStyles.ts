/**
 * Centralized button style constants for consistent UI
 *
 * Usage:
 * ```tsx
 * import { BUTTON_STYLES } from '../lib/buttonStyles'
 *
 * <button className={BUTTON_STYLES.primary.medium}>Click me</button>
 * ```
 */

// Base styles shared by all buttons
const BASE = 'rounded-lg transition-colors font-medium'

// Size variants
const SIZES = {
  small: 'px-2 py-1 text-xs',
  medium: 'px-3 py-1.5 text-sm',
  large: 'px-4 py-2',
} as const

// Variant styles (without size)
const VARIANTS = {
  primary: 'bg-red-500 text-white hover:bg-red-600 disabled:opacity-50',
  secondary: 'bg-slate-600 text-slate-200 hover:bg-slate-500 disabled:opacity-50',
  outline: 'border border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-slate-200 disabled:opacity-50',
  ghost: 'text-slate-400 hover:bg-slate-700 hover:text-slate-200 disabled:opacity-50',
  danger: 'bg-red-600 text-white hover:bg-red-700 disabled:opacity-50',
  icon: 'p-2 text-slate-400 hover:bg-slate-600 hover:text-slate-200 disabled:opacity-50',
} as const

// Pre-composed button styles: variant + size
export const BUTTON_STYLES = {
  primary: {
    small: `${BASE} ${VARIANTS.primary} ${SIZES.small}`,
    medium: `${BASE} ${VARIANTS.primary} ${SIZES.medium}`,
    large: `${BASE} ${VARIANTS.primary} ${SIZES.large}`,
  },
  secondary: {
    small: `${BASE} ${VARIANTS.secondary} ${SIZES.small}`,
    medium: `${BASE} ${VARIANTS.secondary} ${SIZES.medium}`,
    large: `${BASE} ${VARIANTS.secondary} ${SIZES.large}`,
  },
  outline: {
    small: `${BASE} ${VARIANTS.outline} ${SIZES.small}`,
    medium: `${BASE} ${VARIANTS.outline} ${SIZES.medium}`,
    large: `${BASE} ${VARIANTS.outline} ${SIZES.large}`,
  },
  ghost: {
    small: `${BASE} ${VARIANTS.ghost} ${SIZES.small}`,
    medium: `${BASE} ${VARIANTS.ghost} ${SIZES.medium}`,
    large: `${BASE} ${VARIANTS.ghost} ${SIZES.large}`,
  },
  danger: {
    small: `${BASE} ${VARIANTS.danger} ${SIZES.small}`,
    medium: `${BASE} ${VARIANTS.danger} ${SIZES.medium}`,
    large: `${BASE} ${VARIANTS.danger} ${SIZES.large}`,
  },
  icon: {
    base: `${BASE} ${VARIANTS.icon}`,
  },
} as const

// Type exports for TypeScript autocomplete
export type ButtonVariant = keyof typeof BUTTON_STYLES
export type ButtonSize = 'small' | 'medium' | 'large'
