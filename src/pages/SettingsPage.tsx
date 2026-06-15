import { useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Bell, Shield, Globe, Trash2 } from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const { isDark, toggle } = useDarkMode()
  const [notifications, setNotifications] = useState({
    wellness: true,
    reminders: true,
    updates: false,
    marketing: false,
  })
  const [privacy, setPrivacy] = useState({
    anonymous: false,
    shareData: false,
  })

  const handleNotifChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
    toast.success('Preference saved')
  }

  const handlePrivacyChange = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }))
    toast.success('Preference saved')
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-24 pb-16 transition-colors">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8">Settings</h1>

          {/* Appearance */}
          <section className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-700 mb-4">
            <h2 className="text-lg font-bold text-neutral-800 dark:text-white mb-4 flex items-center gap-2">
              {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />} Appearance
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-neutral-900 dark:text-white text-sm">Dark Mode</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Switch between light and dark theme</p>
              </div>
              <button
                onClick={toggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDark ? 'bg-violet-600' : 'bg-neutral-200'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${isDark ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-700 mb-4">
            <h2 className="text-lg font-bold text-neutral-800 dark:text-white mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" /> Notifications
            </h2>
            <div className="space-y-4">
              {[
                { key: 'wellness' as const, label: 'Wellness Tips', desc: 'Daily mental health tips and reminders' },
                { key: 'reminders' as const, label: 'Mood Check-in Reminders', desc: 'Daily reminders to log your mood' },
                { key: 'updates' as const, label: 'Platform Updates', desc: 'New features and improvements' },
                { key: 'marketing' as const, label: 'Promotional Emails', desc: 'Offers and announcements' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white text-sm">{item.label}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handleNotifChange(item.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications[item.key] ? 'bg-sky-500' : 'bg-neutral-200 dark:bg-neutral-600'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${notifications[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Privacy */}
          <section className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-700 mb-4">
            <h2 className="text-lg font-bold text-neutral-800 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Privacy
            </h2>
            <div className="space-y-4">
              {[
                { key: 'anonymous' as const, label: 'Anonymous Mode', desc: 'Hide your real name from counselors in chat sessions' },
                { key: 'shareData' as const, label: 'Share Analytics Data', desc: 'Help improve MentWel by sharing anonymised usage data' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white text-sm">{item.label}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handlePrivacyChange(item.key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${privacy[item.key] ? 'bg-sky-500' : 'bg-neutral-200 dark:bg-neutral-600'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${privacy[item.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Language */}
          <section className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-700 mb-4">
            <h2 className="text-lg font-bold text-neutral-800 dark:text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" /> Language & Region
            </h2>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Language</label>
              <select className="w-full px-4 py-2.5 border-2 border-neutral-200 dark:border-neutral-600 rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:border-sky-500 transition-all text-sm">
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="yo">Yoruba</option>
                <option value="ig">Igbo</option>
                <option value="ha">Hausa</option>
              </select>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-red-100 dark:border-red-900/30">
            <h2 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
              <Trash2 className="w-5 h-5" /> Danger Zone
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
              Deactivating your account will remove your access to MentWel and delete your data after 30 days.
            </p>
            <button
              onClick={() => toast.error('Account deactivation requires confirmation. Please contact support@mentwel.com')}
              className="px-5 py-2.5 border-2 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
            >
              Deactivate Account
            </button>
          </section>
        </motion.div>
      </div>
    </div>
  )
}
