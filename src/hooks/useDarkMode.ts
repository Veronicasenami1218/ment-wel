import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem('mentwel_theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('mentwel_theme', 'dark')
      document.body.classList.add('dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('mentwel_theme', 'light')
      document.body.classList.remove('dark')
    }
  }, [isDark])

  // Keep state in sync across tabs/components that mount this hook.
  useEffect(() => {
    const sync = () => {
      const stored = localStorage.getItem('mentwel_theme')
      setIsDark(stored === 'dark')
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  const toggle = () => setIsDark(prev => !prev)

  return { isDark, toggle }
}
