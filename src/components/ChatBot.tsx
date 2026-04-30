import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Loader2, Bot, User, Minimize2 } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  text: string
  timestamp: Date
}

const SYSTEM_PROMPT = `You are Welly, a compassionate and supportive mental wellness assistant for MentWel — a mental health platform serving users in Nigeria and Africa. 

Your role is to:
- Provide emotional support, active listening, and encouragement
- Offer evidence-based coping strategies for stress, anxiety, and low mood
- Guide users toward professional help when needed
- Suggest MentWel features like mood tracking, self-assessments, and therapist sessions
- Respond with warmth, empathy, and cultural sensitivity

Important rules:
- Never diagnose medical or psychiatric conditions
- Always recommend professional help for serious concerns
- For crisis situations (self-harm, suicidal thoughts), immediately provide emergency numbers: Nigeria Emergency: 112, Suicide Prevention: 0800-800-2000
- Keep responses concise (2-4 sentences) unless the user needs more detail
- Use a warm, friendly tone — not clinical or robotic`

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

const QUICK_PROMPTS = [
  "I'm feeling anxious today",
  "How can I manage stress?",
  "I need someone to talk to",
  "Tips for better sleep",
]

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      text: "Hi! I'm Welly, your mental wellness companion 💚 How are you feeling today? I'm here to listen and support you.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, isMinimized])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen, isMinimized])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Build conversation history for context
      const history = messages
        .slice(1) // skip the initial greeting
        .map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }],
        }))

      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [
            ...history,
            { role: 'user', parts: [{ text: text.trim() }] },
          ],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 300,
          },
        }),
      })

      if (!response.ok) throw new Error('API request failed')

      const data = await response.json()
      const replyText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm here for you. Could you tell me a bit more about how you're feeling?"

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: replyText,
          timestamp: new Date(),
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: "I'm having trouble connecting right now. Please try again in a moment. If you need immediate support, call 112 (Nigeria Emergency) or 0800-800-2000 (Crisis Line).",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <>
      {/* Floating Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full shadow-2xl flex items-center justify-center hover:shadow-violet-500/40 hover:scale-110 transition-all"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-neutral-200 flex flex-col overflow-hidden"
            style={{ height: isMinimized ? 'auto' : '520px' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Welly</p>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <p className="text-white/80 text-xs">Mental Wellness Assistant</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
                  aria-label="Minimize"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {/* Avatar */}
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${msg.role === 'assistant' ? 'bg-gradient-to-br from-violet-500 to-fuchsia-500' : 'bg-gradient-to-br from-sky-500 to-blue-600'}`}>
                        {msg.role === 'assistant'
                          ? <Bot className="w-3.5 h-3.5 text-white" />
                          : <User className="w-3.5 h-3.5 text-white" />
                        }
                      </div>

                      {/* Bubble */}
                      <div className={`max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                        <div className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-tr-sm'
                            : 'bg-white text-neutral-800 shadow-sm border border-neutral-100 rounded-tl-sm'
                        }`}>
                          {msg.text}
                        </div>
                        <span className="text-xs text-neutral-400 px-1">{formatTime(msg.timestamp)}</span>
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isLoading && (
                    <div className="flex gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shrink-0">
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-neutral-100 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts */}
                {messages.length <= 1 && (
                  <div className="px-3 py-2 flex gap-2 flex-wrap border-t border-neutral-100 bg-white shrink-0">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="text-xs px-3 py-1.5 bg-violet-50 text-violet-600 rounded-full border border-violet-200 hover:bg-violet-100 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="p-3 border-t border-neutral-100 bg-white shrink-0">
                  <div className="flex gap-2 items-center">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      disabled={isLoading}
                      className="flex-1 px-4 py-2.5 bg-neutral-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:bg-white transition-all disabled:opacity-50"
                    />
                    <button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || isLoading}
                      className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center text-white hover:shadow-md hover:scale-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shrink-0"
                    >
                      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-neutral-400 text-center mt-2">
                    Welly is an AI assistant, not a licensed therapist.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
