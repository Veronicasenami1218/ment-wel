import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronDown, ChevronUp, MessageCircle, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const FAQS = [
  { q: 'Is MentWel free to use?', a: 'Yes, MentWel\'s core features including mood tracking, self-assessments, resource library, and AI chat (Welly) are completely free. Therapist sessions may have associated costs depending on the therapist.' },
  { q: 'Is my data private and secure?', a: 'Absolutely. All your data is encrypted and stored securely. We never share your personal information with third parties without your explicit consent. You can use anonymous mode for chat sessions.' },
  { q: 'How do I take a self-assessment?', a: 'Log in to your account, navigate to Assessments in the top menu, and click Start on any of the available assessments. Each one takes 5-10 minutes to complete.' },
  { q: 'Can I talk to a real therapist?', a: 'Yes. Visit the Therapists section to browse our directory of licensed mental health professionals. You can view their profiles, specializations, and book sessions directly.' },
  { q: 'What is Welly?', a: 'Welly is our AI-powered mental wellness companion. It provides emotional support, coping strategies, and general mental health guidance. Welly is not a replacement for professional therapy.' },
  { q: 'How do I track my mood?', a: 'Click on Mood in the navigation bar. Select your mood using the emoji scale, optionally add a note, pick a date, and save. You can view your mood history as a chart or calendar.' },
  { q: 'What do I do in a crisis?', a: 'If you are in immediate danger, call Nigeria Emergency Services: 112. For mental health crisis support, call the Suicide Prevention Helpline: 0800-800-2000. MentWel also has a Crisis Support page with resources.' },
  { q: 'How do I reset my password?', a: 'On the login page, click "Forgot password?" and enter your email address. You will receive a password reset link within a few minutes.' },
]

export default function HelpCenterPage() {
  const [search, setSearch] = useState('')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const filtered = FAQS.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 transition-colors">
      <section className="bg-gradient-to-br from-teal-600 to-cyan-600 py-16 px-4 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-white/85 mb-8">Find answers to common questions about MentWel.</p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:bg-white/30 transition-all"
            />
          </div>
        </motion.div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Frequently Asked Questions {search && `(${filtered.length} results)`}
          </h2>
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-semibold text-neutral-900 dark:text-white text-sm">{faq.q}</span>
                  {openIndex === i
                    ? <ChevronUp className="w-4 h-4 text-neutral-400 shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                  }
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-700 pt-3">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-10 text-neutral-400">
                <p>No results found. Try a different search term.</p>
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-700 text-center">
              <MessageCircle className="w-8 h-8 text-sky-500 mx-auto mb-3" />
              <h3 className="font-bold text-neutral-900 dark:text-white mb-2">Chat with Welly</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">Get instant answers from our AI assistant.</p>
              <button className="px-4 py-2 bg-sky-500 text-white rounded-xl text-sm font-medium hover:bg-sky-600 transition-colors">Open Chat</button>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-700 text-center">
              <Mail className="w-8 h-8 text-violet-500 mx-auto mb-3" />
              <h3 className="font-bold text-neutral-900 dark:text-white mb-2">Email Support</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">We respond within 24 hours.</p>
              <Link to="/contact" className="px-4 py-2 bg-violet-500 text-white rounded-xl text-sm font-medium hover:bg-violet-600 transition-colors inline-block">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
