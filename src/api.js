import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',  // URL de ton backend Django
});

export default api;
 