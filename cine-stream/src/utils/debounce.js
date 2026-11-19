import { useEffect, useState } from 'react'

// Returns the latest value only after typing has paused for the given delay.
export function useDebouncedValue(value, delay = 500) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(timer)
  }, [value, delay])
  return debounced
}