import { useCallback, useEffect, useState } from 'react'
import { format, parseISO, subDays, formatDistanceToNow } from 'date-fns'
import { STATIC_ASSESSMENTS } from '../data/assessments'
import type { AssessmentResult } from '../services/assessment.service'

/**
 * Centralized client-side stats for the Dashboard.
 *
 * Reads from the same localStorage keys that the various feature pages write
 * to, so anything the user does (logging a mood, booking a session, bookmarking
 * a resource, completing an assessment) is reflected on the Dashboard
 * immediately AND survives a full page reload.
 *
 *  Sources:
 *    - mentwel_moods         : MoodEntry[]            (mood log)
 *    - mentwel_bookmarks     : string[]               (resource IDs)
 *    - mentwel_sessions      : BookedSession[]        (sessions booked)
 *    - mentwel_assessments   : AssessmentResult[]     (assessment history)
 *
 * Components subscribed via this hook update when any of these keys change in
 * the same OR another tab, because every writer also dispatches a custom
 * `mentwel:stats` event after `localStorage.setItem`.
 */

// ---------- shared types ----------
export interface StoredMoodEntry {
  mood: number              // 1-5
  note?: string
  date: string              // 'YYYY-MM-DD'
  createdAt: string         // ISO
}

export interface BookedSession {
  id: string
  therapistId: string
  therapistName: string
  sessionType: 'text' | 'voice' | 'video'
  sessionTypeLabel: string
  duration: number          // minutes
  date: string              // 'YYYY-MM-DD'
  time: string              // '9:00 AM'
  notes?: string
  bookedAt: string          // ISO
  status: 'upcoming' | 'completed' | 'cancelled'
}

// ---------- storage keys ----------
export const STATS_KEYS = {
  moods: 'mentwel_moods',
  bookmarks: 'mentwel_bookmarks',
  sessions: 'mentwel_sessions',
  assessments: 'mentwel_assessments',
} as const

// Custom event used to notify same-tab listeners that one of the stats keys
// changed (the native `storage` event only fires in OTHER tabs).
export const STATS_EVENT = 'mentwel:stats'
export const emitStatsChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(STATS_EVENT))
  }
}

// ---------- safe readers ----------
function safeRead<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function readMoods(): StoredMoodEntry[] {
  return safeRead<StoredMoodEntry[]>(STATS_KEYS.moods, [])
}
export function readBookmarks(): string[] {
  return safeRead<string[]>(STATS_KEYS.bookmarks, [])
}
export function readSessions(): BookedSession[] {
  return safeRead<BookedSession[]>(STATS_KEYS.sessions, [])
}
export function readAssessments(): AssessmentResult[] {
  return safeRead<AssessmentResult[]>(STATS_KEYS.assessments, [])
}

// ---------- writers (use these from feature pages) ----------
export function saveMoodEntry(entry: Omit<StoredMoodEntry, 'createdAt'>) {
  const existing = readMoods()
  // De-duplicate per date: latest mood for the day wins
  const filtered = existing.filter(e => e.date !== entry.date)
  filtered.push({ ...entry, createdAt: new Date().toISOString() })
  localStorage.setItem(STATS_KEYS.moods, JSON.stringify(filtered))
  emitStatsChange()
}

export function saveBookedSession(session: BookedSession) {
  const existing = readSessions()
  existing.unshift(session)
  localStorage.setItem(STATS_KEYS.sessions, JSON.stringify(existing))
  emitStatsChange()
}

export function saveAssessmentResult(result: AssessmentResult) {
  const existing = readAssessments()
  existing.unshift(result)
  localStorage.setItem(STATS_KEYS.assessments, JSON.stringify(existing))
  emitStatsChange()
}

// ---------- derivations ----------
/**
 * Consecutive-day mood logging streak. Counts back from today (or yesterday
 * if today hasn't been logged yet) until the first gap.
 */
export function computeMoodStreak(moods: StoredMoodEntry[]): number {
  if (!moods.length) return 0
  const dateSet = new Set(moods.map(m => m.date))
  let streak = 0
  let cursor = new Date()
  if (!dateSet.has(format(cursor, 'yyyy-MM-dd'))) {
    cursor = subDays(cursor, 1)
  }
  while (dateSet.has(format(cursor, 'yyyy-MM-dd'))) {
    streak++
    cursor = subDays(cursor, 1)
  }
  return streak
}

/** Average mood over the last N days (defaults to 7). */
export function computeAvgMood(moods: StoredMoodEntry[], days = 7): number | null {
  if (!moods.length) return null
  const cutoff = subDays(new Date(), days)
  const recent = moods.filter(m => parseISO(m.date) >= cutoff)
  if (!recent.length) return null
  const sum = recent.reduce((s, m) => s + m.mood, 0)
  return Math.round((sum / recent.length) * 10) / 10
}

