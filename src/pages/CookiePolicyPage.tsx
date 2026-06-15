import { motion } from 'framer-motion'

const COOKIES = [
  { name: 'Authentication', type: 'Essential', purpose: 'Keeps you logged in during your session. Without this cookie, you would be logged out every time you navigate to a new page.', canDisable: false },
  { name: 'Theme Preference', type: 'Functional', purpose: 'Remembers whether you prefer dark or light mode so you don\'t have to reset it every visit.', canDisable: false },
  { name: 'Bookmarks', type: 'Functional', purpose: 'Stores your bookmarked resources locally so they persist between sessions.', canDisable: false },
  { name: 'Analytics', type: 'Analytics', purpose: 'Helps us understand how users interact with MentWel so we can improve the platform. All data is anonymised.', canDisable: true },
]

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 transition-colors">
      <section className="bg-gradient-to-br from-amber-600 to-orange-600 py-16 px-4 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-white/85">Last updated: January 2025</p>
        </motion.div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">What Are Cookies?</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Cookies are small text files stored on your device when you visit a website. They help websites remember information about your visit, making it more useful and easier to use again.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">Cookies We Use</h2>
            <div className="space-y-4">
              {COOKIES.map((cookie, i) => (
                <div key={cookie.name} className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-neutral-100 dark:border-neutral-700">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-neutral-900 dark:text-white">{cookie.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cookie.type === 'Essential' ? 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400' : cookie.type === 'Functional' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                        {cookie.type}
                      </span>
                      {!cookie.canDisable && <span className="text-xs text-neutral-400">Required</span>}
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{cookie.purpose}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">Managing Cookies</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              You can control and delete cookies through your browser settings. Note that disabling essential cookies will affect your ability to use MentWel. For instructions on managing cookies in your browser, visit your browser's help documentation.
            </p>
          </motion.div>

          <div className="p-5 bg-neutral-100 dark:bg-neutral-700 rounded-2xl text-sm text-neutral-600 dark:text-neutral-300">
            Questions? Contact us at <a href="mailto:privacy@mentwel.com" className="text-sky-500 hover:underline">privacy@mentwel.com</a>
          </div>
        </div>
      </section>
    </div>
  )
}
