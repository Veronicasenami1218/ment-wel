import { motion } from 'framer-motion'
import { Heart, Shield, Users, Target, Eye, Lightbulb } from 'lucide-react'
import { Link } from 'react-router-dom'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

const team = [
  { name: 'Dr. Amara Osei', role: 'Chief Medical Officer', initials: 'AO', color: 'from-sky-400 to-blue-500' },
  { name: 'Chidi Nwosu', role: 'Lead Engineer', initials: 'CN', color: 'from-purple-400 to-fuchsia-500' },
  { name: 'Fatima Al-Hassan', role: 'Head of Counseling', initials: 'FA', color: 'from-emerald-400 to-teal-500' },
  { name: 'Tunde Adeyemi', role: 'UX Designer', initials: 'TA', color: 'from-pink-400 to-rose-500' },
]

const values = [
  { icon: Heart, title: 'Compassion', desc: 'We approach every interaction with empathy and genuine care for your wellbeing.', color: 'from-pink-500 to-rose-500' },
  { icon: Shield, title: 'Privacy', desc: 'Your data and conversations are fully encrypted and never shared without consent.', color: 'from-sky-500 to-blue-500' },
  { icon: Users, title: 'Inclusivity', desc: 'Mental health support should be accessible to everyone, regardless of background.', color: 'from-purple-500 to-fuchsia-500' },
  { icon: Target, title: 'Effectiveness', desc: 'Evidence-based approaches that deliver real, measurable improvements in wellbeing.', color: 'from-emerald-500 to-teal-500' },
  { icon: Eye, title: 'Transparency', desc: 'We are honest about what we do, how we work, and how we use your information.', color: 'from-amber-500 to-orange-500' },
  { icon: Lightbulb, title: 'Innovation', desc: 'Continuously improving our platform with the latest research and technology.', color: 'from-violet-500 to-indigo-500' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-20">

      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 py-20 px-4 text-white text-center">
        <motion.div {...fadeUp()} className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" /> Our Story
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Making Mental Health Support Accessible to All
          </h1>
          <p className="text-xl text-white/85 leading-relaxed">
            MentWel was founded with a simple belief — everyone deserves access to quality mental health support,
            regardless of where they live or what they can afford.
          </p>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 bg-neutral-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp(0.1)}>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Our Mission</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              We connect people across Nigeria and Africa with licensed, verified therapists for anonymous,
              secure, and flexible therapy sessions — via text, voice, or video.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Mental health challenges affect 1 in 4 people globally, yet access to professional support
              remains limited in many parts of Africa. MentWel bridges that gap with technology, compassion,
              and a commitment to quality care.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Join MentWel Today
            </Link>
          </motion.div>
          <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 gap-4">
            {[
              { value: '10,000+', label: 'Sessions Completed' },
              { value: '500+', label: 'Licensed Therapists' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '5+', label: 'Countries Served' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-sm text-neutral-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">What We Stand For</h2>
            <p className="text-neutral-500 max-w-xl mx-auto">Our core values guide every decision we make.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} {...fadeUp(i * 0.07)} className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-4 shadow`}>
                  <v.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-neutral-800 mb-2">{v.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3">Meet the Team</h2>
            <p className="text-neutral-500">The people behind MentWel's mission.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name} {...fadeUp(i * 0.08)} className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 text-center hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 shadow`}>
                  {member.initials}
                </div>
                <p className="font-bold text-neutral-800">{member.name}</p>
                <p className="text-sm text-neutral-500 mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-center">
        <motion.div {...fadeUp()} className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-white/85 mb-8">Join thousands of people who have found support through MentWel.</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-violet-600 rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Get Started Free
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
