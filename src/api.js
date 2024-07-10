// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/apis/', // URL de votre backend Django
});

export const getUsers = () => api.get('/user/users/');
export const getUser = (id) => api.get(`/user/users/${id}/`);
export const createUser = (data) => api.post('/user/users/', data);
export const updateUser = (id, data) => api.put(`/user/users/${id}/`, data);
export const deleteUser = (id) => api.delete(`/user/users/${id}/`);

export default api;
