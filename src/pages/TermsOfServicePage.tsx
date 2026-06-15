import { motion } from 'framer-motion'

const SECTIONS = [
  { title: '1. Acceptance of Terms', content: 'By accessing or using MentWel, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our platform.' },
  { title: '2. Not a Medical Service', content: 'MentWel provides wellness tools and connects users with therapists, but it is not a medical service and does not provide medical diagnosis or treatment. Our AI companion Welly and self-assessment tools are for informational purposes only and are not substitutes for professional medical advice, diagnosis, or treatment.' },
  { title: '3. User Responsibilities', content: 'You agree to provide accurate information when creating your account, keep your login credentials secure, use the platform only for lawful purposes, not to misuse or attempt to exploit any features, and to treat all therapists and support staff with respect.' },
  { title: '4. Therapist Services', content: 'Therapists on MentWel are independent licensed professionals. MentWel provides the platform to connect users with therapists but is not responsible for the content of therapeutic sessions. All therapist engagements are subject to separate agreements between users and therapists.' },
  { title: '5. Intellectual Property', content: 'All content on MentWel including text, graphics, logos, and software is the property of MentWel or its content suppliers and is protected by copyright and intellectual property laws. You may not reproduce or distribute any content without prior written permission.' },
  { title: '6. Limitation of Liability', content: 'MentWel shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform. In no event shall our total liability exceed the amount you paid us in the 12 months preceding the claim.' },
  { title: '7. Crisis Situations', content: 'MentWel is not an emergency service. If you are in immediate danger, please contact emergency services (112 in Nigeria) or a crisis helpline (0800-800-2000). Do not rely solely on MentWel for crisis support.' },
  { title: '8. Termination', content: 'We reserve the right to suspend or terminate your account if you violate these Terms of Service. You may also delete your account at any time through your profile settings.' },
  { title: '9. Governing Law', content: 'These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to conflict of law provisions.' },
  { title: '10. Changes to Terms', content: 'We may modify these Terms at any time. We will notify you of significant changes via email or platform notification. Continued use of MentWel after changes constitutes acceptance of the new Terms.' },
]

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 transition-colors">
      <section className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 py-16 px-4 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        </motion.div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {SECTIONS.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">{s.title}</h2>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{s.content}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 p-5 bg-neutral-100 dark:bg-neutral-700 rounded-2xl text-sm text-neutral-600 dark:text-neutral-300">
            Questions? Contact us at <a href="mailto:legal@mentwel.com" className="text-sky-500 hover:underline">legal@mentwel.com</a>
          </div>
        </div>
      </section>
    </div>
  )
}
