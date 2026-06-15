import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { UserPlus, Search, MessageCircle, TrendingUp, ArrowRight } from 'lucide-react'

const steps = [
  { number: '01', icon: UserPlus, title: 'Create Your Account', desc: 'Sign up in minutes. Your information is kept completely secure and private.', color: 'from-sky-500 to-blue-600' },
  { number: '02', icon: Search, title: 'Take a Self-Assessment', desc: 'Complete one of our evidence-based mental health screenings to understand how you\'re feeling.', color: 'from-purple-500 to-fuchsia-600' },
  { number: '03', icon: MessageCircle, title: 'Connect with Support', desc: 'Chat with our AI companion Welly, browse resources, or book a session with a licensed therapist.', color: 'from-emerald-500 to-teal-600' },
  { number: '04', icon: TrendingUp, title: 'Track Your Progress', desc: 'Log your daily mood, review your assessment history, and watch your wellness journey unfold.', color: 'from-amber-500 to-orange-500' },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 transition-colors">
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-600 to-violet-600 py-20 px-4 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How MentWel Works</h1>
          <p className="text-xl text-white/85">Getting started with your mental wellness journey is simple.</p>
        </motion.div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-700"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow shrink-0`}>
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1">Step {step.number}</p>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-violet-600 text-white rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all">
              Get Started Now <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
