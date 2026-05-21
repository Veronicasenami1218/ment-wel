import { useEffect, useState } from 'react'
import { emitStatsChange, STATS_KEYS } from './useUserStats'

const STORAGE_KEY = STATS_KEYS.bookmarks

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })

  // Persist + notify the dashboard (and any other useUserStats listener) on
  // every change. Initial mount also re-writes the key, which is a no-op.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
    emitStatsChange()
  }, [bookmarks])

  // Stay in sync if another tab toggles a bookmark
  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      try {
        setBookmarks(JSON.parse(e.newValue || '[]'))
      } catch {
        /* ignore */
      }
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  const toggleBookmark = (id: string) => {
    setBookmarks(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    )
  }

  const isBookmarked = (id: string) => bookmarks.includes(id)

  return { bookmarks, toggleBookmark, isBookmarked }
}
