import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Video, Mic, MessageCircle, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

const SESSION_TYPES = [
  { id: 'text', label: 'Text Chat', icon: MessageCircle, desc: 'Chat via secure messaging', color: 'from-sky-500 to-blue-600' },
  { id: 'voice', label: 'Voice Call', icon: Mic, desc: 'Private audio session', color: 'from-emerald-500 to-teal-600' },
  { id: 'video', label: 'Video Call', icon: Video, desc: 'Face-to-face video session', color: 'from-purple-500 to-fuchsia-600' },
]

const DURATIONS = [
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
]

const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

const THERAPISTS = [
  { id: '1', name: 'Dr. Amara Osei', title: 'Clinical Psychologist', initials: 'AO', color: 'from-sky-400 to-blue-500', available: true },
  { id: '2', name: 'Dr. Chidi Nwosu', title: 'Counseling Psychologist', initials: 'CN', color: 'from-purple-400 to-fuchsia-500', available: true },
  { id: '4', name: 'Dr. Tunde Adeyemi', title: 'Behavioral Therapist', initials: 'TA', color: 'from-pink-400 to-rose-500', available: true },
  { id: '5', name: 'Dr. Ngozi Eze', title: 'Family Therapist', initials: 'NE', color: 'from-amber-400 to-orange-500', available: true },
]

export default function SessionBookingPage() {
  const [step, setStep] = useState(1)
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null)
  const [sessionType, setSessionType] = useState<string | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [notes, setNotes] = useState('')
  const [isBooked, setIsBooked] = useState(false)

  const therapist = THERAPISTS.find((t) => t.id === selectedTherapist)
  const sessionTypeObj = SESSION_TYPES.find((s) => s.id === sessionType)

  const handleBook = () => {
    setIsBooked(true)
    toast.success('Session booked successfully!')
  }

  if (isBooked) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-20 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-10 shadow-sm border border-neutral-100 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Session Booked!</h2>
          <p className="text-neutral-500 mb-6">
            Your {sessionTypeObj?.label} session with <strong>{therapist?.name}</strong> on{' '}
            <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong> has been confirmed.
          </p>
          <div className="space-y-3">
            <Link to="/dashboard" className="block w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-md transition-all">
              Go to Dashboard
            </Link>
            <button onClick={() => { setIsBooked(false); setStep(1); setSelectedTherapist(null); setSessionType(null); setDuration(null); setSelectedDate(''); setSelectedTime(null); setNotes('') }}
              className="block w-full py-3 border-2 border-neutral-200 text-neutral-600 rounded-xl font-medium hover:bg-neutral-50 transition-all">
              Book Another Session
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">

        {/* Header */}
        <div className="text-center py-10">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Book a Session</h1>
          <p className="text-neutral-500">Schedule a session with one of our licensed therapists.</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {['Therapist', 'Session Type', 'Date & Time', 'Confirm'].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 text-xs font-medium ${step > i + 1 ? 'text-green-600' : step === i + 1 ? 'text-sky-600' : 'text-neutral-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step > i + 1 ? 'bg-green-100 text-green-600' : step === i + 1 ? 'bg-sky-100 text-sky-600' : 'bg-neutral-100 text-neutral-400'}`}>
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                <span className="hidden sm:block">{label}</span>
              </div>
              {i < 3 && <div className={`w-8 h-0.5 ${step > i + 1 ? 'bg-green-300' : 'bg-neutral-200'}`} />}
            </div>
          ))}
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">

          {/* Step 1: Choose Therapist */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-bold text-neutral-800 mb-4">Choose a Therapist</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {THERAPISTS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTherapist(t.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${selectedTherapist === t.id ? 'border-sky-500 bg-sky-50' : 'border-neutral-200 hover:border-neutral-300'}`}
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>{t.initials}</div>
                    <div>
                      <p className="font-semibold text-sm text-neutral-800">{t.name}</p>
                      <p className="text-xs text-neutral-500">{t.title}</p>
                    </div>
                    {selectedTherapist === t.id && <CheckCircle className="w-4 h-4 text-sky-500 ml-auto shrink-0" />}
                  </button>
                ))}
              </div>
              <button disabled={!selectedTherapist} onClick={() => setStep(2)} className="mt-6 w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium disabled:opacity-40 hover:shadow-md transition-all flex items-center justify-center gap-2">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 2: Session Type & Duration */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-bold text-neutral-800 mb-4">Session Type</h2>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {SESSION_TYPES.map((s) => (
                  <button key={s.id} onClick={() => setSessionType(s.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${sessionType === s.id ? 'border-sky-500 bg-sky-50' : 'border-neutral-200 hover:border-neutral-300'}`}>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                      <s.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs font-semibold text-neutral-700">{s.label}</p>
                    <p className="text-xs text-neutral-400 text-center">{s.desc}</p>
                  </button>
                ))}
              </div>
              <h2 className="text-lg font-bold text-neutral-800 mb-3">Duration</h2>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {DURATIONS.map((d) => (
                  <button key={d.value} onClick={() => setDuration(d.value)}
                    className={`flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-all ${duration === d.value ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'}`}>
                    <Clock className="w-4 h-4" /> {d.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex items-center gap-2 px-4 py-3 border-2 border-neutral-200 text-neutral-600 rounded-xl font-medium hover:bg-neutral-50 transition-all">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button disabled={!sessionType || !duration} onClick={() => setStep(3)} className="flex-1 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium disabled:opacity-40 hover:shadow-md transition-all flex items-center justify-center gap-2">
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-bold text-neutral-800 mb-4">Pick a Date & Time</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Date</label>
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-sky-500 transition-all text-sm" />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Available Time Slots</label>
                <div className="grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button key={slot} onClick={() => setSelectedTime(slot)}
                      className={`py-2 text-xs font-medium rounded-xl border-2 transition-all ${selectedTime === slot ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'}`}>
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Notes for Therapist <span className="text-neutral-400 font-normal">(optional)</span></label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                  placeholder="Briefly describe what you'd like to discuss..."
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-sky-500 transition-all text-sm resize-none" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex items-center gap-2 px-4 py-3 border-2 border-neutral-200 text-neutral-600 rounded-xl font-medium hover:bg-neutral-50 transition-all">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button disabled={!selectedDate || !selectedTime} onClick={() => setStep(4)} className="flex-1 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-medium disabled:opacity-40 hover:shadow-md transition-all flex items-center justify-center gap-2">
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div>
              <h2 className="text-lg font-bold text-neutral-800 mb-4">Confirm Booking</h2>
              <div className="bg-neutral-50 rounded-xl p-5 space-y-3 mb-6 text-sm">
                {[
                  { label: 'Therapist', value: therapist?.name },
                  { label: 'Session Type', value: sessionTypeObj?.label },
                  { label: 'Duration', value: `${duration} minutes` },
                  { label: 'Date', value: selectedDate },
                  { label: 'Time', value: selectedTime },
                  ...(notes ? [{ label: 'Notes', value: notes }] : []),
                ].map((item) => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-neutral-500">{item.label}</span>
                    <span className="font-semibold text-neutral-800">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="flex items-center gap-2 px-4 py-3 border-2 border-neutral-200 text-neutral-600 rounded-xl font-medium hover:bg-neutral-50 transition-all">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={handleBook} className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:shadow-md transition-all flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" /> Confirm Booking
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
