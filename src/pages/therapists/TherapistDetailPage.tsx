import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { Star, Clock, ArrowLeft, CheckCircle, Calendar, MessageCircle, Award } from 'lucide-react'

const THERAPISTS: Record<string, any> = {
  '1': { name: 'Dr. Amara Osei', title: 'Clinical Psychologist', specializations: ['Anxiety', 'Depression', 'Trauma'], experience: 8, rating: 4.9, reviews: 124, available: true, initials: 'AO', color: 'from-sky-400 to-blue-500', bio: 'Dr. Amara Osei is a licensed clinical psychologist with over 8 years of experience helping individuals navigate anxiety, depression, and trauma. She uses a combination of Cognitive Behavioral Therapy (CBT) and mindfulness-based approaches to help clients build resilience and find lasting relief.', education: ['PhD Clinical Psychology – University of Ghana', 'MSc Counseling Psychology – University of Lagos', 'BSc Psychology – Kwame Nkrumah University'], languages: ['English', 'Twi', 'Yoruba'], sessionTypes: ['Text Chat', 'Voice Call', 'Video Call'] },
  '2': { name: 'Dr. Chidi Nwosu', title: 'Counseling Psychologist', specializations: ['Relationships', 'Stress', 'Grief'], experience: 6, rating: 4.8, reviews: 98, available: true, initials: 'CN', color: 'from-purple-400 to-fuchsia-500', bio: 'Dr. Chidi Nwosu specialises in relationship counseling, stress management, and grief therapy. With 6 years of practice, he has helped hundreds of clients rebuild connections and find peace after loss.', education: ['MSc Counseling Psychology – University of Ibadan', 'BSc Psychology – University of Nigeria'], languages: ['English', 'Igbo'], sessionTypes: ['Text Chat', 'Voice Call'] },
  '3': { name: 'Dr. Fatima Al-Hassan', title: 'Psychiatrist', specializations: ['Depression', 'Addiction', 'Anxiety'], experience: 12, rating: 4.9, reviews: 210, available: false, initials: 'FA', color: 'from-emerald-400 to-teal-500', bio: 'Dr. Fatima Al-Hassan is a board-certified psychiatrist with 12 years of experience treating depression, addiction, and anxiety disorders. She takes a holistic approach combining medication management with psychotherapy.', education: ['MD Psychiatry – Ahmadu Bello University', 'Fellowship in Addiction Medicine – UCH Ibadan'], languages: ['English', 'Hausa', 'Arabic'], sessionTypes: ['Text Chat', 'Video Call'] },
  '4': { name: 'Dr. Tunde Adeyemi', title: 'Behavioral Therapist', specializations: ['Stress', 'Anxiety', 'Trauma'], experience: 5, rating: 4.7, reviews: 76, available: true, initials: 'TA', color: 'from-pink-400 to-rose-500', bio: 'Dr. Tunde Adeyemi is a behavioral therapist focused on helping clients overcome stress, anxiety, and trauma through evidence-based behavioral interventions and exposure therapy.', education: ['MSc Behavioral Psychology – University of Lagos', 'BSc Psychology – Obafemi Awolowo University'], languages: ['English', 'Yoruba'], sessionTypes: ['Text Chat', 'Voice Call', 'Video Call'] },
  '5': { name: 'Dr. Ngozi Eze', title: 'Family Therapist', specializations: ['Relationships', 'Grief', 'Depression'], experience: 9, rating: 4.8, reviews: 143, available: true, initials: 'NE', color: 'from-amber-400 to-orange-500', bio: 'Dr. Ngozi Eze is a family therapist with 9 years of experience helping families and couples navigate relationship challenges, grief, and depression. She uses systemic and narrative therapy approaches.', education: ['MSc Family Therapy – University of Benin', 'BSc Psychology – Delta State University'], languages: ['English', 'Igbo', 'Urhobo'], sessionTypes: ['Text Chat', 'Video Call'] },
  '6': { name: 'Dr. Kwame Asante', title: 'Trauma Specialist', specializations: ['Trauma', 'Anxiety', 'Stress'], experience: 11, rating: 5.0, reviews: 189, available: false, initials: 'KA', color: 'from-violet-400 to-indigo-500', bio: 'Dr. Kwame Asante is a trauma specialist with 11 years of experience using EMDR and somatic therapies to help clients heal from complex trauma, PTSD, and chronic stress.', education: ['PhD Trauma Psychology – University of Cape Town', 'MSc Clinical Psychology – University of Ghana'], languages: ['English', 'Twi', 'French'], sessionTypes: ['Text Chat', 'Voice Call', 'Video Call'] },
}

