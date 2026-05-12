import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { MessageCircle, Search, Plus, Clock, CheckCircle, User as UserIcon, Loader2 } from 'lucide-react'
import chatService, { type ChatSession, type Counselor } from '../../services/chat.service'

export default function ChatDashboardPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [availableCounselors, setAvailableCounselors] = useState<Counselor[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showCounselors, setShowCounselors] = useState(false)
  const [startingChat, setStartingChat] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [sessionsData, counselorsData] = await Promise.all([
        chatService.getChatSessions(),
        chatService.getAvailableCounselors()
      ])
      setSessions(sessionsData)
      setAvailableCounselors(counselorsData)
    } catch (error) {
      toast.error('Failed to load chat data')
    } finally {
      setLoading(false)
    }
  }

  const handleStartChat = async (counselorId: string) => {
    setStartingChat(counselorId)
    try {
      const session = await chatService.startChatSession(counselorId)
      setSessions(prev => [session, ...prev])
      toast.success('Chat session started!')
      // Navigate to the chat session
      window.location.href = `/chat/${session.id}`
    } catch (error) {
      toast.error('Failed to start chat session')
    } finally {
      setStartingChat(null)
    }
  }

  const handleToggleCounselors = () => {
    console.log('Toggle clicked, current state:', showCounselors)
    setShowCounselors(!showCounselors)
  }

  const filteredSessions = sessions.filter(session =>
    session.counselor?.name.toLowerCase().includes(search.toLowerCase())
  )

  const filteredCounselors = availableCounselors.filter(counselor =>
    counselor.name.toLowerCase().includes(search.toLowerCase()) ||
    counselor.specialties.some(spec => spec.toLowerCase().includes(search.toLowerCase()))
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Messages</h1>
              <p className="text-neutral-500 dark:text-neutral-400">Connect with your counselors and get support</p>
            </div>
            <button
              onClick={handleToggleCounselors}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white rounded-xl font-medium shadow hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={showCounselors ? "Search counselors..." : "Search conversations..."}
              className="w-full pl-10 pr-4 py-3 border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-xl focus:outline-none focus:border-sky-500 transition-all"
            />
          </div>
        </motion.div>

        {/* Toggle Tabs */}
        <div className="flex gap-2 mb-6 bg-white dark:bg-neutral-800 rounded-xl p-1 shadow-sm border border-neutral-100 dark:border-neutral-700">
          <button
            onClick={() => {
              console.log('Recent Chats clicked')
              setShowCounselors(false)
            }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              !showCounselors
                ? 'bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white shadow'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            Recent Chats
          </button>
          <button
            onClick={() => {
              console.log('Available Counselors clicked')
              setShowCounselors(true)
            }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              showCounselors
                ? 'bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white shadow'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            Available Counselors
          </button>
        </div>

        {/* Chat Sessions */}
        {!showCounselors && (
          <div className="space-y-3">
            {filteredSessions.length === 0 ? (
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-12 text-center shadow-sm border border-neutral-100 dark:border-neutral-700">
                <MessageCircle className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">No conversations yet</h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-4">Start your first conversation with a counselor</p>
                <button
                  onClick={() => setShowCounselors(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white rounded-xl font-medium text-sm"
                >
                  Find a Counselor
                </button>
              </div>
            ) : (
              filteredSessions.map((session) => (
                <Link
                  key={session.id}
                  to={`/chat/${session.id}`}
                  className="block"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-neutral-800 rounded-2xl p-4 shadow-sm border border-neutral-100 dark:border-neutral-700 hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-fuchsia-600 rounded-full flex items-center justify-center text-white font-bold">
                          {session.counselor?.name?.[0] || 'C'}
                        </div>
                        {session.counselor?.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                            {session.counselor?.name || 'Unknown Counselor'}
                          </h3>
                          <span className="text-xs text-neutral-400 dark:text-neutral-500">
                            {session.lastMessageAt ? 
                              new Date(session.lastMessageAt).toLocaleTimeString('en-US', { 
                                hour: 'numeric', 
                                minute: '2-digit' 
                              }) : 
                              new Date(session.startedAt).toLocaleDateString()
                            }
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            session.status === 'active' 
                              ? 'bg-green-50 text-green-600' 
                              : 'bg-neutral-100 text-neutral-500'
                          }`}>
                            {session.status === 'active' ? 'Active' : 'Ended'}
                          </span>
                          {session.unreadCount > 0 && (
                            <span className="bg-sky-500 text-white text-xs px-2 py-0.5 rounded-full">
                              {session.unreadCount} unread
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                          {session.lastMessage || 'No messages yet'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))
            )}
          </div>
        )}

        {/* Available Counselors */}
        {showCounselors && (
          <div className="space-y-3">
            {filteredCounselors.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-neutral-100">
                <UserIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">No counselors available</h3>
                <p className="text-neutral-500">Check back later for available counselors</p>
              </div>
            ) : (
              filteredCounselors.map((counselor) => (
                <motion.div
                  key={counselor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-fuchsia-600 rounded-full flex items-center justify-center text-white font-bold">
                        {counselor.name[0]}
                      </div>
                      {counselor.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-neutral-900">{counselor.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-amber-500">
                          <Clock className="w-3 h-3" />
                          {counselor.experience} years
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {counselor.specialties.map((spec) => (
                          <span key={spec} className="text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full">
                            {spec}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-neutral-500">
                          <span className="text-amber-400">★</span>
                          {counselor.rating}
                        </div>
                        
                        <button
                          onClick={() => handleStartChat(counselor.id)}
                          disabled={startingChat === counselor.id}
                          className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white rounded-lg font-medium text-sm hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {startingChat === counselor.id ? (
                            <>
                              <Loader2 className="w-3 h-3 animate-spin" />
                              Starting...
                            </>
                          ) : (
                            <>
                              <MessageCircle className="w-3 h-3" />
                              Start Chat
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  )
}
