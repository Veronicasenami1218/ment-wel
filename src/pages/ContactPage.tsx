import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Loader2 } from 'lucide-react'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

export default function ContactPage() {
  const [isSending, setIsSending] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>()

  const onSubmit = async (_data: ContactFormData) => {
    setIsSending(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200))
    toast.success('Message sent! We will get back to you within 24 hours.')
    reset()
    setIsSending(false)
  }

  const contactInfo = [
    { icon: Mail, label: 'Email Us', value: 'support@mentwel.com', color: 'from-sky-500 to-blue-600' },
    { icon: Phone, label: 'Call Us', value: '+234 800 MENTWEL', color: 'from-emerald-500 to-teal-600' },
    { icon: MapPin, label: 'Location', value: 'Lagos, Nigeria', color: 'from-purple-500 to-fuchsia-600' },
    { icon: Clock, label: 'Support Hours', value: '24/7 Available', color: 'from-amber-500 to-orange-500' },
  ]

  return (
    <div className="min-h-screen bg-white pt-20">

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 py-20 px-4 text-white text-center">
        <motion.div {...fadeUp()} className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MessageCircle className="w-4 h-4" /> Get in Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">We're Here to Help</h1>
          <p className="text-xl text-white/85">
            Have a question, concern, or just want to say hello? Our team is ready to assist you.
          </p>
        </motion.div>
      </section>

      <section className="py-20 px-4 bg-neutral-50">
        <div className="max-w-5xl mx-auto">

          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                {...fadeUp(i * 0.08)}
                className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100 text-center hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-3 shadow`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-neutral-800">{item.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <motion.div {...fadeUp(0.1)}>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Send Us a Message</h2>
              <p className="text-neutral-500 mb-6">Fill in the form and we'll respond within 24 hours.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm"
                      placeholder="Your name"
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      {...register('email', { required: 'Email is required' })}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm"
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Subject</label>
                  <select
                    {...register('subject', { required: 'Please select a subject' })}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="therapist">Therapist Partnership</option>
                    <option value="billing">Billing Question</option>
                    <option value="crisis">Crisis Support</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
                  <textarea
                    {...register('message', { required: 'Message is required', minLength: { value: 20, message: 'Please write at least 20 characters' } })}
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm resize-none"
                    placeholder="Tell us how we can help..."
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium shadow hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {isSending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>

            {/* Crisis Support Box */}
            <motion.div {...fadeUp(0.2)} className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-red-700 mb-2">🆘 Crisis Support</h3>
                <p className="text-sm text-red-600 leading-relaxed mb-4">
                  If you or someone you know is in immediate danger or experiencing a mental health crisis,
                  please contact emergency services immediately.
                </p>
                <div className="space-y-2">
                  {[
                    { label: 'Nigeria Emergency', number: '112' },
                    { label: 'Suicide Prevention (Nigeria)', number: '0800-800-2000' },
                    { label: 'MentWel Crisis Line', number: '+234 800 MENTWEL' },
                  ].map((line) => (
                    <div key={line.label} className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 border border-red-100">
                      <span className="text-sm text-neutral-600">{line.label}</span>
                      <span className="text-sm font-bold text-red-600">{line.number}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-sky-700 mb-2">💬 Live Chat</h3>
                <p className="text-sm text-sky-600 leading-relaxed mb-4">
                  Need a faster response? Our support team is available via live chat during business hours.
                </p>
                <div className="flex items-center gap-2 text-sm text-sky-600">
                  <Clock className="w-4 h-4" />
                  <span>Mon – Fri, 8am – 8pm WAT</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
