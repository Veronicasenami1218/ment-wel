import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import toast from 'react-hot-toast'
import { format, subDays, parseISO, isSameDay } from 'date-fns'
import { CalendarDays, BarChart2, Save, Loader2 } from 'lucide-react'
import moodService, { MoodEntry } from '../../services/mood.service'

const MOODS = [
  { value: 1, emoji: '😢', label: 'Terrible', color: 'bg-red-100 border-red-400 text-red-600' },
  { value: 2, emoji: '😟', label: 'Bad',      color: 'bg-orange-100 border-orange-400 text-orange-600' },
  { value: 3, emoji: '😐', label: 'Okay',     color: 'bg-yellow-100 border-yellow-400 text-yellow-600' },
  { value: 4, emoji: '🙂', label: 'Good',     color: 'bg-lime-100 border-lime-400 text-lime-600' },
  { value: 5, emoji: '😁', label: 'Great',    color: 'bg-green-100 border-green-400 text-green-600' },
]

const MOOD_BAR_COLORS = ['', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-lime-400', 'bg-green-400']
const MOOD_CALENDAR_COLORS = ['', 'bg-red-300', 'bg-orange-300', 'bg-yellow-300', 'bg-lime-300', 'bg-green-300']

type Tab = 'log' | 'chart' | 'calendar'

export default function MoodTrackingPage() {
  const [activeTab, setActiveTab] = useState<Tab>('log')
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [note, setNote] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isSaving, setIsSaving] = useState(false)
  const [logs, setLogs] = useState<MoodEntry[]>([])
  const [loadingLogs, setLoadingLogs] = useState(false)

  // Fetch logs when switching to chart or calendar
  useEffect(() => {
    if (activeTab !== 'log') fetchLogs()
  }, [activeTab])

  const fetchLogs = async () => {
    setLoadingLogs(true)
    try {
      const data = await moodService.getMoodLogs(30)
      setLogs(data)
    } catch {
      // silently fail — backend may not be connected yet
      setLogs([])
    } finally {
      setLoadingLogs(false)
    }
  }

  const handleSave = async () => {
    if (!selectedMood) {
      toast.error('Please select a mood first')
      return
    }
    setIsSaving(true)
    try {
      await moodService.saveMood({
        mood: selectedMood,
        note: note.trim(),
        date: format(selectedDate, 'yyyy-MM-dd'),
      })
      toast.success('Mood logged successfully!')
      setSelectedMood(null)
      setNote('')
      setSelectedDate(new Date())
    } catch {
      toast.error('Failed to save mood. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  // Build last 7 days for chart
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i)
    const entry = logs.find((l) => isSameDay(parseISO(l.date), date))
    return { date, mood: entry?.mood ?? null, label: format(date, 'EEE') }
  })

  // Build calendar grid for current month
  const today = new Date()
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  const startOffset = firstDay.getDay() // 0=Sun

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth(), i + 1)
    const entry = logs.find((l) => isSameDay(parseISO(l.date), date))
    return { day: i + 1, mood: entry?.mood ?? null }
  })

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'log',      label: 'Log Mood',   icon: <Save className="w-4 h-4" /> },
    { key: 'chart',    label: '7-Day Chart', icon: <BarChart2 className="w-4 h-4" /> },
    { key: 'calendar', label: 'Calendar',   icon: <CalendarDays className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Mood Tracking</h1>
        <p className="text-neutral-500 mb-8">Track how you feel each day and spot patterns over time.</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white rounded-xl p-1 shadow-sm border border-neutral-100">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white shadow'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* LOG TAB */}
        {activeTab === 'log' && (
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 space-y-6">
            {/* Mood selector */}
            <div>
              <p className="text-sm font-medium text-neutral-700 mb-3">How are you feeling?</p>
              <div className="flex justify-between gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setSelectedMood(m.value)}
                    className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl border-2 transition-all ${
                      selectedMood === m.value
                        ? m.color + ' scale-105 shadow-md'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <span className="text-2xl">{m.emoji}</span>
                    <span className="text-xs font-medium">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Date picker */}
            <div>
              <p className="text-sm font-medium text-neutral-700 mb-2">Date</p>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => date && setSelectedDate(date)}
                maxDate={new Date()}
                dateFormat="MMMM d, yyyy"
                className="w-full px-4 py-2.5 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-sky-500 transition-all text-sm"
              />
            </div>

            {/* Notes */}
            <div>
              <p className="text-sm font-medium text-neutral-700 mb-2">Notes <span className="text-neutral-400 font-normal">(optional)</span></p>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                maxLength={300}
                placeholder="What's on your mind today?"
                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-sky-500 transition-all text-sm resize-none"
              />
              <p className="text-xs text-neutral-400 text-right mt-1">{note.length}/300</p>
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving || !selectedMood}
              className="w-full py-3 bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white rounded-xl font-medium shadow hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isSaving ? 'Saving...' : 'Save Mood'}
            </button>
          </div>
        )}

        {/* CHART TAB */}
        {activeTab === 'chart' && (
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
            <h2 className="text-lg font-semibold text-neutral-800 mb-6">Last 7 Days</h2>
            {loadingLogs ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
              </div>
            ) : (
              <>
                <div className="flex items-end justify-between gap-3 h-40 mb-3">
                  {last7Days.map(({ mood }, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-lg">{mood ? MOODS[mood - 1].emoji : ''}</span>
                      <div className="w-full flex items-end justify-center" style={{ height: '80px' }}>
                        <div
                          className={`w-full rounded-t-lg transition-all ${mood ? MOOD_BAR_COLORS[mood] : 'bg-neutral-100'}`}
                          style={{ height: mood ? `${(mood / 5) * 80}px` : '8px' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between gap-3">
                  {last7Days.map((day, i) => (
                    <div key={i} className="flex-1 text-center text-xs text-neutral-400">{day.label}</div>
                  ))}
                </div>

                {/* Insight */}
                <div className="mt-6 p-4 bg-sky-50 rounded-xl text-sm text-sky-700">
                  {logs.length === 0
                    ? 'No mood data yet. Start logging to see your trends here.'
                    : (() => {
                        const avg = last7Days.filter(d => d.mood).reduce((s, d) => s + (d.mood ?? 0), 0) /
                          (last7Days.filter(d => d.mood).length || 1)
                        if (avg >= 4) return '😊 You\'ve been feeling great this week. Keep it up!'
                        if (avg >= 3) return '🙂 Your mood has been fairly stable this week.'
                        return '💙 It looks like this week has been tough. Consider talking to a counselor.'
                      })()
                  }
                </div>
              </>
            )}
          </div>
        )}

        {/* CALENDAR TAB */}
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
            <h2 className="text-lg font-semibold text-neutral-800 mb-1">
              {format(today, 'MMMM yyyy')}
            </h2>
            <p className="text-sm text-neutral-400 mb-6">Color shows your mood for each day</p>

            {loadingLogs ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
              </div>
            ) : (
              <>
                {/* Day headers */}
                <div className="grid grid-cols-7 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className="text-center text-xs font-medium text-neutral-400 py-1">{d}</div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Empty cells for offset */}
                  {Array.from({ length: startOffset }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {calendarDays.map(({ day, mood }) => (
                    <div
                      key={day}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs font-medium transition-all ${
                        mood
                          ? MOOD_CALENDAR_COLORS[mood] + ' text-neutral-700'
                          : 'bg-neutral-100 text-neutral-400'
                      } ${day === today.getDate() ? 'ring-2 ring-sky-500' : ''}`}
                    >
                      <span>{day}</span>
                      {mood && <span className="text-base leading-none">{MOODS[mood - 1].emoji}</span>}
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-3 mt-6 justify-center">
                  {MOODS.map((m) => (
                    <div key={m.value} className="flex items-center gap-1.5 text-xs text-neutral-600">
                      <div className={`w-3 h-3 rounded-full ${MOOD_CALENDAR_COLORS[m.value]}`} />
                      {m.emoji} {m.label}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
