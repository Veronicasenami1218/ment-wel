import { motion } from 'framer-motion'

const SECTIONS = [
  { title: '1. Information We Collect', content: 'We collect information you provide directly, such as your name, email address, date of birth, and any content you submit (mood logs, assessment answers, messages). We also collect usage data such as pages visited, features used, and session duration to improve our platform.' },
  { title: '2. How We Use Your Information', content: 'We use your information to provide and improve our services, personalise your experience, send you relevant wellness tips and notifications (with your consent), connect you with therapists, and ensure the security of our platform.' },
  { title: '3. Data Sharing', content: 'We do not sell your personal information. We may share data with licensed therapists you choose to engage with, third-party service providers who help us operate the platform (under strict data processing agreements), and law enforcement when required by law.' },
  { title: '4. Data Storage & Security', content: 'Your data is stored on secure, encrypted servers. We use industry-standard security measures including TLS encryption, access controls, and regular security audits. However, no method of transmission over the internet is 100% secure.' },
  { title: '5. Your Rights', content: 'You have the right to access your personal data, correct inaccurate data, request deletion of your data, object to processing of your data, and withdraw consent at any time. To exercise these rights, contact us at privacy@mentwel.com.' },
  { title: '6. Cookies', content: 'We use essential cookies to keep you logged in and remember your preferences such as dark/light mode. We use analytics cookies (with your consent) to understand how users interact with our platform. You can manage cookie preferences in your browser settings.' },
  { title: '7. Children\'s Privacy', content: 'MentWel is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us immediately.' },
  { title: '8. Changes to This Policy', content: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by posting a notice on our platform. Your continued use of MentWel after changes constitutes acceptance of the updated policy.' },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 transition-colors">
      <section className="bg-gradient-to-br from-slate-700 to-slate-900 py-16 px-4 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-white/75 text-sm">Last updated: January 2025</p>
        </motion.div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-4 border border-sky-100 dark:border-sky-900/30 mb-8 text-sm text-sky-700 dark:text-sky-400">
            Your privacy matters to us. This policy explains how MentWel collects, uses, and protects your personal information.
          </div>
          <div className="space-y-8">
            {SECTIONS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <h2 className="text-lg font-bold text-neutral-900 dark:text-white mb-3">{s.title}</h2>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{s.content}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 p-5 bg-neutral-100 dark:bg-neutral-700 rounded-2xl text-sm text-neutral-600 dark:text-neutral-300">
            Questions about this policy? Contact us at <a href="mailto:privacy@mentwel.com" className="text-sky-500 hover:underline">privacy@mentwel.com</a>
          </div>
        </div>
      </section>
    </div>
  )
}
