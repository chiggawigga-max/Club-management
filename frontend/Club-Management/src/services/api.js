import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

const authHeader = (token) => ({ Authorization: `Bearer ${token}` });

export const registerUser = async (payload) => {
  const response = await api.post('/auth/register', payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await api.post('/auth/login', payload);
  return response.data;
};

export const getMembers = async (token) => {
  const response = await api.get('/members', {
    headers: authHeader(token),
  });
  return response.data;
};

export default api;