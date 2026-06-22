import { lazy, Suspense, useState } from 'react'
import { MessageCircle } from 'lucide-react'

// Lazy-load the heavy ChatBot implementation only after the user opens it.
// Saves ~150 KB of JS (framer-motion + AI chat widget code) on every page
// load including /login and /register.
const ChatBotImpl = lazy(() => import('./ChatBot'))

export default function ChatBotLauncher() {
  const [opened, setOpened] = useState(false)

  if (opened) {
    return (
      <Suspense fallback={null}>
        <ChatBotImpl initialOpen onClose={() => setOpened(false)} />
      </Suspense>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setOpened(true)}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-full shadow-2xl flex items-center justify-center hover:shadow-violet-500/40 hover:scale-110 transition-all"
      aria-label="Open chat"
    >
      <MessageCircle className="w-6 h-6 text-white" />
      <span className="absolute inset-0 rounded-full bg-violet-500 animate-ping opacity-20" />
    </button>
  )
}
