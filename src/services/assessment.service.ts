import apiClient from '../config/api';

export interface AssessmentQuestion {
  id: string;
  text: string;
  type: 'likert' | 'multiple_choice';
  options?: { value: number; label: string }[];
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  category: string;
  questionCount: number;
  estimatedMinutes: number;
  questions: AssessmentQuestion[];
}

export interface AssessmentResult {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  score: number;
  maxScore: number;
  percentage: number;
  severity: 'minimal' | 'mild' | 'moderate' | 'severe';
  interpretation: string;
  recommendations: string[];
  completedAt: string;
}

class AssessmentService {
  async getAssessments(): Promise<Assessment[]> {
    try {
      const response = await apiClient.get('/v1/assessments');
      return response.data.data || [];
    } catch {
      return [];
    }
  }

  async getAssessmentById(id: string): Promise<Assessment | null> {
    try {
      const response = await apiClient.get(`/v1/assessments/${id}`);
      return response.data.data;
    } catch {
      return null;
    }
  }

  async submitAssessment(assessmentId: string, answers: Record<string, number>): Promise<AssessmentResult> {
    const response = await apiClient.post(`/v1/assessments/${assessmentId}/submit`, { answers });
    return response.data.data;
  }

  async getHistory(): Promise<AssessmentResult[]> {
    try {
      const response = await apiClient.get('/v1/assessments/history');
      return response.data.data || [];
    } catch {
      return [];
    }
  }

  async getResultById(resultId: string): Promise<AssessmentResult | null> {
    try {
      const response = await apiClient.get(`/v1/assessments/results/${resultId}`);
      return response.data.data;
    } catch {
      return null;
    }
  }
}

export default new AssessmentService();