// ---------- the hook ----------
export interface UserStats {
  moodEntries: StoredMoodEntry[]
  moodStreak: number
  avgMood7d: number | null
  totalMoodLogs: number

  bookmarks: string[]
  bookmarksCount: number

  sessions: BookedSession[]
  upcomingSessions: BookedSession[]
  sessionsCount: number

  assessments: AssessmentResult[]
  assessmentsCount: number
  lastAssessment: AssessmentResult | null
}

export interface ActivityItem {
  id: string
  type: 'mood' | 'assessment' | 'session' | 'bookmark'
  title: string
  subtitle: string
  timestamp: string  // ISO
  relative: string   // "2 hours ago"
}

function readAllStats(): UserStats {
  const moods = readMoods()
  const bookmarks = readBookmarks()
  const sessions = readSessions()
  const assessments = readAssessments()
  const sortedAssessments = [...assessments].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  )
  return {
    moodEntries: moods,
    moodStreak: computeMoodStreak(moods),
    avgMood7d: computeAvgMood(moods, 7),
    totalMoodLogs: moods.length,

    bookmarks,
    bookmarksCount: bookmarks.length,

    sessions,
    upcomingSessions: sessions.filter(s => s.status === 'upcoming'),
    sessionsCount: sessions.length,

    assessments: sortedAssessments,
    assessmentsCount: assessments.length,
    lastAssessment: sortedAssessments[0] ?? null,
  }
}

export function useUserStats() {
  const [stats, setStats] = useState<UserStats>(() => readAllStats())

  const refresh = useCallback(() => setStats(readAllStats()), [])

  useEffect(() => {
    const handler = () => refresh()
    // Same-tab updates (custom event)
    window.addEventListener(STATS_EVENT, handler)
    // Other-tab updates (native storage event)
    window.addEventListener('storage', handler)
    // Re-sync on tab focus too, in case storage was edited externally
    window.addEventListener('focus', handler)
    return () => {
      window.removeEventListener(STATS_EVENT, handler)
      window.removeEventListener('storage', handler)
      window.removeEventListener('focus', handler)
    }
  }, [refresh])

  return { ...stats, refresh }
}

/**
 * Build a unified "Recent Activity" feed from all stat sources, newest first.
 */
export function useRecentActivity(limit = 6): ActivityItem[] {
  const { moodEntries, sessions, assessments, bookmarks } = useUserStats()

  const items: ActivityItem[] = []

  moodEntries.forEach(m => {
    items.push({
      id: `mood-${m.createdAt}`,
      type: 'mood',
      title: 'Logged your mood',
      subtitle: `${moodLabel(m.mood)}${m.note ? ` — ${m.note.slice(0, 40)}${m.note.length > 40 ? '…' : ''}` : ''}`,
      timestamp: m.createdAt,
      relative: safeRelative(m.createdAt),
    })
  })

  sessions.forEach(s => {
    items.push({
      id: `session-${s.id}`,
      type: 'session',
      title: `Booked ${s.sessionTypeLabel}`,
      subtitle: `${s.therapistName} • ${s.date} at ${s.time}`,
      timestamp: s.bookedAt,
      relative: safeRelative(s.bookedAt),
    })
  })

  assessments.forEach(a => {
    items.push({
      id: `assess-${a.id}`,
      type: 'assessment',
      title: `Completed ${a.assessmentTitle}`,
      subtitle: `Score ${a.score}/${a.maxScore} • ${a.severity}`,
      timestamp: a.completedAt,
      relative: safeRelative(a.completedAt),
    })
  })

  // Bookmarks: we don't store per-bookmark timestamps, so surface only the
  // aggregate as a single "saved N resources" item if there are any.
  if (bookmarks.length > 0) {
    items.push({
      id: 'bookmarks-aggregate',
      type: 'bookmark',
      title: `Saved ${bookmarks.length} resource${bookmarks.length === 1 ? '' : 's'}`,
      subtitle: 'Browse them anytime from your bookmarks',
      timestamp: new Date(0).toISOString(),  // sort last
      relative: '',
    })
  }

  items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  return items.slice(0, limit)
}

function moodLabel(value: number): string {
  return ['', 'Terrible', 'Bad', 'Okay', 'Good', 'Great'][value] ?? `Mood ${value}`
}

function safeRelative(iso: string): string {
  try {
    return formatDistanceToNow(new Date(iso), { addSuffix: true })
  } catch {
    return ''
  }
}

/** Re-export so consumers don't need a separate import. */
export { STATIC_ASSESSMENTS }
