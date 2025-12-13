import apiClient from '../config/api';

export interface Session {
  id: string;
  user_id: string;
  therapist_id: string;
  scheduled_at: string;
  duration: number;
  session_type: 'text' | 'voice' | 'video';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

export interface CreateSessionData {
  therapist_id: string;
  scheduled_at: string;
  duration: number;
  session_type: 'text' | 'voice' | 'video';
}

class SessionService {
  async getUserSessions(): Promise<Session[]> {
    const response = await apiClient.get('/sessions');
    return response.data;
  }

  async getSessionById(id: string): Promise<Session> {
    const response = await apiClient.get(`/sessions/${id}`);
    return response.data;
  }

  async createSession(data: CreateSessionData): Promise<Session> {
    const response = await apiClient.post('/sessions', data);
    return response.data;
  }

  async cancelSession(id: string): Promise<void> {
    await apiClient.patch(`/sessions/${id}/cancel`);
  }

  async completeSession(id: string, notes?: string): Promise<void> {
    await apiClient.patch(`/sessions/${id}/complete`, { notes });
  }
}

export default new SessionService();
