import apiClient from '../config/api';

export interface MoodEntry {
  id?: string;
  mood: number; // 1-5
  note?: string;
  date: string; // ISO date string YYYY-MM-DD
  createdAt?: string;
}

export interface MoodLog {
  entries: MoodEntry[];
}

class MoodService {
  async saveMood(entry: Omit<MoodEntry, 'id' | 'createdAt'>): Promise<MoodEntry> {
    const response = await apiClient.post('/mood', entry);
    return response.data.data;
  }

  async getMoodLogs(days = 30): Promise<MoodEntry[]> {
    const response = await apiClient.get(`/mood?days=${days}`);
    return response.data.data || [];
  }
}

export default new MoodService();
