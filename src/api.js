// src/api.js
//import axios from 'axios';

//const API_URL = 'http://localhost:8000'; // Remplacez avec l'URL de votre API Django

//export const fetchDataFromAPI = async (endpoint) => {
// try {
//  const response = await axios.get(`${API_URL}${endpoint}`); 
//    return response.data;
// } catch (error) {
//   console.error('Error fetching data:', error);
//   return { results: [] }; // Gérer l'erreur comme nécessaire et retourner un format compatible
// }
//};
import axios from 'axios';

export const fetchDataFromAPI = async (endpoint) => {
  try {
    const response = await axios.get(`http://localhost:8000${endpoint}`); // Remplacez par le port correct si nécessaire
    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération des données de l\'API :', error);
    throw error;
  }
};

export const postDataToAPI = async (endpoint, data) => {
  try {
    const response = await axios.post(`http://localhost:8000${endpoint}`, data); // Remplacez par le port correct si nécessaire
    return response;
  } catch (error) {
    console.error('Erreur lors de l\'envoi des données à l\'API :', error);
    throw error;
  }
};
