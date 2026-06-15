import { motion } from 'framer-motion'
import { Shield, UserCheck, Download, Trash2, Eye, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'

const RIGHTS = [
  { icon: Eye, title: 'Right to Access', desc: 'You can request a copy of all personal data we hold about you at any time. We will provide this within 30 days.' },
  { icon: UserCheck, title: 'Right to Rectification', desc: 'If any of your personal data is inaccurate or incomplete, you have the right to have it corrected.' },
  { icon: Trash2, title: 'Right to Erasure', desc: 'You can request deletion of your personal data. We will comply unless we have a legal obligation to retain it.' },
  { icon: Lock, title: 'Right to Restrict Processing', desc: 'You can ask us to stop processing your data in certain circumstances while still retaining it.' },
  { icon: Download, title: 'Right to Data Portability', desc: 'You can request your data in a structured, machine-readable format to transfer to another service.' },
  { icon: Shield, title: 'Right to Object', desc: 'You can object to processing of your data for marketing or profiling purposes at any time.' },
]

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 transition-colors">
      <section className="bg-gradient-to-br from-blue-700 to-indigo-800 py-16 px-4 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <Shield className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl font-bold mb-4">GDPR Compliance</h1>
          <p className="text-xl text-white/85">Your data rights and how we protect them.</p>
        </motion.div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-10">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Our Commitment</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              MentWel is committed to protecting your personal data and complying with the General Data Protection Regulation (GDPR). We process your data lawfully, fairly, and transparently, collecting only what is necessary and keeping it secure.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Your Rights Under GDPR</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {RIGHTS.map((right, i) => (
                <motion.div
                  key={right.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-neutral-100 dark:border-neutral-700 shadow-sm"
                >
                  <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-3">
                    <right.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-neutral-900 dark:text-white mb-2 text-sm">{right.title}</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{right.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">How to Exercise Your Rights</h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
              To exercise any of your GDPR rights, you can:
            </p>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm">
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold shrink-0">•</span> Email our Data Protection Officer at <a href="mailto:dpo@mentwel.com" className="text-sky-500 hover:underline">dpo@mentwel.com</a></li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold shrink-0">•</span> Use the account settings in your profile to access or delete your data</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 font-bold shrink-0">•</span> <Link to="/contact" className="text-sky-500 hover:underline">Contact us</Link> through our support form</li>
            </ul>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">We will respond to all requests within 30 days.</p>
          </motion.div>

          <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 text-sm text-blue-700 dark:text-blue-300">
            Data Protection Officer: <a href="mailto:dpo@mentwel.com" className="underline">dpo@mentwel.com</a>
          </div>
        </div>
      </section>
    </div>
  )
}
