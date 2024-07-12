// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Remplacez avec l'URL de votre API Django

export const fetchDataFromAPI = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`); 
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { results: [] }; // Gérer l'erreur comme nécessaire et retourner un format compatible
  }
};
