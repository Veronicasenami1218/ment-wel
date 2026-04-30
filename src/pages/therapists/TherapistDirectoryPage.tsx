import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Star, Clock, Filter, MessageCircle, Calendar } from 'lucide-react'

const SPECIALIZATIONS = ['All', 'Anxiety', 'Depression', 'Trauma', 'Relationships', 'Stress', 'Grief', 'Addiction']

const THERAPISTS = [
  { id: '1', name: 'Dr. Amara Osei', title: 'Clinical Psychologist', specializations: ['Anxiety', 'Depression', 'Trauma'], experience: 8, rating: 4.9, reviews: 124, available: true, initials: 'AO', color: 'from-sky-400 to-blue-500' },
  { id: '2', name: 'Dr. Chidi Nwosu', title: 'Counseling Psychologist', specializations: ['Relationships', 'Stress', 'Grief'], experience: 6, rating: 4.8, reviews: 98, available: true, initials: 'CN', color: 'from-purple-400 to-fuchsia-500' },
  { id: '3', name: 'Dr. Fatima Al-Hassan', title: 'Psychiatrist', specializations: ['Depression', 'Addiction', 'Anxiety'], experience: 12, rating: 4.9, reviews: 210, available: false, initials: 'FA', color: 'from-emerald-400 to-teal-500' },
  { id: '4', name: 'Dr. Tunde Adeyemi', title: 'Behavioral Therapist', specializations: ['Stress', 'Anxiety', 'Trauma'], experience: 5, rating: 4.7, reviews: 76, available: true, initials: 'TA', color: 'from-pink-400 to-rose-500' },
  { id: '5', name: 'Dr. Ngozi Eze', title: 'Family Therapist', specializations: ['Relationships', 'Grief', 'Depression'], experience: 9, rating: 4.8, reviews: 143, available: true, initials: 'NE', color: 'from-amber-400 to-orange-500' },
  { id: '6', name: 'Dr. Kwame Asante', title: 'Trauma Specialist', specializations: ['Trauma', 'Anxiety', 'Stress'], experience: 11, rating: 5.0, reviews: 189, available: false, initials: 'KA', color: 'from-violet-400 to-indigo-500' },
]

export default function TherapistDirectoryPage() {
  const [search, setSearch] = useState('')
  const [activeSpec, setActiveSpec] = useState('All')

  const filtered = THERAPISTS.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.title.toLowerCase().includes(search.toLowerCase())
    const matchesSpec = activeSpec === 'All' || t.specializations.includes(activeSpec)
    return matchesSearch && matchesSpec
  })

  return (
    <div className="min-h-screen bg-neutral-50 pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <h1 className="text-4xl font-bold text-neutral-900 mb-3">Find Your Therapist</h1>
          <p className="text-neutral-500 max-w-xl mx-auto">
            Browse our network of licensed, verified mental health professionals and find the right match for you.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or specialty..."
                className="w-full pl-10 pr-4 py-2.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-sky-500 transition-all text-sm"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-500">
              <Filter className="w-4 h-4" />
              <span>{filtered.length} therapists found</span>
            </div>
          </div>

          {/* Specialization filters */}
          <div className="flex flex-wrap gap-2">
            {SPECIALIZATIONS.map((spec) => (
              <button
                key={spec}
                onClick={() => setActiveSpec(spec)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeSpec === spec
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Therapist Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((therapist, i) => (
            <motion.div
              key={therapist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 hover:shadow-md hover:-translate-y-1 transition-all"
            >
              {/* Avatar & Status */}
              <div className="flex items-start justify-between mb-4">
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${therapist.color} flex items-center justify-center text-white text-lg font-bold shadow`}>
                    {therapist.initials}
                  </div>
                  <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${therapist.available ? 'bg-green-400' : 'bg-neutral-300'}`} />
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${therapist.available ? 'bg-green-50 text-green-600' : 'bg-neutral-100 text-neutral-500'}`}>
                  {therapist.available ? 'Available' : 'Busy'}
                </span>
              </div>

              <h3 className="font-bold text-neutral-900">{therapist.name}</h3>
              <p className="text-sm text-neutral-500 mb-3">{therapist.title}</p>

              {/* Specializations */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {therapist.specializations.map((s) => (
                  <span key={s} className="text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full font-medium">{s}</span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-neutral-500 mb-5">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-semibold text-neutral-700">{therapist.rating}</span>
                  <span>({therapist.reviews})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{therapist.experience} yrs exp</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  to={`/therapists/${therapist.id}`}
                  className="flex-1 text-center py-2 text-sm font-medium text-sky-600 border border-sky-200 rounded-xl hover:bg-sky-50 transition-colors"
                >
                  View Profile
                </Link>
                <Link
                  to="/sessions"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:shadow-md transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-neutral-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No therapists found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
