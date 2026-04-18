import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../hooks/useAuth'
import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react'
import {
  BarChart3, BookOpen, MessageCircle, Heart,
  TrendingUp, Lightbulb, Calendar, ArrowRight,
  Smile, Brain, Users, Sparkles
} from 'lucide-react'

const WELLNESS_TIPS = [
  'Take 5 deep breaths when you feel overwhelmed — it activates your parasympathetic nervous system.',
  'A 10-minute walk outside can significantly improve your mood and reduce anxiety.',
  'Writing down 3 things you are grateful for each day rewires your brain toward positivity.',
  'Staying hydrated improves concentration and reduces feelings of fatigue.',
  'Reaching out to a friend today — even a short message — strengthens your support network.',
  'Quality sleep is one of the most powerful tools for mental health. Aim for 7–9 hours.',
  'It is okay to say no. Setting boundaries is an act of self-respect.',
]

const todaysTip = WELLNESS_TIPS[new Date().getDay() % WELLNESS_TIPS.length]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
}

export default function DashboardPage() {
  const { user: credentialUser } = useAuth()
  const { isSignedIn } = useClerkAuth()
  const { user: clerkUser } = useUser()

  const firstName = isSignedIn ? clerkUser?.firstName : credentialUser?.firstName
  const avatarLetter = (firstName?.[0] || 'U').toUpperCase()

  const stats = [
    {
      label: 'Last Assessment',
      value: 'N/A',
      sub: 'No assessments yet',
      icon: Brain,
      gradient: 'from-sky-400 to-blue-500',
      bg: 'bg-sky-50',
      text: 'text-sky-600',
    },
    {
      label: 'Mood Streak',
      value: '0 days',
      sub: 'Start logging today',
      icon: TrendingUp,
      gradient: 'from-pink-400 to-rose-500',
      bg: 'bg-pink-50',
      text: 'text-pink-600',
    },
    {
      label: 'Saved Resources',
      value: '0',
      sub: 'Browse the library',
      icon: BookOpen,
      gradient: 'from-purple-400 to-fuchsia-500',
      bg: 'bg-purple-50',
      text: 'text-purple-600',
    },
    {
      label: 'Sessions Booked',
      value: '0',
      sub: 'Book your first session',
      icon: Calendar,
      gradient: 'from-emerald-400 to-teal-500',
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
    },
  ]

  const quickActions = [
    {
      label: 'Take Assessment',
      desc: 'Understand your mental health',
      icon: BarChart3,
      to: '/assessments',
      gradient: 'from-sky-500 to-blue-600',
    },
    {
      label: 'Browse Resources',
      desc: 'Articles, videos & guides',
      icon: BookOpen,
      to: '/resources',
      gradient: 'from-purple-500 to-fuchsia-600',
    },
    {
      label: 'Talk to Counselor',
      desc: 'Chat with a professional',
      icon: MessageCircle,
      to: '/chat',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      label: 'Log Your Mood',
      desc: 'Track how you feel today',
      icon: Heart,
      to: '/mood',
      gradient: 'from-pink-500 to-rose-600',
    },
  ]

  const features = [
    { icon: Smile, label: 'Mood Tracking', desc: 'Log daily moods and spot patterns', to: '/mood' },
    { icon: Brain, label: 'Self-Assessment', desc: 'Evidence-based mental health checks', to: '/assessments' },
    { icon: Users, label: 'Find Therapists', desc: 'Connect with licensed professionals', to: '/therapists' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-8 mb-8 text-white"
        >
          {/* decorative blobs */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-white/10 rounded-full blur-2xl" />

          <div className="relative z-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-2xl font-bold shadow-lg">
                {avatarLetter}
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium mb-0.5">Good {getTimeOfDay()},</p>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {firstName ? firstName : 'Welcome back'} 👋
                </h1>
                <p className="text-white/80 text-sm mt-1">
                  Your mental wellness journey continues today.
                </p>
              </div>
            </div>
            <Link
              to="/mood"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl text-sm font-semibold transition-all"
            >
              <Heart className="w-4 h-4" />
              Log Today's Mood
            </Link>
          </div>
        </motion.div>

        {/* Wellness Tip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex gap-4 items-start bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8"
        >
          <div className="w-9 h-9 bg-amber-400 rounded-xl flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Wellness Tip of the Day
            </p>
            <p className="text-amber-900 text-sm leading-relaxed">{todaysTip}</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className={`${stat.bg} rounded-2xl p-5 border border-white shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-3 shadow`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <p className={`text-2xl font-bold ${stat.text}`}>{stat.value}</p>
              <p className="text-xs font-medium text-neutral-600 mt-0.5">{stat.label}</p>
              <p className="text-xs text-neutral-400 mt-0.5">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-lg font-bold text-neutral-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, i) => (
              <motion.div key={action.label} custom={i} initial="hidden" animate="show" variants={fadeUp}>
                <Link
                  to={action.to}
                  className={`group bg-gradient-to-br ${action.gradient} rounded-2xl p-5 text-white shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200 flex flex-col gap-3 h-full`}
                >
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <action.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{action.label}</p>
                    <p className="text-white/70 text-xs mt-0.5">{action.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all mt-auto" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Row: Features highlight + Activity */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Platform Features */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100"
          >
            <h2 className="text-lg font-bold text-neutral-800 mb-4">Explore MentWel</h2>
            <div className="space-y-3">
              {features.map((f) => (
                <Link
                  key={f.label}
                  to={f.to}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                    <f.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-800">{f.label}</p>
                    <p className="text-xs text-neutral-400 truncate">{f.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100"
          >
            <h2 className="text-lg font-bold text-neutral-800 mb-4">Recent Activity</h2>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7 text-violet-400" />
              </div>
              <p className="font-semibold text-neutral-700">Your journey starts here</p>
              <p className="text-sm text-neutral-400 mt-1 max-w-xs">
                Complete an assessment or log your mood to see your activity here.
              </p>
              <Link
                to="/mood"
                className="mt-4 px-5 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-sm font-medium rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                Log Your First Mood
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

function getTimeOfDay() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}
