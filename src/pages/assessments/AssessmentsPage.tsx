import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Clock, ChevronRight, Brain, Activity, Wind } from 'lucide-react'
import { STATIC_ASSESSMENTS } from '../../data/assessments'

const CATEGORY_ICONS: Record<string, any> = {
  Depression: Brain,
  Anxiety: Wind,
  Stress: Activity,
}

const CATEGORY_COLORS: Record<string, string> = {
  Depression: 'from-sky-500 to-blue-600',
  Anxiety: 'from-purple-500 to-fuchsia-600',
  Stress: 'from-amber-500 to-orange-500',
}

const CATEGORY_BG: Record<string, string> = {
  Depression: 'bg-sky-50 border-sky-100',
  Anxiety: 'bg-purple-50 border-purple-100',
  Stress: 'bg-amber-50 border-amber-100',
}

export default function AssessmentsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-10"
        >
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Self-Assessments</h1>
          <p className="text-neutral-500 max-w-xl">
            Evidence-based mental health screenings to help you understand how you're feeling.
            Results are private and for your personal insight only.
          </p>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-8 flex gap-3 items-start"
        >
          <span className="text-blue-500 text-xl shrink-0">ℹ️</span>
          <p className="text-sm text-blue-700 leading-relaxed">
            These assessments are screening tools, not diagnostic instruments. They are designed to help
            you reflect on your mental health. Please consult a qualified professional for a clinical diagnosis.
          </p>
        </motion.div>

        {/* Assessment Cards */}
        <div className="space-y-4">
          {STATIC_ASSESSMENTS.map((assessment, i) => {
            const Icon = CATEGORY_ICONS[assessment.category] || Brain
            return (
              <motion.div
                key={assessment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all p-6 flex items-center gap-5`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${CATEGORY_COLORS[assessment.category]} flex items-center justify-center shadow shrink-0`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold text-neutral-900">{assessment.title}</h2>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${CATEGORY_BG[assessment.category]} text-neutral-600`}>
                      {assessment.category}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500 mb-3 line-clamp-2">{assessment.description}</p>
                  <div className="flex items-center gap-4 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Brain className="w-3.5 h-3.5" /> {assessment.questionCount} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> ~{assessment.estimatedMinutes} minutes
                    </span>
                  </div>
                </div>

                <Link
                  to={`/assessments/${assessment.id}/take`}
                  className={`flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r ${CATEGORY_COLORS[assessment.category]} text-white rounded-xl font-medium text-sm shadow hover:shadow-md hover:-translate-y-0.5 transition-all shrink-0`}
                >
                  Start <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* History Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Link
            to="/assessments/history"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-sky-600 transition-colors"
          >
            View past assessment results →
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
