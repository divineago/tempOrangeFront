import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Header from '../../components/Header';
import { directions, employeurs, effectifList as initialEffectifList, genderOptions, contractOptions, statusOptions, classificationOptions } from '../../data/mockData';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import { fetchDataFromAPI } from '../../api'; 
import EffectifForm from './EffectifForm';


const EffectifList = () => {
  const [effectifList, setEffectifList] = useState(initialEffectifList);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    prenom: '',
    postnom: '',
    direction: '',
    employeur: '',
    genre: '',
    date_naissance: '',
    contrat: '',
    num_mat: '',
    statut_contrat: '',
    fonction: '',
    email: '',
    age: '',
    anciennete_annee:'',
    anciennete_mois:'',
    nationalite: '',
    lieu_embauche: '',
    grade: '',
    date_fin_contrat: '',
    date_embauche: '',
    dure_contrat: '',
    periode_essai: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchEffectifData(); // Utilisation de useEffect pour charger les données initiales
  }, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const fetchEffectifData = async () => {
    try {
      // Appel de l'API
      const response = await fetchDataFromAPI('/effectif/agent/');
      console.log('Full response:', response); // Log de la réponse complète
  
      // Vérification du format des données
      if (response.data && Array.isArray(response.data)) {
        setEffectifList(response.data);
      } else if (response.data && Array.isArray(response.data.results)) {
        setEffectifList(response.data.results);
      } else {
        console.error('Invalid data format:', response);
        setEffectifList([]); 
      }
    } catch (error) {
      console.error('Error fetching training data:', error);
      setEffectifList([]); 
    }
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
   
    setFormData({
      id: '',
      name: '',
      prenom: '',
      postnom: '',
      direction: '',
      employeur: '',
      genre: '',
      date_naissance: '',
      contrat: '',
      num_mat: '',
      age: '',
      statut_contrat: '',
      fonction: '',
      email: '',
      anciennete_annee:'',
      anciennete_mois:'',
      nationalite: '',
      lieu_embauche: '',
      grade: '',
      date_fin_contrat: '',
      date_embauche: '',
      dure_contrat: '',
      periode_essai: '',
    });
    setEditMode(false);
    setOpenDialog(false);
    setSnackbarMessage(editMode ? 'Effectif mis à jour avec succès' : 'Effectif ajouté avec succès');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
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
    const ws = XLSX.utils.json_to_sheet(effectifList);
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

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Nom', width: 150 },
    { field: 'prenom', headerName: 'Prénom', width: 150 },
    { field: 'postnom', headerName: 'Postnom', width: 150 },
    { field: 'direction', headerName: 'Direction', width: 200 },
    { field: 'employeur', headerName: 'Employeur', width: 200 },
    { field: 'genre', headerName: 'Genre', width: 150 },
    { field: 'date_naissance', headerName: 'Date de Naissance', width: 150 },
    { field: 'contrat', headerName: 'Contrat', width: 150 },
    { field: 'num_mat', headerName: 'Numéro Matricule', width: 150 },
    { field: 'statut_contrat', headerName: 'statut_contrat', width: 150 },
    { field: 'fonction', headerName: 'Fonction', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'anciennete_annee', headerName: 'Ancienneté (années)', width: 150 },
    { field: 'anciennete_mois', headerName: 'Ancienneté (mois)', width: 150 },
    { field: 'nationalite', headerName: 'Nationalité', width: 150 },
    { field: 'lieu_embauche', headerName: 'Lieu d\'embauche', width: 150 },
    { field: 'grade', headerName: 'Grade', width: 150 },
    { field: 'date_fin_contrat', headerName: 'Date de Fin de Contrat', width: 150 },
    { 
      field: 'date_embauche', 
      headerName: 'Date d\'embauche', 
      width: 150,
      valueGetter: (params) => {
        const date = new Date(params.row.date_embauche);
        return date.toLocaleDateString('fr-FR');
      }
    },
    { field: 'dure_contrat', headerName: 'Durée du Contrat', width: 150 },
    { field: 'periode_essai', headerName: 'Période d\'essai', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <Button variant="outlined" color="primary" size="small" onClick={() => handleEdit(params.row)}>
            Modifier
          </Button>
          <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(params.row.id)}>
            Supprimer
          </Button>
        </>
      ),
    },
  ];
  

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditMode(false);
    setFormData({
      id: '',
      name: '',
      prenom: '',
      postnom: '',
      direction: '',
      employeur: '',
      genre: '',
      date_naissance: '',
      contrat: '',
      num_mat: '',
      statut_contrat: '',
      fonction: '',
      email: '',
      anciennete_annee:'',
      anciennete_mois:'',
      nationalite: '',
      lieu_embauche: '',
      grade: '',
      date_fin_contrat: '',
      date_embauche: '',
      dure_contrat: '',
      periode_essai: '',
    });
  };

  return (
    <Box m="20px">
      <Header title="LISTE DES EFFECTIFS" subtitle="Liste des effectifs" />

      <Box mb="20px">
      <EffectifForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        editMode={editMode}
      />
        <Button variant="contained" color="primary" onClick={handleOpenDialog} style={{ marginLeft: '5px' }}>
          Ajouter un Agent
        </Button>
        <Button variant="contained" color="primary" onClick={handleExportExcel} style={{ marginLeft: '5px' }}>
          Exporter vers Excel
        </Button>
        <input type="file" accept=".xlsx, .xls" onChange={handleImportExcel} style={{ display: 'none' }} id="upload-excel-effectif" />
        <label htmlFor="upload-excel-effectif">
          <Button variant="contained" color="primary" component="span" style={{ marginLeft: '5px' }}>
            Importer depuis Excel
          </Button>
        </label>
      </Box>

      <Box height="400px" mb="20px">
        <DataGrid rows={effectifList} columns={columns} pageSize={5} />
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EffectifList;
 