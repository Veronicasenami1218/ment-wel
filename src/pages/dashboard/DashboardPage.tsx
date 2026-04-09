import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react'
import {
  BarChart3, BookOpen, MessageCircle, Heart,
  TrendingUp, Lightbulb, Calendar, Activity
} from 'lucide-react'

const WELLNESS_TIPS = [
  'Take 5 deep breaths when you feel overwhelmed. It activates your parasympathetic nervous system.',
  'A 10-minute walk outside can significantly improve your mood and reduce anxiety.',
  'Writing down 3 things you are grateful for each day rewires your brain toward positivity.',
  'Staying hydrated improves concentration and reduces feelings of fatigue.',
  'Reaching out to a friend today — even a short message — strengthens your support network.',
  'Quality sleep is one of the most powerful tools for mental health. Aim for 7-9 hours.',
  'It is okay to say no. Setting boundaries is an act of self-respect.',
]

const todaysTip = WELLNESS_TIPS[new Date().getDay() % WELLNESS_TIPS.length]

export default function DashboardPage() {
  const { user: credentialUser } = useAuth()
  const { isSignedIn } = useClerkAuth()
  const { user: clerkUser } = useUser()

  const firstName = isSignedIn
    ? clerkUser?.firstName
    : credentialUser?.firstName

  const quickActions = [
    { label: 'Take Assessment', icon: BarChart3, to: '/assessments', color: 'from-sky-500 to-blue-600' },
    { label: 'Browse Resources', icon: BookOpen, to: '/resources', color: 'from-purple-500 to-fuchsia-600' },
    { label: 'Talk to Counselor', icon: MessageCircle, to: '/chat', color: 'from-emerald-500 to-teal-600' },
    { label: 'Log Mood', icon: Heart, to: '/mood', color: 'from-pink-500 to-rose-600' },
  ]

  const stats = [
    { label: 'Last Assessment', value: 'N/A', icon: BarChart3, sub: 'No assessments yet' },
    { label: 'Mood Streak', value: '0 days', icon: TrendingUp, sub: 'Start logging today' },
    { label: 'Saved Resources', value: '0', icon: BookOpen, sub: 'Browse the library' },
    { label: 'Sessions Booked', value: '0', icon: Calendar, sub: 'Book your first session' },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">
            Welcome back{firstName ? `, ${firstName}` : ''}! 👋
          </h1>
          <p className="text-neutral-500 mt-1">Here's an overview of your mental wellness journey.</p>
        </div>

        {/* Wellness Tip */}
        <div className="bg-gradient-to-r from-sky-500 to-fuchsia-600 rounded-2xl p-6 mb-8 text-white flex gap-4 items-start">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/80 mb-1">Wellness Tip of the Day</p>
            <p className="text-white font-medium leading-relaxed">{todaysTip}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-neutral-500">{stat.label}</span>
                <stat.icon className="w-4 h-4 text-neutral-400" />
              </div>
              <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
              <p className="text-xs text-neutral-400 mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-sky-500" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className={`bg-gradient-to-br ${action.color} rounded-2xl p-5 text-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col gap-3`}
              >
                <action.icon className="w-6 h-6" />
                <span className="font-semibold text-sm">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity placeholder */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
          <h2 className="text-lg font-semibold text-neutral-800 mb-4">Recent Activity</h2>
          <div className="flex flex-col items-center justify-center py-10 text-center text-neutral-400">
            <Activity className="w-10 h-10 mb-3 opacity-30" />
            <p className="font-medium">No activity yet</p>
            <p className="text-sm mt-1">Complete an assessment or log your mood to get started.</p>
          </div>
        </div>

      </div>
    </div>
  )
}
