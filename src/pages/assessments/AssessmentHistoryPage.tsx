import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Brain, Wind, Activity, Clock } from 'lucide-react'
import { STATIC_ASSESSMENTS } from '../../data/assessments'
import type { AssessmentResult } from '../../services/assessment.service'

const SEVERITY_CONFIG = {
  minimal:  { label: 'Minimal',  color: 'text-green-600',  bg: 'bg-green-50' },
  mild:     { label: 'Mild',     color: 'text-yellow-600', bg: 'bg-yellow-50' },
  moderate: { label: 'Moderate', color: 'text-orange-600', bg: 'bg-orange-50' },
  severe:   { label: 'Severe',   color: 'text-red-600',    bg: 'bg-red-50' },
}

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

export default function AssessmentHistoryPage() {
  const [history, setHistory] = useState<AssessmentResult[]>([])

  useEffect(() => {
    // Load all stored results from sessionStorage
    const results: AssessmentResult[] = []
    STATIC_ASSESSMENTS.forEach(a => {
      const stored = sessionStorage.getItem(`result_${a.id}`)
      if (stored) results.push(JSON.parse(stored))
    })
    results.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
    setHistory(results)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50 pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">

        <div className="py-8">
          <Link to="/assessments" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-sky-600 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Assessments
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Assessment History</h1>
          <p className="text-neutral-500">Your past assessment results from this session.</p>
        </div>

        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-12 shadow-sm border border-neutral-100 text-center"
          >
            <Brain className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="font-semibold text-neutral-600 mb-2">No assessments taken yet</p>
            <p className="text-sm text-neutral-400 mb-6">Complete an assessment to see your results here.</p>
            <Link
              to="/assessments"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white rounded-xl font-medium text-sm hover:shadow-md transition-all"
            >
              Take an Assessment
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {history.map((result, i) => {
              const assessment = STATIC_ASSESSMENTS.find(a => a.id === result.assessmentId)
              const Icon = CATEGORY_ICONS[assessment?.category || ''] || Brain
              const severityConfig = SEVERITY_CONFIG[result.severity]
              const color = CATEGORY_COLORS[assessment?.category || ''] || 'from-sky-500 to-blue-600'

              return (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-5 flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-neutral-900 text-sm">{result.assessmentTitle}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${severityConfig.bg} ${severityConfig.color}`}>
                        {severityConfig.label}
                      </span>
                      <span className="text-xs text-neutral-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(result.completedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-2xl font-bold text-neutral-900">{result.score}</p>
                    <p className="text-xs text-neutral-400">/ {result.maxScore}</p>
                  </div>

                  <Link
                    to={`/assessments/${result.assessmentId}/results`}
                    className="px-4 py-2 text-xs font-medium text-sky-600 border border-sky-200 rounded-xl hover:bg-sky-50 transition-colors shrink-0"
                  >
                    View
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
