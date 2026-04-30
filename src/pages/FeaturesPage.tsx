import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Brain, BookOpen, MessageCircle, Heart,
  Shield, Clock, BarChart3, Users, Smile, ArrowRight
} from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

const features = [
  {
    icon: Brain,
    title: 'Self-Assessment',
    desc: 'Take evidence-based mental health assessments to understand your current state. Get personalised scores, severity levels, and actionable recommendations.',
    color: 'from-sky-500 to-blue-600',
    bg: 'bg-sky-50',
    badge: 'Core Feature',
  },
  {
    icon: BookOpen,
    title: 'Resource Library',
    desc: 'Browse hundreds of articles, videos, and guides on stress, anxiety, depression, mindfulness, and self-care — curated by mental health professionals.',
    color: 'from-purple-500 to-fuchsia-600',
    bg: 'bg-purple-50',
    badge: 'Core Feature',
  },
  {
    icon: MessageCircle,
    title: 'Chat with Counselors',
    desc: 'Connect with licensed counselors through secure, anonymous chat sessions. Get professional support whenever you need it.',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    badge: 'Core Feature',
  },
  {
    icon: Heart,
    title: 'Mood Tracking',
    desc: 'Log your daily mood with emoji-based check-ins, add notes, and visualise your emotional patterns over time with charts and a calendar view.',
    color: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-50',
    badge: 'Core Feature',
  },
  {
    icon: Shield,
    title: '100% Anonymous',
    desc: 'Your identity is protected. Use a pseudonym in chat sessions and control exactly what information you share with counselors.',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    badge: 'Privacy',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    desc: 'Track your mental health journey over time. View assessment history, mood trends, and see how far you have come.',
    color: 'from-violet-500 to-indigo-600',
    bg: 'bg-violet-50',
    badge: 'Analytics',
  },
  {
    icon: Users,
    title: 'Therapist Directory',
    desc: 'Browse verified, licensed therapists. Filter by specialisation, availability, and rating to find the perfect match for your needs.',
    color: 'from-teal-500 to-cyan-600',
    bg: 'bg-teal-50',
    badge: 'Directory',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    desc: 'Access resources, log your mood, and review your progress any time of day. Support is always available when you need it.',
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50',
    badge: 'Availability',
  },
  {
    icon: Smile,
    title: 'Wellness Tips',
    desc: 'Receive daily evidence-based wellness tips personalised to your mood patterns and assessment results.',
    color: 'from-lime-500 to-green-600',
    bg: 'bg-lime-50',
    badge: 'Wellness',
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white pt-20">

      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-600 via-blue-600 to-violet-600 py-20 px-4 text-white text-center">
        <motion.div {...fadeUp()} className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Everything You Need for Mental Wellness
          </h1>
          <p className="text-xl text-white/85 leading-relaxed mb-8">
            MentWel brings together assessments, resources, counselor chat, and mood tracking
            in one secure, easy-to-use platform.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">Platform Features</h2>
            <p className="text-neutral-500 max-w-xl mx-auto">
              Built with mental health professionals to give you the most effective support possible.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeUp(i * 0.06)}
                className={`${f.bg} rounded-2xl p-6 border border-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow`}>
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-400 bg-white px-2 py-1 rounded-full border border-neutral-200">
                    {f.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-800 mb-2">{f.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-sky-600 to-violet-600 text-white text-center">
        <motion.div {...fadeUp()} className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Start Your Wellness Journey Today</h2>
          <p className="text-white/85 mb-8">Free to join. No credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Create Free Account
            </Link>
            <Link to="/about" className="px-8 py-4 bg-white/15 border border-white/30 text-white rounded-xl font-bold hover:bg-white/25 transition-all">
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
