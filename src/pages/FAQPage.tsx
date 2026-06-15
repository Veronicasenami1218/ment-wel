import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const CATEGORIES = [
  {
    name: 'Getting Started',
    faqs: [
      { q: 'What is MentWel?', a: 'MentWel is a web-based mental health support platform that connects users with licensed therapists, evidence-based self-assessments, a resource library, mood tracking tools, and an AI wellness companion.' },
      { q: 'Is MentWel free?', a: 'Core features including mood tracking, self-assessments, the resource library, and AI chat with Welly are completely free. Premium therapist sessions may have costs set by individual therapists.' },
      { q: 'How do I create an account?', a: 'Click "Get Started" on the homepage, fill in your name, email, and password, then verify your email. You can also sign in with Google for a faster setup.' },
    ],
  },
  {
    name: 'Privacy & Security',
    faqs: [
      { q: 'Is my information confidential?', a: 'Yes. All your data is encrypted and stored securely. We follow strict data protection practices and never sell your personal information to third parties.' },
      { q: 'Can I use MentWel anonymously?', a: 'Yes. You can use a pseudonym when chatting with counselors. Your real identity is never revealed without your explicit consent.' },
      { q: 'How do I delete my account?', a: 'Go to your Profile page, scroll to the Danger Zone section, and click "Deactivate Account". You can contact support at support@mentwel.com for permanent deletion.' },
    ],
  },
  {
    name: 'Assessments',
    faqs: [
      { q: 'Are the assessments medically valid?', a: 'Yes. Our assessments are based on clinically validated tools including the PHQ-9 (depression), GAD-7 (anxiety), and Perceived Stress Scale. However, they are screening tools, not clinical diagnoses.' },
      { q: 'How often should I take an assessment?', a: 'We recommend taking assessments every 2-4 weeks to track changes in your mental health over time. Avoid taking them more than once a week as scores can fluctuate day to day.' },
      { q: 'Who can see my assessment results?', a: 'Only you can see your results by default. You can choose to share them with a therapist during a session.' },
    ],
  },
  {
    name: 'Therapists & Sessions',
    faqs: [
      { q: 'Are therapists on MentWel licensed?', a: 'Yes. All therapists on our platform are verified licensed mental health professionals. We check credentials before any therapist is allowed to offer sessions.' },
      { q: 'What session types are available?', a: 'Therapists offer text chat, voice call, and video call sessions. You choose the format when booking.' },
      { q: 'What if I need to cancel a session?', a: 'You can cancel or reschedule sessions from your dashboard. Please give at least 24 hours notice out of respect for the therapist\'s time.' },
    ],
  },
]

export default function FAQPage() {
  const [openKey, setOpenKey] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 transition-colors">
      <section className="bg-gradient-to-br from-indigo-600 to-violet-600 py-16 px-4 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-white/85">Everything you need to know about MentWel.</p>
        </motion.div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-10">
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
            >
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">{cat.name}</h2>
              <div className="space-y-3">
                {cat.faqs.map((faq, fi) => {
                  const key = `${ci}-${fi}`
                  return (
                    <div key={key} className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 overflow-hidden">
                      <button
                        onClick={() => setOpenKey(openKey === key ? null : key)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                      >
                        <span className="font-semibold text-neutral-900 dark:text-white text-sm">{faq.q}</span>
                        {openKey === key
                          ? <ChevronUp className="w-4 h-4 text-neutral-400 shrink-0" />
                          : <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                        }
                      </button>
                      {openKey === key && (
                        <div className="px-5 pb-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-700 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
