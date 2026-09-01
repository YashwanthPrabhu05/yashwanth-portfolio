import { useState, useEffect } from 'react'

function getBreakpoint(width) {
  if (width <= 420) return 'small'
  if (width <= 640) return 'mobile'
  if (width <= 900) return 'tablet'
  return 'desktop'
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(() =>
    typeof window !== 'undefined' ? getBreakpoint(window.innerWidth) : 'desktop'
  )

  useEffect(() => {
    const handleResize = () => setBreakpoint(getBreakpoint(window.innerWidth))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return breakpoint
}
