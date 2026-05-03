import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, BookOpen, Clock, Eye, Bookmark, BookmarkCheck } from 'lucide-react'
import { RESOURCES, ResourceCategory } from '../../data/resources'
import { useBookmarks } from '../../hooks/useBookmarks'

const CATEGORIES: ResourceCategory[] = ['All', 'Stress', 'Anxiety', 'Depression', 'Self-Care', 'Mindfulness', 'Relationships']

const TYPE_COLORS: Record<string, string> = {
  Article:  'bg-sky-50 text-sky-600',
  Video:    'bg-purple-50 text-purple-600',
  Guide:    'bg-emerald-50 text-emerald-600',
  Exercise: 'bg-amber-50 text-amber-600',
}

const CATEGORY_COLORS: Record<string, string> = {
  Stress:        'from-amber-500 to-orange-500',
  Anxiety:       'from-purple-500 to-fuchsia-600',
  Depression:    'from-sky-500 to-blue-600',
  'Self-Care':   'from-pink-500 to-rose-500',
  Mindfulness:   'from-teal-500 to-cyan-600',
  Relationships: 'from-violet-500 to-indigo-600',
}

export default function ResourcesPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<ResourceCategory>('All')
  const { bookmarks, toggleBookmark } = useBookmarks()

  const filtered = useMemo(() => {
    return RESOURCES.filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase()) ||
        r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      const matchesCategory = activeCategory === 'All' || r.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  const featured = RESOURCES.filter(r => r.featured)

  return (
    <div className="min-h-screen bg-neutral-50 pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-10">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Resource Library</h1>
          <p className="text-neutral-500">Articles, guides, and exercises curated by mental health professionals.</p>
        </motion.div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by title, keyword, or tag..."
              className="w-full pl-10 pr-4 py-2.5 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-sky-500 transition-all text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white shadow'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured — only show when no search/filter active */}
        {activeCategory === 'All' && !search && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-neutral-800 mb-4">Featured Resources</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="relative bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all group"
                >
                  <div className={`h-2 bg-gradient-to-r ${CATEGORY_COLORS[r.category] || 'from-sky-500 to-blue-600'}`} />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_COLORS[r.type]}`}>{r.type}</span>
                      <button
                        onClick={() => toggleBookmark(r.id)}
                        className="text-neutral-400 hover:text-sky-500 transition-colors"
                      >
                        {bookmarks.includes(r.id)
                          ? <BookmarkCheck className="w-4 h-4 text-sky-500" />
                          : <Bookmark className="w-4 h-4" />
                        }
                      </button>
                    </div>
                    <Link to={`/resources/${r.id}`}>
                      <h3 className="font-bold text-neutral-900 text-sm mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">{r.title}</h3>
                    </Link>
                    <p className="text-xs text-neutral-500 mb-3 line-clamp-2">{r.description}</p>
                    <div className="flex items-center gap-3 text-xs text-neutral-400">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {r.readTime} min</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {r.views.toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Resources */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-neutral-800">
              {activeCategory === 'All' && !search ? 'All Resources' : `Results (${filtered.length})`}
            </h2>
            <Link to="/bookmarks" className="text-sm text-sky-500 hover:underline flex items-center gap-1">
              <Bookmark className="w-3.5 h-3.5" /> My Bookmarks
            </Link>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-neutral-100">
              <BookOpen className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
              <p className="font-medium text-neutral-600">No resources found</p>
              <p className="text-sm text-neutral-400 mt-1">Try a different search term or category</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-5 hover:shadow-md hover:-translate-y-1 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${TYPE_COLORS[r.type]}`}>{r.type}</span>
                      <span className="text-xs text-neutral-400">{r.category}</span>
                    </div>
                    <button onClick={() => toggleBookmark(r.id)} className="text-neutral-400 hover:text-sky-500 transition-colors">
                      {bookmarks.includes(r.id)
                        ? <BookmarkCheck className="w-4 h-4 text-sky-500" />
                        : <Bookmark className="w-4 h-4" />
                      }
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
    </div>
  )
}
