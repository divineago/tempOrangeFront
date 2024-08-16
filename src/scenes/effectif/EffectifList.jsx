import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Snackbar, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import { fetchDataFromAPI } from '../../api'; // Assure-toi que cette fonction est définie pour faire des appels API
import EffectifForm from './EffectifForm';
import DetailsAgent from '../effectif/modals/DetailsAgent';
import Header from '../../components/Header';

const EffectifList = () => {
  const [effectifList, setEffectifList] = useState([]);
  const [filteredEffectifList, setFilteredEffectifList] = useState([]);
  const [filters, setFilters] = useState({
    isActive: '',
    genre: '',
    dateEmb: '',
    dateModStart: '',
    dateModEnd: ''
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    fetchEffectifData();
  }, [filters]);

  const fetchEffectifData = async () => {
    const { isActive, genre, dateEmb, dateModStart, dateModEnd } = filters;
    const queryParams = new URLSearchParams();
    
    if (isActive) queryParams.append('is_active', isActive);
    if (genre) queryParams.append('genre', genre);
    if (dateEmb) queryParams.append('date_embauche', dateEmb);
    if (dateModStart) queryParams.append('updated_at_start', dateModStart);
    if (dateModEnd) queryParams.append('updated_at_end', dateModEnd);

    try {
      const response = await fetchDataFromAPI('/effectif/agent/');
      if (response.data && Array.isArray(response.data.results)) {
          // Initialiser le tableau de subordonnés
          let subordonnes = [];
          // Transformation des données initiales
          let transformedData = response.data.results.map(agent => ({
              id: agent.id || '',
              name: agent.name || '',
              cuid: agent.user ? agent.user.cuid : '',
              email: agent.user ? agent.user.email : '',
              phone: agent.user ? agent.user.phone : '',
              prenom: agent.prenom || '',
              postnom: agent.postnom || '',
              direction: agent.direction ? agent.direction.name : '',
              employeur: agent.type_employeur ? agent.employeur.type_employeur : '',
              genre: agent.genre || '',
              date_naissance: agent.date_naissance || '',
              contrat: agent.type_contrat ? agent.contrat.type_contrat : '',
              num_mat: agent.num_mat || '',
              statut_contrat: agent.statut_contrat || '',
              fonction: agent.fonction || '',
              age: agent.age || '',
              anciennete_annee: agent.anciennete_annee || '',
              anciennete_mois: agent.anciennete_mois || '',
              nationalite: agent.nationalite || '',
              lieu_embauche: agent.lieu_embauche || '',
              grade: agent.grade || '',
              date_fin_cdd: agent.date_fin_cdd || '',
              date_embauche: agent.date_embauche || '',
              dure_cdd: agent.dure_cdd || '',
              periode_essai: agent.periode_essai || '',
              manager_name: agent.manager_name || '',
              date_depart: agent.date_depart || '',
              manager: agent.manager || null,
              subordonnes: [] // Initialisation du tableau subordonnes pour chaque agent
          }));
          // Fonction pour récupérer les subordonnés d'un manager donné
          function RecuperreSubordonnes(idManager, agents) {
              return agents.filter(agent => agent.manager === idManager);
          }
          // Mise à jour de chaque agent avec la liste de ses subordonnés
          transformedData = transformedData.map(agent => ({
              ...agent,
              subordonnes: RecuperreSubordonnes(agent.id, transformedData).map(sub => sub.name)
          }));
          // Mise à jour du state avec les données transformées
          setEffectifList(transformedData);
      } else {
          console.error('Invalid data format:', response);
          setEffectifList([]);
          setFilteredEffectifList([]);
      }
    } catch (error) {
      console.error('Error fetching training data:', error);
      setEffectifList([]);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleOpenDetails = (agent) => {
    setSelectedAgent(agent);
    setIsDetailsOpen(true);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 95 },
    { field: 'name', headerName: 'Nom', width: 150 },
    { field: 'prenom', headerName: 'Prénom', width: 150 },
    { field: 'postnom', headerName: 'Postnom', width: 150 },
    // { field: 'email', headerName: 'Email', width: 150 },
    { field: 'direction', headerName: 'Direction', width: 150 },
    { field: 'contrat', headerName: 'Contrat', width: 150, valueGetter: (params) => params.row.contrat ? params.row.contrat.type_contrat : 'N/A' },
    { field: 'employeur', headerName: 'Employeur', width: 150, valueGetter: (params) => params.row.employeur ? params.row.employeur.type_employeur : 'N/A' },
    { field: 'manager_name', headerName: 'Manager', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
            style={{ marginRight: '5px' }}
          >
            Modifier
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleOpenDetails(params.row)}
            style={{ marginRight: '5px' }}
          >
            Voir plus
          </Button>
          <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(params.row.id)}>
            Supprimer
          </Button>
        </>
      ),
    },
  ];

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  const handleEdit = (effectif) => {
    setFormData({ ...effectif });
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet effectif ?')) {
      const updatedList = effectifList.filter((effectif) => effectif.id !== id);
      setEffectifList(updatedList);
      setSnackbarMessage('Effectif supprimé avec succès');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    }
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredEffectifList);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'EffectifList');
    XLSX.writeFile(wb, 'EffectifList.xlsx');
  };

  const handleImportExcel = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);
          setEffectifList(json);
          setSnackbarMessage('Données importées avec succès');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
        } catch (error) {
          setSnackbarMessage('Erreur lors de l\'importation des données');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditMode(false);
    setFormData({});
  };

  return (
    <Box>
      <Header title="Liste des Effectifs" />
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Ajouter un Effectif
      </Button>
      <Button variant="contained" color="secondary" onClick={handleExportExcel} style={{ marginLeft: '10px' }}>
        Exporter en Excel
      </Button>
      <input
        accept=".xlsx, .xls"
        style={{ display: 'none' }}
        id="import-button-file"
        type="file"
        onChange={handleImportExcel}
      />
      <label htmlFor="import-button-file">
        <Button variant="contained" color="secondary" component="span" style={{ marginLeft: '10px' }}>
          Importer depuis Excel
        </Button>
      </label>
      <Box height="400px" mb="20px">
        <DataGrid rows={effectifList} columns={columns} pageSize={100} />
      </Box>
     
      <EffectifForm
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleFormSubmit}
        data={formData}
        onInputChange={handleInputChange}
        editMode={editMode}
      />
      <DetailsAgent
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        agent={selectedAgent}
      />
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EffectifList;
