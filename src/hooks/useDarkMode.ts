import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Check localStorage first, then system preference
    const stored = localStorage.getItem('mentwel_theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    console.log('Dark mode effect:', isDark)
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

  const toggle = () => {
    console.log('Toggle dark mode, current:', isDark)
    setIsDark(prev => !prev)
  }

  return { isDark, toggle }
}
