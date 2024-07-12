// src/components/AddAgentForm.js

import React, { useState } from 'react';
import axios from 'axios';

const AddAgentForm = () => {
  const [formData, setFormData] = useState({
    num_mat: '',
    name: '',
    postnom: '',
    prenom: '',
    age: '',
    date_naissance: '',
    genre: '',
    fonction: '',
    email: '',
    nationalite: '',
    periode_essai: '',
    lieu_embauche: '',
    date_embauche: '',
    dure_contrat: '',
    date_fin_contrat: '',
    employeur: '', // ID de l'employeur
    contrat: '', // ID du contrat
    direction: '', // ID de la direction
    user: '', // ID de l'utilisateur associé
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/effectif/agent/creer_agent', formData);
      console.log('Agent ajouté avec succès:', response.data);
      // Réinitialiser le formulaire après succès si nécessaire
      setFormData({
        num_mat: '',
        name: '',
        postnom: '',
        prenom: '',
        age: '',
        date_naissance: '',
        genre: '',
        fonction: '',
        email: '',
        nationalite: '',
        periode_essai: '',
        lieu_embauche: '',
        date_embauche: '',
        dure_contrat: '',
        date_fin_contrat: '',
        employeur: '',
        contrat: '',
        direction: '',
        user: '',
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'agent:', error);
      // Gérer l'erreur comme nécessaire
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Ajouter un Agent</h2>
      <label>
        Numéro Matricule:
        <input type="text" name="num_mat" value={formData.num_mat} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Nom:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Postnom:
        <input type="text" name="postnom" value={formData.postnom} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Prénom:
        <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Âge:
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Date de Naissance:
        <input type="date" name="date_naissance" value={formData.date_naissance} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Genre:
        <select name="genre" value={formData.genre} onChange={handleChange} required>
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
        </select>
      </label>
      <br />
      <label>
        Fonction:
        <input type="text" name="fonction" value={formData.fonction} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Nationalité:
        <input type="text" name="nationalite" value={formData.nationalite} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Période d'Essai:
        <input type="checkbox" name="periode_essai" checked={formData.periode_essai} onChange={handleChange} />
      </label>
      <br />
      <label>
        Lieu d'Embauche:
        <input type="text" name="lieu_embauche" value={formData.lieu_embauche} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Date d'Embauche:
        <input type="date" name="date_embauche" value={formData.date_embauche} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Durée de Contrat:
        <input type="text" name="dure_contrat" value={formData.dure_contrat} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Date Fin Contrat:
        <input type="date" name="date_fin_contrat" value={formData.date_fin_contrat} onChange={handleChange} required />
      </label>
      <br />
      {/* Remplacez les champs ID ci-dessous par des listes déroulantes ou des sélecteurs appropriés */}
      <label>
        Employeur:
        <input type="text" name="employeur" value={formData.employeur} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Contrat:
        <input type="text" name="contrat" value={formData.contrat} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Direction:
        <input type="text" name="direction" value={formData.direction} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Utilisateur:
        <input type="text" name="user" value={formData.user} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit" style={{ marginTop: '10px' }}>Ajouter Agent</button>
    </form>
  );
};

export default AddAgentForm;
