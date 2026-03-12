import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

const authHeader = (token) => ({ Authorization: `Bearer ${token}` });

const normalizeApiError = (error) => {
  if (!error.response) {
    return new Error('Unable to reach the server. Please check your connection and try again.');
  }

  const { data, status } = error.response;
  const message =
    data?.message ||
    data?.error ||
    (status >= 500
      ? 'Something went wrong on our side. Please try again in a moment.'
      : 'We could not process your request. Please review your input and try again.');

  const normalizedError = new Error(message);
  normalizedError.status = status;
  normalizedError.details = data;

  return normalizedError;
};

const request = async (operation) => {
  try {
    const response = await operation();
    return response.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};

export const registerUser = async (payload) => {
  return request(() => api.post('/auth/register', payload));
};

export const loginUser = async (payload) => {

  return request(() => api.post('/auth/login', payload));
};

export const getMembers = async (token) => {
  return request(() =>
    api.get('/members', {
      headers: authHeader(token),
    }),
  );
};

export const getMemberById = async (token, memberId) => {
  return request(() =>
    api.get(`/members/${memberId}`, {
      headers: authHeader(token),
    }),
  );
};

export const createMember = async (token, payload) => {
  return request(() =>
    api.post('/members', payload, {
      headers: authHeader(token),
    }),
  );
};

export const updateMember = async (token, memberId, payload) => {
  return request(() =>
    api.put(`/members/${memberId}`, payload, {
      headers: authHeader(token),
    }),
  );
};

export const deleteMember = async (token, memberId) => {
  return request(() =>
    api.delete(`/members/${memberId}`, {
      headers: authHeader(token),
    }),
  );
};

export const getEvents = async (token) => {
  return request(() =>
    api.get('/events', {
      headers: authHeader(token),
    }),
  );
};

export const getEventById = async (token, eventId) => {
  return request(() =>
    api.get(`/events/${eventId}`, {
      headers: authHeader(token),
    }),
  );
};

export const createEvent = async (token, payload) => {
  return request(() =>
    api.post('/events', payload, {
      headers: authHeader(token),
    }),
  );
};

export const updateEvent = async (token, eventId, payload) => {
  return request(() =>
    api.put(`/events/${eventId}`, payload, {
      headers: authHeader(token),
    }),
  );
};

export const deleteEvent = async (token, eventId) => {
  return request(() =>
    api.delete(`/events/${eventId}`, {
      headers: authHeader(token),
    }),
  );
};

export const registerForEvent = async (token, payload) => {
  return request(() =>
    api.post('/events/register', payload, {
      headers: authHeader(token),
    }),
  );
};

export const getAssignments = async (token) => {
  return request(() =>
    api.get('/assignments', {
      headers: authHeader(token),
    }),
  );
};

export const createAssignment = async (token, payload) => {
  return request(() =>
    api.post('/assignments', payload, {
      headers: authHeader(token),
    }),
  );
};

export const deleteAssignment = async (token, assignmentId) => {
  return request(() =>
    api.delete(`/assignments/${assignmentId}`, {
      headers: authHeader(token),
    }),
  );
};

export default api;