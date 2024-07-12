import React, { useEffect, useState } from 'react';
import { fetchDataFromAPI } from '../api'; 

const MyComponent = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetchDataFromAPI(`/effectif/agent/?page=${currentPage}`);
        console.log('API response:', response);
        if (response && response.results) {
          setAgents(response.results);
          setTotalPages(response.total_pages);
        } else {
          console.error('API response does not contain valid results:', response);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching agents:', error);
        setLoading(false);
      }
    };

    fetchAgents();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!Array.isArray(agents) || agents.length === 0) {
    return <p>No agents found.</p>;
  }

  return (
    <div>
      <h1>Liste des Agents</h1>
      <ul>
        {agents.map(agent => (
          <li key={agent.id}>
            <strong>Nom:</strong> {agent.name}<br />
            <strong>Postnom:</strong> {agent.postnom}<br />
            <strong>Prénom:</strong> {agent.prenom}<br />
            <strong>Date de naissance:</strong> {agent.date_naissance}<br />
            <strong>Age:</strong> {agent.age}<br />
            <strong>Genre:</strong> {agent.genre}<br />
            <strong>Fonction:</strong> {agent.fonction}<br />
            <strong>Email:</strong> {agent.email}<br />
            <strong>Nationalité:</strong> {agent.nationalite}<br />
            <strong>Grade:</strong> {agent.grade}<br />
            <strong>Période d'essai:</strong> {agent.periode_essai ? 'Oui' : 'Non'}<br />
            <strong>Lieu d'embauche:</strong> {agent.lieu_embauche}<br />
            <strong>Date d'embauche:</strong> {agent.date_embauche}<br />
            <strong>Durée du contrat:</strong> {agent.dure_contrat}<br />
            <strong>Date fin contrat:</strong> {agent.date_fin_contrat}<br />
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Précédent</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Suivant</button>
      </div>
    </div>
  );
};

export default MyComponent;
