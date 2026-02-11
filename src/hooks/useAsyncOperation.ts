import { useState, useCallback } from 'react'

interface UseAsyncOperationOptions {
  onSuccess?: () => void
  onError?: (error: string) => void
}

interface UseAsyncOperationReturn<T extends any[]> {
  execute: (...args: T) => Promise<void>
  loading: boolean
  error: string | null
  clearError: () => void
}

/**
 * Custom hook for managing async operations with consistent loading/error states
 *
 * @example
 * ```tsx
 * const { execute, loading, error } = useAsyncOperation(
 *   async () => {
 *     await someAsyncOperation()
 *   },
 *   {
 *     onSuccess: () => console.log('Success!'),
 *     onError: (err) => console.error(err)
 *   }
 * )
 * ```
 */
export function useAsyncOperation<T extends any[]>(
  operation: (...args: T) => Promise<void>,
  options: UseAsyncOperationOptions = {}
): UseAsyncOperationReturn<T> {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(
    async (...args: T) => {
      setLoading(true)
      setError(null)
      try {
        await operation(...args)
        options.onSuccess?.()
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'Operation failed'
        setError(errorMessage)
        options.onError?.(errorMessage)
      } finally {
        setLoading(false)
      }
    },
    [operation, options]
  )

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return { execute, loading, error, clearError }
}