export default function TherapistDetailPage() {
  const { id } = useParams<{ id: string }>()
  const therapist = THERAPISTS[id || '1'] || THERAPISTS['1']

  return (
    <div className="min-h-screen bg-neutral-50 pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">

        <Link to="/therapists" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-sky-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Therapists
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-4"
          >
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 text-center">
              <div className="relative inline-block mb-4">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${therapist.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg mx-auto`}>
                  {therapist.initials}
                </div>
                <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${therapist.available ? 'bg-green-400' : 'bg-neutral-300'}`} />
              </div>
              <h1 className="text-xl font-bold text-neutral-900">{therapist.name}</h1>
              <p className="text-sm text-neutral-500 mb-3">{therapist.title}</p>
              <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${therapist.available ? 'bg-green-50 text-green-600' : 'bg-neutral-100 text-neutral-500'}`}>
                {therapist.available ? '● Available Now' : '● Currently Busy'}
              </span>

              <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-neutral-100">
                <div className="text-center">
                  <p className="text-lg font-bold text-neutral-900">{therapist.rating}</p>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(therapist.rating) ? 'text-amber-400 fill-amber-400' : 'text-neutral-200'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-400">{therapist.reviews} reviews</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-neutral-900">{therapist.experience}</p>
                  <p className="text-xs text-neutral-400">Years exp.</p>
                </div>
              </div>
            </div>

            {/* Session Types */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100">
              <h3 className="font-semibold text-neutral-800 mb-3 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-sky-500" /> Session Types
              </h3>
              <div className="space-y-2">
                {therapist.sessionTypes.map((type: string) => (
                  <div key={type} className="flex items-center gap-2 text-sm text-neutral-600">
                    <CheckCircle className="w-4 h-4 text-green-500" /> {type}
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-100">
              <h3 className="font-semibold text-neutral-800 mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {therapist.languages.map((lang: string) => (
                  <span key={lang} className="text-xs bg-sky-50 text-sky-600 px-2.5 py-1 rounded-full font-medium">{lang}</span>
                ))}
              </div>
            </div>

            {/* Book Button */}
            <Link
              to="/sessions"
              className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-semibold shadow hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <Calendar className="w-5 h-5" /> Book a Session
            </Link>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Bio */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
              <h2 className="text-lg font-bold text-neutral-800 mb-3">About</h2>
              <p className="text-neutral-600 leading-relaxed">{therapist.bio}</p>
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
              <h2 className="text-lg font-bold text-neutral-800 mb-3">Specializations</h2>
              <div className="flex flex-wrap gap-2">
                {therapist.specializations.map((s: string) => (
                  <span key={s} className="px-3 py-1.5 bg-gradient-to-r from-sky-50 to-blue-50 text-sky-700 rounded-xl text-sm font-medium border border-sky-100">{s}</span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
              <h2 className="text-lg font-bold text-neutral-800 mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" /> Education & Credentials
              </h2>
              <div className="space-y-2">
                {therapist.education.map((edu: string) => (
                  <div key={edu} className="flex items-start gap-2 text-sm text-neutral-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    {edu}
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
              <h2 className="text-lg font-bold text-neutral-800 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-500" /> Availability
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                  <div key={day} className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm ${i < 5 ? 'bg-green-50 text-green-700' : 'bg-neutral-50 text-neutral-400'}`}>
                    <span className="font-medium">{day}</span>
                    <span>{i < 5 ? '9am – 5pm' : 'Unavailable'}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
