import apiClient from '../config/api'

export interface ChatMessage {
  id: string
  sessionId: string
  senderId: string
  senderType: 'user' | 'counselor'
  content: string
  timestamp: string
  read: boolean
  type: 'text' | 'image' | 'file'
}

export interface ChatSession {
  id: string
  userId: string
  counselorId: string
  status: 'active' | 'ended' | 'pending'
  startedAt: string
  lastMessageAt?: string
  counselor?: {
    id: string
    name: string
    avatar?: string
    isOnline: boolean
  }
  unreadCount: number
  lastMessage?: string
}

export interface Counselor {
  id: string
  name: string
  avatar?: string
  isOnline: boolean
  lastSeen?: string
  specialties: string[]
  rating: number
  experience: number
}

class ChatService {
  // Get user's chat sessions
  async getChatSessions(): Promise<ChatSession[]> {
    // For development, return mock data immediately
    // Remove try-catch to avoid API call delays
    return this.getMockSessions()
    
    // Uncomment for production:
    // try {
    //   const response = await apiClient.get('/chat/sessions')
    //   return response.data.data
    // } catch (error) {
    //   console.error('Failed to fetch chat sessions:', error)
    //   return this.getMockSessions()
    // }
  }

  // Get messages for a specific session
  async getMessages(sessionId: string): Promise<ChatMessage[]> {
    // For development, return mock data immediately
    return this.getMockMessages(sessionId)
    
    // Uncomment for production:
    // try {
    //   const response = await apiClient.get(`/chat/sessions/${sessionId}/messages`)
    //   return response.data.data
    // } catch (error) {
    //   console.error('Failed to fetch messages:', error)
    //   return this.getMockMessages(sessionId)
    // }
  }

  // Send a message
  async sendMessage(sessionId: string, content: string, type: 'text' | 'image' | 'file' = 'text'): Promise<ChatMessage> {
    try {
      const response = await apiClient.post(`/chat/sessions/${sessionId}/messages`, {
        content,
        type
      })
      return response.data.data
    } catch (error) {
      console.error('Failed to send message:', error)
      // Return mock message for development
      return this.getMockMessage(sessionId, content, type)
    }
  }

  // Start a new chat session with a counselor
  async startChatSession(counselorId: string): Promise<ChatSession> {
    try {
      const response = await apiClient.post('/chat/sessions', {
        counselorId
      })
      return response.data.data
    } catch (error) {
      console.error('Failed to start chat session:', error)
      // Return mock session for development
      return this.getMockSession(counselorId)
    }
  }

  // End a chat session
  async endChatSession(sessionId: string): Promise<void> {
    try {
      await apiClient.post(`/chat/sessions/${sessionId}/end`)
    } catch (error) {
      console.error('Failed to end chat session:', error)
    }
  }

  // Mark messages as read
  async markAsRead(sessionId: string): Promise<void> {
    try {
      await apiClient.post(`/chat/sessions/${sessionId}/read`)
    } catch (error) {
      console.error('Failed to mark messages as read:', error)
    }
  }

  // Get available counselors for chat
  async getAvailableCounselors(): Promise<Counselor[]> {
    // For development, return mock data immediately
    return this.getMockCounselors()
    
    // Uncomment for production:
    // try {
    //   const response = await apiClient.get('/chat/counselors/available')
    //   return response.data.data
    // } catch (error) {
    //   console.error('Failed to fetch available counselors:', error)
    //   return this.getMockCounselors()
    // }
  }

  // Mock data methods for development
  private getMockSessions(): ChatSession[] {
    return [
      {
        id: '1',
        userId: 'user1',
        counselorId: 'counselor1',
        status: 'active',
        startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        lastMessageAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        counselor: {
          id: 'counselor1',
          name: 'Dr. Amara Osei',
          avatar: undefined,
          isOnline: true
        },
        unreadCount: 2,
        lastMessage: 'How are you feeling today?'
      },
      {
        id: '2',
        userId: 'user1',
        counselorId: 'counselor2',
        status: 'ended',
        startedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        lastMessageAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
        counselor: {
          id: 'counselor2',
          name: 'Dr. Chidi Nwosu',
          avatar: undefined,
          isOnline: false
        },
        unreadCount: 0,
        lastMessage: 'Take care and see you next time!'
      }
    ]
  }

  private getMockMessages(sessionId: string): ChatMessage[] {
    return [
      {
        id: '1',
        sessionId,
        senderId: 'counselor1',
        senderType: 'counselor',
        content: 'Hello! I\'m here to support you. How are you feeling today?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: true,
        type: 'text'
      },
      {
        id: '2',
        sessionId,
        senderId: 'user1',
        senderType: 'user',
        content: 'I\'ve been feeling quite anxious lately...',
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
        read: true,
        type: 'text'
      },
      {
        id: '3',
        sessionId,
        senderId: 'counselor1',
        senderType: 'counselor',
        content: 'I understand. Can you tell me more about what\'s been causing your anxiety?',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        read: true,
        type: 'text'
      },
      {
        id: '4',
        sessionId,
        senderId: 'counselor1',
        senderType: 'counselor',
        content: 'How are you feeling today?',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        read: false,
        type: 'text'
      }
    ]
  }

  private getMockMessage(sessionId: string, content: string, type: 'text' | 'image' | 'file'): ChatMessage {
    return {
      id: Date.now().toString(),
      sessionId,
      senderId: 'user1',
      senderType: 'user',
      content,
      timestamp: new Date().toISOString(),
      read: false,
      type
    }
  }

  private getMockSession(counselorId: string): ChatSession {
    return {
      id: Date.now().toString(),
      userId: 'user1',
      counselorId,
      status: 'active',
      startedAt: new Date().toISOString(),
      counselor: {
        id: counselorId,
        name: 'Dr. Amara Osei',
        avatar: undefined,
        isOnline: true
      },
      unreadCount: 0
    }
  }

  private getMockCounselors(): Counselor[] {
    return [
      {
        id: 'counselor1',
        name: 'Dr. Amara Osei',
        avatar: undefined,
        isOnline: true,
        specialties: ['Anxiety', 'Depression', 'Trauma'],
        rating: 4.9,
        experience: 8
      },
      {
        id: 'counselor2',
        name: 'Dr. Chidi Nwosu',
        avatar: undefined,
        isOnline: false,
        lastSeen: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        specialties: ['Relationships', 'Stress', 'Grief'],
        rating: 4.8,
        experience: 6
      },
      {
        id: 'counselor3',
        name: 'Dr. Fatima Al-Hassan',
        avatar: undefined,
        isOnline: true,
        specialties: ['Depression', 'Addiction', 'Anxiety'],
        rating: 4.9,
        experience: 12
      }
    ]
  }
}

export default new ChatService()
