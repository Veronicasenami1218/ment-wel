import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, RotateCcw, MessageCircle, Download } from 'lucide-react'
import { STATIC_ASSESSMENTS } from '../../data/assessments'
import type { AssessmentResult } from '../../services/assessment.service'

const SEVERITY_CONFIG = {
  minimal: { label: 'Minimal', color: 'text-green-600', bg: 'bg-green-50 border-green-200', bar: 'bg-green-500', emoji: '😊' },
  mild:    { label: 'Mild',    color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-200', bar: 'bg-yellow-500', emoji: '😐' },
  moderate:{ label: 'Moderate',color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', bar: 'bg-orange-500', emoji: '😟' },
  severe:  { label: 'Severe',  color: 'text-red-600',    bg: 'bg-red-50 border-red-200',       bar: 'bg-red-500',    emoji: '😢' },
}

export default function AssessmentResultsPage() {
  const { id } = useParams<{ id: string }>()
  const [result, setResult] = useState<AssessmentResult | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem(`result_${id}`)
    if (stored) setResult(JSON.parse(stored))
  }, [id])

  const assessment = STATIC_ASSESSMENTS.find(a => a.id === id)

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-500 mb-4">No results found. Please take the assessment first.</p>
          <Link to="/assessments" className="text-sky-500 hover:underline">Go to Assessments</Link>
        </div>
      </div>
    )
  }

  const config = SEVERITY_CONFIG[result.severity]

  return (
    <div className="min-h-screen bg-neutral-50 pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8 text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-fuchsia-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-1">Assessment Complete</h1>
          <p className="text-neutral-500">{result.assessmentTitle}</p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 mb-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-neutral-400 mb-1">Your Score</p>
              <p className="text-4xl font-bold text-neutral-900">
                {result.score} <span className="text-xl text-neutral-400">/ {result.maxScore}</span>
              </p>
            </div>
            <div className={`px-4 py-2 rounded-xl border text-lg font-bold ${config.bg} ${config.color}`}>
              {config.emoji} {config.label}
            </div>
          </div>

          {/* Score bar */}
          <div className="h-3 bg-neutral-100 rounded-full overflow-hidden mb-2">
            <motion.div
              className={`h-full rounded-full ${config.bar}`}
              initial={{ width: 0 }}
              animate={{ width: `${result.percentage}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
          <p className="text-xs text-neutral-400 text-right">{result.percentage}% of maximum score</p>
        </motion.div>

        {/* Interpretation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-2xl border p-5 mb-5 ${config.bg}`}
        >
          <h2 className={`font-bold mb-2 ${config.color}`}>What This Means</h2>
          <p className={`text-sm leading-relaxed ${config.color}`}>{result.interpretation}</p>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 mb-5"
        >
          <h2 className="font-bold text-neutral-800 mb-4">Recommendations</h2>
          <div className="space-y-3">
            {result.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sky-600 text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-neutral-100 rounded-xl p-4 mb-6 text-xs text-neutral-500 leading-relaxed"
        >
          ⚠️ This screening tool is not a clinical diagnosis. Results are for personal reflection only.
          Please consult a qualified mental health professional for a proper evaluation.
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="grid grid-cols-2 gap-3"
        >
          <Link
            to="/sessions"
            className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white rounded-xl font-medium text-sm shadow hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <MessageCircle className="w-4 h-4" /> Talk to Counselor
          </Link>
          <Link
            to={`/assessments/${id}/take`}
            className="flex items-center justify-center gap-2 py-3 border-2 border-neutral-200 text-neutral-600 rounded-xl font-medium text-sm hover:bg-neutral-50 transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Retake
          </Link>
          <Link
            to="/assessments/history"
            className="flex items-center justify-center gap-2 py-3 border-2 border-neutral-200 text-neutral-600 rounded-xl font-medium text-sm hover:bg-neutral-50 transition-all"
          >
            View History <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/assessments"
            className="flex items-center justify-center gap-2 py-3 border-2 border-neutral-200 text-neutral-600 rounded-xl font-medium text-sm hover:bg-neutral-50 transition-all"
          >
            All Assessments
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
