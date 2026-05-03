import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Heart, 
  Shield, 
  Clock, 
  Users,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Sun,
  Smile,
  Mail,
  Phone,
  MapPin,
  Send
} from 'lucide-react'
import { useState } from 'react'

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title>MentWel - Your Journey to Mental Wellness Starts Here</title>
        <meta name="description" content="Connect with licensed therapists across Nigeria for anonymous, secure, and flexible therapy sessions. Start your mental wellness journey today." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section - Vibrant and Eye-catching */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/30">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-white font-medium">Your Mental Wellness Matters</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Your Journey to
                <span className="block mt-2 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
                  Mental Wellness
                </span>
                Starts Here
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                Connect with licensed therapists across Nigeria for anonymous, secure, and flexible therapy sessions. 
                Your mental health matters, and we're here to support you every step of the way.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/register"
                  className="group px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/therapists"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
                >
                  Browse Therapists
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/90">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">100% Anonymous</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">Licensed Therapists</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">10,000+ Sessions</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-300/30 rounded-full blur-xl animate-pulse delay-75"></div>
        </section>

        {/* How It Works - Colorful Steps */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                How MentWel Works
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Your path to mental wellness is just three simple steps away
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Create Your Account',
                  description: 'Sign up in minutes and tell us about your mental health goals.',
                  icon: CheckCircle,
                  gradient: 'from-blue-500 to-cyan-500',
                  bgGradient: 'from-blue-100 to-cyan-100'
                },
                {
                  step: '02',
                  title: 'Find Your Therapist',
                  description: 'Browse verified therapists and choose the perfect match for you.',
                  icon: Users,
                  gradient: 'from-purple-500 to-pink-500',
                  bgGradient: 'from-purple-100 to-pink-100'
                },
                {
                  step: '03',
                  title: 'Begin Healing',
                  description: 'Start your sessions and track your journey to better mental health.',
                  icon: Heart,
                  gradient: 'from-orange-500 to-red-500',
                  bgGradient: 'from-orange-100 to-red-100'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative p-8 rounded-3xl bg-gradient-to-br ${item.bgGradient} shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300`}
                >
                  <div className={`absolute -top-6 left-8 w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="mt-8">
                    <div className={`text-6xl font-bold bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent mb-4 opacity-30`}>
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Inspirational Cards - Replacing Pricing */}
        <section className="py-20 px-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 min-h-screen">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                You Are Not Alone
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Every journey begins with a single step. Here's what makes your journey special.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Sun,
                  title: 'Hope & Healing',
                  message: 'Every sunrise brings new opportunities for growth and healing. Your mental wellness journey is a testament to your strength.',
                  color: 'from-yellow-400 to-orange-400',
                  bgColor: 'bg-yellow-50'
                },
                {
                  icon: Heart,
                  title: 'Self-Love & Care',
                  message: 'Taking care of your mental health is not selfish—it\'s essential. You deserve peace, happiness, and emotional well-being.',
                  color: 'from-pink-400 to-rose-400',
                  bgColor: 'bg-pink-50'
                },
                {
                  icon: Smile,
                  title: 'Joy & Progress',
                  message: 'Small steps lead to big changes. Celebrate every victory, no matter how small. Your progress matters.',
                  color: 'from-purple-400 to-indigo-400',
                  bgColor: 'bg-purple-50'
                }
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-300"></div>
                  <div className={`relative ${card.bgColor} p-8 rounded-3xl shadow-2xl border-2 border-white/20 backdrop-blur-sm transform group-hover:-translate-y-2 transition-all duration-300`}>
                    <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                      <card.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{card.title}</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {card.message}
                    </p>
                    
                    <div className={`mt-6 h-1 w-20 bg-gradient-to-r ${card.color} rounded-full`}></div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-16"
            >
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-purple-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                Begin Your Journey Today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Why Choose MentWel - Vibrant Features */}
        <section className="py-20 px-4 bg-gradient-to-br from-teal-50 via-blue-50 to-indigo-50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Why Choose MentWel?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We're committed to making mental health support accessible, secure, and effective
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: '100% Anonymous',
                  description: 'Your privacy is our priority. All sessions are completely confidential.',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: CheckCircle,
                  title: 'Licensed Therapists',
                  description: 'All our therapists are verified professionals with proper credentials.',
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  icon: Clock,
                  title: '24/7 Availability',
                  description: 'Access support whenever you need it, day or night.',
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  icon: Heart,
                  title: 'Compassionate Care',
                  description: 'Experience genuine care and support from professionals who truly understand.',
                  color: 'from-red-500 to-orange-500'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-purple-200"
                >
                  <div className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Bold and Inviting */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Start Your Mental Wellness Journey?
              </h2>
              <p className="text-xl text-white/90 mb-10 leading-relaxed">
                Join thousands of people who have found support and healing through MentWel. 
                Your mental health matters, and we're here to help every step of the way.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="px-10 py-5 bg-white text-purple-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-gradient-to-br from-neutral-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have a question or need support? We're here for you.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {[
                  { icon: Mail, label: 'Email Us', value: 'support@mentwel.com', color: 'from-sky-500 to-blue-600' },
                  { icon: Phone, label: 'Call Us', value: '+234 800 MENTWEL', color: 'from-emerald-500 to-teal-600' },
                  { icon: MapPin, label: 'Location', value: 'Lagos, Nigeria', color: 'from-purple-500 to-fuchsia-600' },
                  { icon: Clock, label: 'Support Hours', value: '24/7 Available', color: 'from-amber-500 to-orange-500' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow shrink-0`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">{item.label}</p>
                      <p className="font-semibold text-neutral-800">{item.value}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Crisis Box */}
                <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                  <h3 className="text-base font-bold text-red-700 mb-2">🆘 Crisis Support</h3>
                  <p className="text-sm text-red-600 mb-3">If you are in immediate danger, please contact emergency services.</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Nigeria Emergency', number: '112' },
                      { label: 'Suicide Prevention', number: '0800-800-2000' },
                    ].map(line => (
                      <div key={line.label} className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border border-red-100">
                        <span className="text-sm text-neutral-600">{line.label}</span>
                        <span className="text-sm font-bold text-red-600">{line.number}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function ContactForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-10 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">Message Sent!</h3>
        <p className="text-neutral-500 mb-6">We'll get back to you within 24 hours.</p>
        <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
          className="px-6 py-2.5 border-2 border-neutral-200 text-neutral-600 rounded-xl text-sm font-medium hover:bg-neutral-50 transition-all">
          Send Another
        </button>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 space-y-4"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-sm"
            placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
          <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required
            className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-sm"
            placeholder="your@email.com" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Subject</label>
        <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-sm">
          <option value="">Select a subject</option>
          <option value="general">General Inquiry</option>
          <option value="support">Technical Support</option>
          <option value="therapist">Therapist Partnership</option>
          <option value="crisis">Crisis Support</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
        <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required rows={4}
          className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-500 transition-all text-sm resize-none"
          placeholder="Tell us how we can help..." />
      </div>
      <button type="submit" disabled={loading}
        className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium shadow hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
        {loading
          ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
          : <><Send className="w-4 h-4" /> Send Message</>
        }
      </button>
      <p className="text-xs text-neutral-400 text-center">
        Or visit our full <Link to="/contact" className="text-emerald-600 hover:underline font-medium">Contact page</Link> for more options.
      </p>
    </motion.form>
  )
}