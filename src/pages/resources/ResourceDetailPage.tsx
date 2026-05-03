import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Eye, Bookmark, BookmarkCheck, Share2, MessageCircle } from 'lucide-react'
import { RESOURCES } from '../../data/resources'
import { useBookmarks } from '../../hooks/useBookmarks'
import toast from 'react-hot-toast'

export default function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const resource = RESOURCES.find(r => r.id === id)

  const related = RESOURCES.filter(r => r.id !== id && r.category === resource?.category).slice(0, 3)

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-500 mb-4">Resource not found.</p>
          <Link to="/resources" className="text-sky-500 hover:underline">Back to Resources</Link>
        </div>
      </div>
    )
  }

  // Render markdown-style bold text
  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h3 key={i} className="text-lg font-bold text-neutral-900 mt-6 mb-2">{line.replace(/\*\*/g, '')}</h3>
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="text-neutral-700 leading-relaxed ml-4">{line.replace(/^- /, '')}</li>
      }
      if (line.trim() === '') return <br key={i} />
      // Inline bold
      const parts = line.split(/\*\*(.*?)\*\*/g)
      return (
        <p key={i} className="text-neutral-700 leading-relaxed">
          {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
        </p>
      )
    })
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">

        <Link to="/resources" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-sky-600 transition-colors mt-6 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Resources
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-neutral-100">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-sky-50 text-sky-600 rounded-full">{resource.type}</span>
                  <span className="text-xs text-neutral-400">{resource.category}</span>
                </div>
                <h1 className="text-2xl font-bold text-neutral-900 mb-3 leading-tight">{resource.title}</h1>
                <p className="text-neutral-500 text-sm mb-4">{resource.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-neutral-400">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {resource.readTime} min read</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {resource.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(resource.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                        isBookmarked(resource.id)
                          ? 'bg-sky-50 border-sky-200 text-sky-600'
                          : 'border-neutral-200 text-neutral-500 hover:border-sky-200 hover:text-sky-500'
                      }`}
                    >
                      {isBookmarked(resource.id)
                        ? <><BookmarkCheck className="w-3.5 h-3.5" /> Saved</>
                        : <><Bookmark className="w-3.5 h-3.5" /> Save</>
                      }
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-neutral-200 text-neutral-500 hover:border-neutral-300 transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5" /> Share
                    </button>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6 prose prose-sm max-w-none">
                <div className="space-y-1">
                  {renderContent(resource.content)}
                </div>
              </div>

              {/* Tags */}
              <div className="px-6 pb-6">
                <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-100">
                  {resource.tags.map(tag => (
                    <span key={tag} className="text-xs bg-neutral-100 text-neutral-500 px-2.5 py-1 rounded-full">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            {/* CTA */}
            <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl p-5 text-white">
              <MessageCircle className="w-8 h-8 mb-3 opacity-80" />
              <h3 className="font-bold mb-2">Need More Support?</h3>
              <p className="text-sm text-white/80 mb-4">Talk to a licensed counselor about what you've read.</p>
              <Link
                to="/sessions"
                className="block text-center py-2 bg-white text-violet-600 rounded-xl text-sm font-semibold hover:shadow-md transition-all"
              >
                Book a Session
              </Link>
            </div>

            {/* Related Resources */}
            {related.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-5">
                <h3 className="font-bold text-neutral-800 mb-3 text-sm">Related Resources</h3>
                <div className="space-y-3">
                  {related.map(r => (
                    <Link
                      key={r.id}
                      to={`/resources/${r.id}`}
                      className="block group"
                    >
                      <p className="text-sm font-medium text-neutral-700 group-hover:text-sky-600 transition-colors line-clamp-2">{r.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
                        <Clock className="w-3 h-3" /> {r.readTime} min
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
