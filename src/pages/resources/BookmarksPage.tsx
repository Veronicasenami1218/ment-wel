import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Bookmark, Clock, Eye, BookmarkCheck, BookOpen } from 'lucide-react'
import { RESOURCES } from '../../data/resources'
import { useBookmarks } from '../../hooks/useBookmarks'

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useBookmarks()
  const saved = RESOURCES.filter(r => bookmarks.includes(r.id))

  return (
    <div className="min-h-screen bg-neutral-50 pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">

        <div className="py-8">
          <Link to="/resources" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-sky-600 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2 flex items-center gap-3">
            <Bookmark className="w-7 h-7 text-sky-500" /> My Bookmarks
          </h1>
          <p className="text-neutral-500">{saved.length} saved resource{saved.length !== 1 ? 's' : ''}</p>
        </div>

        {saved.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-12 shadow-sm border border-neutral-100 text-center"
          >
            <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
            <p className="font-semibold text-neutral-600 mb-2">No bookmarks yet</p>
            <p className="text-sm text-neutral-400 mb-6">Save resources you want to revisit by clicking the bookmark icon.</p>
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white rounded-xl font-medium text-sm hover:shadow-md transition-all"
            >
              Browse Resources
            </Link>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {saved.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-5 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-600">{r.type}</span>
                    <span className="text-xs text-neutral-400">{r.category}</span>
                  </div>
                  <button
                    onClick={() => toggleBookmark(r.id)}
                    className="text-sky-500 hover:text-neutral-400 transition-colors"
                    title="Remove bookmark"
                  >
                    <BookmarkCheck className="w-4 h-4" />
                  </button>
                </div>
                <Link to={`/resources/${r.id}`}>
                  <h3 className="font-bold text-neutral-900 text-sm mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">{r.title}</h3>
                </Link>
                <p className="text-xs text-neutral-500 mb-3 line-clamp-2">{r.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-neutral-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {r.readTime} min</span>
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {r.views.toLocaleString()}</span>
                  </div>
                  <Link to={`/resources/${r.id}`} className="text-xs text-sky-500 font-medium hover:underline">Read →</Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
