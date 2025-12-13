import apiClient from '../config/api';

export interface Therapist {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  specializations: string[];
  bio: string;
  experience_years: number;
  rating: number;
  availability: boolean;
  profile_image?: string;
}

class TherapistService {
  async getAllTherapists(): Promise<Therapist[]> {
    const response = await apiClient.get('/therapists');
    return response.data;
  }

  async getTherapistById(id: string): Promise<Therapist> {
    const response = await apiClient.get(`/therapists/${id}`);
    return response.data;
  }

  async searchTherapists(query: string): Promise<Therapist[]> {
    const response = await apiClient.get('/therapists/search', {
      params: { q: query }
    });
    return response.data;
  }

  async filterTherapists(filters: {
    specialization?: string;
    minRating?: number;
    availability?: boolean;
  }): Promise<Therapist[]> {
    const response = await apiClient.get('/therapists/filter', {
      params: filters
    });
    return response.data;
  }
}

export default new TherapistService();
