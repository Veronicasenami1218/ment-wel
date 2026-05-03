import { motion } from 'framer-motion'
import { Users, MessageCircle, BarChart3, BookOpen, TrendingUp, TrendingDown, Activity } from 'lucide-react'

const stats = [
  { label: 'Total Users', value: '1,284', change: '+12%', up: true, icon: Users, color: 'from-sky-500 to-blue-600', bg: 'bg-sky-50', text: 'text-sky-600' },
  { label: 'Active Sessions', value: '47', change: '+8%', up: true, icon: MessageCircle, color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50', text: 'text-emerald-600' },
  { label: 'Assessments Taken', value: '3,891', change: '+23%', up: true, icon: BarChart3, color: 'from-purple-500 to-fuchsia-600', bg: 'bg-purple-50', text: 'text-purple-600' },
  { label: 'Resource Views', value: '18,420', change: '-3%', up: false, icon: BookOpen, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', text: 'text-amber-600' },
]

const recentUsers = [
  { name: 'Amara Osei', email: 'amara@example.com', role: 'User', status: 'Active', joined: '2 hours ago' },
  { name: 'Chidi Nwosu', email: 'chidi@example.com', role: 'User', status: 'Active', joined: '5 hours ago' },
  { name: 'Fatima Hassan', email: 'fatima@example.com', role: 'Counselor', status: 'Active', joined: '1 day ago' },
  { name: 'Tunde Adeyemi', email: 'tunde@example.com', role: 'User', status: 'Inactive', joined: '2 days ago' },
  { name: 'Ngozi Eze', email: 'ngozi@example.com', role: 'User', status: 'Active', joined: '3 days ago' },
]

// Simple bar chart data (last 7 days user signups)
const chartData = [
  { day: 'Mon', value: 12 },
  { day: 'Tue', value: 19 },
  { day: 'Wed', value: 8 },
  { day: 'Thu', value: 24 },
  { day: 'Fri', value: 31 },
  { day: 'Sat', value: 17 },
  { day: 'Sun', value: 22 },
]
const maxValue = Math.max(...chartData.map(d => d.value))

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4 },
})

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Overview</h1>
        <p className="text-neutral-500 text-sm mt-1">Welcome back. Here's what's happening on MentWel.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} {...fadeUp(i * 0.07)}
            className={`${stat.bg} rounded-2xl p-5 border border-white shadow-sm`}>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <p className={`text-2xl font-bold ${stat.text}`}>{stat.value}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{stat.label}</p>
            <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
              {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {stat.change} this week
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <motion.div {...fadeUp(0.3)} className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
          <h2 className="text-lg font-bold text-neutral-800 mb-1">New Users</h2>
          <p className="text-sm text-neutral-400 mb-6">Daily signups — last 7 days</p>
          <div className="flex items-end gap-3 h-32">
            {chartData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-neutral-600">{d.value}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.value / maxValue) * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="w-full bg-gradient-to-t from-violet-600 to-fuchsia-500 rounded-t-lg min-h-[4px]"
                />
                <span className="text-xs text-neutral-400">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div {...fadeUp(0.35)} className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
          <h2 className="text-lg font-bold text-neutral-800 mb-4">Platform Health</h2>
          <div className="space-y-4">
            {[
              { label: 'Server Uptime', value: '99.9%', color: 'bg-green-500', width: '99%' },
              { label: 'Assessment Completion Rate', value: '78%', color: 'bg-sky-500', width: '78%' },
              { label: 'User Satisfaction', value: '94%', color: 'bg-violet-500', width: '94%' },
              { label: 'Active Counselors', value: '62%', color: 'bg-amber-500', width: '62%' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-neutral-600">{item.label}</span>
                  <span className="font-semibold text-neutral-800">{item.value}</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: item.width }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Users */}
      <motion.div {...fadeUp(0.4)} className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <h2 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-violet-500" /> Recent Users
          </h2>
          <a href="/admin/users" className="text-sm text-violet-600 hover:underline">View all →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wide">
              <tr>
                {['Name', 'Email', 'Role', 'Status', 'Joined'].map(h => (
                  <th key={h} className="px-6 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {recentUsers.map((user) => (
                <tr key={user.email} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-3 font-medium text-neutral-900">{user.name}</td>
                  <td className="px-6 py-3 text-neutral-500">{user.email}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.role === 'Counselor' ? 'bg-purple-50 text-purple-600' : 'bg-sky-50 text-sky-600'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-neutral-100 text-neutral-500'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-neutral-400">{user.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
