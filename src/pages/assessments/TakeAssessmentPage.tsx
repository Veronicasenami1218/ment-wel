import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle, X } from 'lucide-react'
import { STATIC_ASSESSMENTS, calculateResult } from '../../data/assessments'
import toast from 'react-hot-toast'

export default function TakeAssessmentPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const assessment = STATIC_ASSESSMENTS.find(a => a.id === id)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showConfirm, setShowConfirm] = useState(false)
  const [direction, setDirection] = useState(1)

  if (!assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-500 mb-4">Assessment not found.</p>
          <Link to="/assessments" className="text-sky-500 hover:underline">Back to Assessments</Link>
        </div>
      </div>
    )
  }

  const question = assessment.questions[currentIndex]
  const totalQuestions = assessment.questions.length
  const progress = ((currentIndex) / totalQuestions) * 100
  const isAnswered = answers[question.id] !== undefined
  const isLast = currentIndex === totalQuestions - 1
  const allAnswered = assessment.questions.every(q => answers[q.id] !== undefined)

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }))
  }

  const handleNext = () => {
    if (!isAnswered) { toast.error('Please select an answer'); return }
    if (isLast) { setShowConfirm(true); return }
    setDirection(1)
    setCurrentIndex(i => i + 1)
  }

  const handleBack = () => {
    if (currentIndex === 0) return
    setDirection(-1)
    setCurrentIndex(i => i - 1)
  }

  const handleSubmit = () => {
    const result = calculateResult(assessment.id, answers)
    // Store result in sessionStorage to pass to results page
    sessionStorage.setItem(`result_${assessment.id}`, JSON.stringify(result))
    navigate(`/assessments/${assessment.id}/results`)
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">

        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <Link to="/assessments" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-sky-600 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <span className="text-sm font-medium text-neutral-500">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
        </div>

        {/* Assessment Title */}
        <h1 className="text-xl font-bold text-neutral-900 mb-6">{assessment.title}</h1>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-neutral-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-sky-500 to-fuchsia-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          {/* Step dots */}
          <div className="flex justify-between mt-2">
            {assessment.questions.map((q, i) => (
              <div
                key={q.id}
                className={`w-2 h-2 rounded-full transition-all ${
                  answers[q.id] !== undefined ? 'bg-sky-500' :
                  i === currentIndex ? 'bg-sky-300' : 'bg-neutral-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 mb-6"
          >
            <p className="text-sm font-semibold text-neutral-400 uppercase tracking-wide mb-3">
              Over the last 2 weeks, how often have you been bothered by:
            </p>
            <p className="text-lg font-semibold text-neutral-900 mb-6 leading-relaxed">
              {question.text}
            </p>

            <div className="space-y-3">
              {question.options?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    answers[question.id] === option.value
                      ? 'border-sky-500 bg-sky-50 text-sky-700'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    answers[question.id] === option.value
                      ? 'border-sky-500 bg-sky-500'
                      : 'border-neutral-300'
                  }`}>
                    {answers[question.id] === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-5 py-3 border-2 border-neutral-200 text-neutral-600 rounded-xl font-medium hover:bg-neutral-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white rounded-xl font-medium shadow hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            {isLast ? 'Review & Submit' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Confirm Submit Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-neutral-900">Submit Assessment?</h3>
                <button onClick={() => setShowConfirm(false)} className="p-1 hover:bg-neutral-100 rounded-lg">
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              </div>
              <p className="text-sm text-neutral-500 mb-2">
                You have answered <strong>{Object.keys(answers).length} of {totalQuestions}</strong> questions.
              </p>
              {!allAnswered && (
                <p className="text-sm text-amber-600 bg-amber-50 rounded-xl p-3 mb-4">
                  ⚠️ Some questions are unanswered. You can go back to complete them.
                </p>
              )}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2.5 border-2 border-neutral-200 text-neutral-600 rounded-xl font-medium hover:bg-neutral-50 transition-all text-sm"
                >
                  Go Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white rounded-xl font-medium text-sm hover:shadow-md transition-all"
                >
                  <CheckCircle className="w-4 h-4" /> Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
