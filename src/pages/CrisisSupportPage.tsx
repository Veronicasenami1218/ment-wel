import { motion } from 'framer-motion'
import { Phone, AlertTriangle, Heart, MessageCircle } from 'lucide-react'

const CRISIS_LINES = [
  { name: 'Nigeria Emergency Services', number: '112', available: '24/7', desc: 'For immediate life-threatening emergencies' },
  { name: 'Suicide & Crisis Prevention (Nigeria)', number: '0800-800-2000', available: '24/7', desc: 'Free confidential crisis support' },
  { name: 'MentWel Crisis Line', number: '+234 800 MENTWEL', available: '24/7', desc: 'Our dedicated crisis support team' },
  { name: 'Lagos State Mental Health Hotline', number: '08000MENTAL', available: 'Mon–Fri 8am–8pm', desc: 'Lagos State government mental health support' },
]

const COPING = [
  { title: 'Breathe', desc: 'Try box breathing: inhale 4 counts, hold 4, exhale 4, hold 4. Repeat 4 times.', emoji: '🌬️' },
  { title: 'Ground Yourself', desc: 'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.', emoji: '🌱' },
  { title: 'Reach Out', desc: 'Call a trusted friend or family member. You do not have to face this alone.', emoji: '🤝' },
  { title: 'Safe Space', desc: 'Move to a safe, calm environment. Remove yourself from any immediate danger.', emoji: '🏠' },
]

export default function CrisisSupportPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 transition-colors">
      {/* Hero */}
      <section className="bg-gradient-to-br from-red-600 to-rose-700 py-16 px-4 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl font-bold mb-4">Crisis Support</h1>
          <p className="text-xl text-white/90 leading-relaxed">
            If you are in immediate danger, please call emergency services now.
            You are not alone, and help is available.
          </p>
        </motion.div>
      </section>

      {/* Emergency Numbers */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
            <Phone className="w-6 h-6 text-red-500" /> Emergency Helplines
          </h2>
          <div className="space-y-4 mb-12">
            {CRISIS_LINES.map((line, i) => (
              <motion.div
                key={line.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-red-100 dark:border-red-900/30 flex items-center justify-between gap-4 shadow-sm"
              >
                <div>
                  <p className="font-bold text-neutral-900 dark:text-white">{line.name}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{line.desc}</p>
                  <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">Available: {line.available}</p>
                </div>
                <a
                  href={`tel:${line.number.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-colors shrink-0"
                >
                  <Phone className="w-4 h-4" /> {line.number}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Immediate Coping */}
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-500" /> Immediate Coping Strategies
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {COPING.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-5 border border-neutral-100 dark:border-neutral-700 shadow-sm"
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-neutral-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Talk to Welly */}
          <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl p-6 text-white text-center">
            <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-90" />
            <h3 className="text-xl font-bold mb-2">Talk to Welly</h3>
            <p className="text-white/85 mb-4 text-sm">
              Our AI companion is available 24/7. While Welly is not a crisis counselor,
              it can provide support and help you connect with professional resources.
            </p>
            <button className="px-6 py-3 bg-white text-violet-600 rounded-xl font-bold hover:shadow-lg transition-all">
              Open Welly Chat
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
