import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, Users, BookOpen } from 'lucide-react'

const monthlyUsers = [
  { month: 'Jan', users: 45 }, { month: 'Feb', users: 78 }, { month: 'Mar', users: 120 },
  { month: 'Apr', users: 95 }, { month: 'May', users: 160 }, { month: 'Jun', users: 210 },
  { month: 'Jul', users: 185 }, { month: 'Aug', users: 240 }, { month: 'Sep', users: 290 },
  { month: 'Oct', users: 320 }, { month: 'Nov', users: 280 }, { month: 'Dec', users: 350 },
]
const maxUsers = Math.max(...monthlyUsers.map(d => d.users))

const resourcePopularity = [
  { title: '10 Self-Care Practices', views: 5200, category: 'Self-Care' },
  { title: 'Beginner\'s Guide to Mindfulness', views: 4100, category: 'Mindfulness' },
  { title: '5 Techniques to Manage Anxiety', views: 3420, category: 'Anxiety' },
  { title: 'Overcoming Negative Self-Talk', views: 3100, category: 'Self-Care' },
  { title: 'Understanding Depression', views: 2890, category: 'Depression' },
]
const maxViews = Math.max(...resourcePopularity.map(r => r.views))

const assessmentStats = [
  { name: 'PHQ-9 Depression', taken: 1240, color: 'bg-sky-500' },
  { name: 'GAD-7 Anxiety', taken: 980, color: 'bg-purple-500' },
  { name: 'Perceived Stress', taken: 760, color: 'bg-amber-500' },
]

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Analytics</h1>
        <p className="text-neutral-500 text-sm mt-1">Platform usage and engagement metrics.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '1,284', icon: Users, color: 'from-sky-500 to-blue-600' },
          { label: 'Assessments', value: '2,980', icon: BarChart3, color: 'from-purple-500 to-fuchsia-600' },
          { label: 'Resource Views', value: '18,420', icon: BookOpen, color: 'from-amber-500 to-orange-500' },
          { label: 'Growth Rate', value: '+23%', icon: TrendingUp, color: 'from-emerald-500 to-teal-600' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 shadow`}>
              <s.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-neutral-900">{s.value}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
          <h2 className="text-lg font-bold text-neutral-800 mb-1">User Growth</h2>
          <p className="text-sm text-neutral-400 mb-6">Monthly new registrations — 2025</p>
          <div className="flex items-end gap-2 h-36">
            {monthlyUsers.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.users / maxUsers) * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="w-full bg-gradient-to-t from-violet-600 to-fuchsia-400 rounded-t-md min-h-[4px]"
                />
                <span className="text-xs text-neutral-400">{d.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Assessment Usage */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
          <h2 className="text-lg font-bold text-neutral-800 mb-4">Assessment Usage</h2>
          <div className="space-y-4">
            {assessmentStats.map(a => (
              <div key={a.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">{a.name}</span>
                  <span className="font-semibold text-neutral-800">{a.taken.toLocaleString()}</span>
                </div>
                <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(a.taken / 1240) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className={`h-full rounded-full ${a.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Resource Popularity */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
        <h2 className="text-lg font-bold text-neutral-800 mb-4">Most Viewed Resources</h2>
        <div className="space-y-3">
          {resourcePopularity.map((r, i) => (
            <div key={r.title} className="flex items-center gap-4">
              <span className="text-sm font-bold text-neutral-400 w-5 shrink-0">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-800 truncate">{r.title}</p>
                <div className="h-1.5 bg-neutral-100 rounded-full mt-1 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(r.views / maxViews) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.05 }}
                    className="h-full bg-gradient-to-r from-sky-500 to-fuchsia-500 rounded-full"
                  />
                </div>
              </div>
              <span className="text-sm font-semibold text-neutral-600 shrink-0">{r.views.toLocaleString()}</span>
              <span className="text-xs text-neutral-400 shrink-0">{r.category}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
