import { useState, useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { 
  ArrowLeft, Send, Paperclip, Smile, MoreVertical, 
  Phone, Video, Info, X, Check, CheckCheck, Loader2 
} from 'lucide-react'
import chatService, { type ChatMessage, type ChatSession } from '../../services/chat.service'

export default function ChatWindowPage() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const navigate = useNavigate()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [session, setSession] = useState<ChatSession | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [typing, setTyping] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    if (sessionId) {
      loadChatData()
    }
  }, [sessionId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadChatData = async () => {
    if (!sessionId) return

    try {
      const [sessionData, messagesData] = await Promise.all([
        chatService.getChatSessions().then(sessions => 
          sessions.find(s => s.id === sessionId) || null
        ),
        chatService.getMessages(sessionId)
      ])

      setSession(sessionData)
      setMessages(messagesData)

      // Mark messages as read
      if (sessionData?.unreadCount && sessionData.unreadCount > 0) {
        await chatService.markAsRead(sessionId)
      }
    } catch (error) {
      toast.error('Failed to load chat')
    } finally {
      setLoading(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!newMessage.trim() || !sessionId || sending) return

    const messageContent = newMessage.trim()
    setNewMessage('')
    setSending(true)

    try {
      const message = await chatService.sendMessage(sessionId, messageContent)
      setMessages(prev => [...prev, message])
      
      // Update session's last message
      if (session) {
        setSession(prev => prev ? {
          ...prev,
          lastMessage: messageContent,
          lastMessageAt: message.timestamp
        } : null)
      }
    } catch (error) {
      toast.error('Failed to send message')
      setNewMessage(messageContent) // Restore message on error
    } finally {
      setSending(false)
      inputRef.current?.focus()
    }
  }

  const handleEndSession = async () => {
    if (!sessionId) return

    try {
      await chatService.endChatSession(sessionId)
      toast.success('Chat session ended')
      navigate('/chat')
    } catch (error) {
      toast.error('Failed to end session')
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-16">
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center py-20">
            <p className="text-neutral-500 dark:text-neutral-400 mb-4">Chat session not found</p>
            <Link to="/chat" className="text-sky-500 hover:underline">Back to Messages</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-16">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 sticky top-16 z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link
                to="/chat"
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </Link>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-fuchsia-600 rounded-full flex items-center justify-center text-white font-bold">
                    {session.counselor?.name?.[0] || 'C'}
                  </div>
                  {session.counselor?.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                  )}
                </div>
                
                <div>
                  <h2 className="font-semibold text-neutral-900">
                    {session.counselor?.name || 'Unknown Counselor'}
                  </h2>
                  <p className="text-xs text-neutral-500">
                    {session.counselor?.isOnline ? 'Online' : 'Offline'}
                    {typing && ' • Typing...'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                <Phone className="w-5 h-5 text-neutral-600" />
              </button>
              <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                <Video className="w-5 h-5 text-neutral-600" />
              </button>
              <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                <Info className="w-5 h-5 text-neutral-600" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-neutral-600" />
                </button>
                
                <AnimatePresence>
                  {showOptions && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 min-w-[150px]"
                    >
                      <button
                        onClick={handleEndSession}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        End Session
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="py-4 min-h-[calc(100vh-200px)]">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-fuchsia-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                Start the conversation
              </h3>
              <p className="text-neutral-500">
                Send a message to begin your session with {session.counselor?.name}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => {
                const isCurrentUser = message.senderType === 'user'
                const showDate = index === 0 || 
                  formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp)
                
                return (
                  <div key={message.id}>
                    {showDate && (
                      <div className="text-center my-4">
                        <span className="text-xs text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full">
                          {formatDate(message.timestamp)}
                        </span>
                      </div>
                    )}
                    
                    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md ${
                        isCurrentUser 
                          ? 'bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white' 
                          : 'bg-white border border-neutral-200 text-neutral-800'
                      } rounded-2xl px-4 py-2 shadow-sm`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <div className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                          isCurrentUser ? 'text-white/70' : 'text-neutral-400'
                        }`}>
                          <span>{formatTime(message.timestamp)}</span>
                          {isCurrentUser && (
                            message.read ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
      {session.status === 'active' && (
        <div className="bg-white border-t border-neutral-200 sticky bottom-0">
          <div className="container mx-auto px-4 max-w-4xl py-4">
            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
              <button
                type="button"
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <Paperclip className="w-5 h-5 text-neutral-600" />
              </button>
              
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-sky-500 transition-all"
                  disabled={sending}
                />
              </div>
              
              <button
                type="button"
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <Smile className="w-5 h-5 text-neutral-600" />
              </button>
              
              <button
                type="submit"
                disabled={!newMessage.trim() || sending}
                className="p-3 bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {sending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {session.status === 'ended' && (
        <div className="bg-neutral-100 border-t border-neutral-200">
          <div className="container mx-auto px-4 max-w-4xl py-6 text-center">
            <p className="text-neutral-600 mb-4">This chat session has ended</p>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-fuchsia-600 text-white rounded-xl font-medium"
            >
              Back to Messages
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
