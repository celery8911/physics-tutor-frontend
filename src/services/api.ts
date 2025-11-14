import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 60000,
});

export interface PhysicsQueryRequest {
  problemText?: string;
  imageBase64?: string;
}

export interface PhysicsQueryResponse {
  text: string;
}

export const physicsTutorAPI = {
  async askQuestion(request: PhysicsQueryRequest): Promise<PhysicsQueryResponse> {
    const response = await api.post<PhysicsQueryResponse>('/physics/ask', request);
    return response.data;
  },
};

export default api;
