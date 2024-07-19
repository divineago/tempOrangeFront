import React, { useState } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import Header from '../../components/Header';
import { effectifList as initialEffectifList } from '../../data/mockData';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import EffectifForm from './EffectifForm';

const EffectifList = () => {
  const [effectifList, setEffectifList] = useState(initialEffectifList);
  const [formData, setFormData] = useState({
    id: '',
    nom: '',
    prenom: '',
    postnom: '',
    directionId: '',
    employeurId: '',
    gender: '',
    dateNaissance: '',
    contrat: '',
    mat: '',
    classification: '',
    fonction: '',
    city: '',
    embauche: '',
    email: '',
    status: '',
    endcontrat: '',
    hiringplace: '',
    hiringdate: '',
    dureecontrat: '',
    essai: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openDialog, setOpenDialog] = useState(false);

  const calculateSeniority = (hireDate) => {
    const startDate = new Date(hireDate);
    const currentDate = new Date();
    const seniority = currentDate.getFullYear() - startDate.getFullYear();
    return seniority;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const seniority = calculateSeniority(formData.embauche);
    const currentDate = new Date();
    const birthDate = new Date(formData.dateNaissance);
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    if (age < 18) {
      setSnackbarMessage('L\'âge doit être d\'au moins 18 ans');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (editMode) {
      const updatedList = effectifList.map((effectif) =>
        effectif.id === formData.id ? { ...formData, seniority } : effectif
      );
      setEffectifList(updatedList);
    } else {
      const newEffectif = { ...formData, id: effectifList.length + 1, seniority };
      setEffectifList([...effectifList, newEffectif]);
    }

    setFormData({
      id: '',
      nom: '',
      prenom: '',
      postnom: '',
      directionId: '',
      employeurId: '',
      gender: '',
      dateNaissance: '',
      contrat: '',
      mat: '',
      classification: '',
      fonction: '',
      city: '',
      embauche: '',
      email: '',
      status: '',
      endcontrat: '',
      hiringplace: '',
      hiringdate: '',
      dureecontrat: '',
      essai: '',
    });
    setEditMode(false);
    setOpenDialog(false);
    setSnackbarMessage(editMode ? 'Effectif mis à jour avec succès' : 'Effectif ajouté avec succès');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleEditClick = (effectif) => {
    setFormData(effectif);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDeleteClick = (id) => {
    const updatedList = effectifList.filter((effectif) => effectif.id !== id);
    setEffectifList(updatedList);
    setSnackbarMessage('Effectif supprimé avec succès');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleAddClick = () => {
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(effectifList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'EffectifList');
    XLSX.writeFile(workbook, 'EffectifList.xlsx');
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nom', headerName: 'Nom', width: 130 },
    { field: 'prenom', headerName: 'Prénom', width: 130 },
    { field: 'postnom', headerName: 'Postnom', width: 130 },
    { field: 'directionId', headerName: 'Direction', width: 130 },
    { field: 'employeurId', headerName: 'Employeur', width: 130 },
    { field: 'gender', headerName: 'Genre', width: 130 },
    { field: 'dateNaissance', headerName: 'Date de Naissance', width: 130 },
    { field: 'contrat', headerName: 'Contrat', width: 130 },
    { field: 'mat', headerName: 'Matricule', width: 130 },
    { field: 'classification', headerName: 'Classification', width: 130 },
    { field: 'fonction', headerName: 'Fonction', width: 130 },
    { field: 'embauche', headerName: 'Date d\'Embauche', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'status', headerName: 'Statut', width: 130 },
    { field: 'endcontrat', headerName: 'Date de fin de contrat', width: 130 },
    { field: 'hiringplace', headerName: 'Lieu d\'embauche', width: 130 },
    { field: 'hiringdate', headerName: 'Date d\'embauche', width: 130 },
    { field: 'dureecontrat', headerName: 'Durée du contrat (mois)', width: 130 },
    { field: 'essai', headerName: 'Période d\'essai (mois)', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEditClick(params.row)} color="primary">
            Modifier
          </Button>
          <Button onClick={() => handleDeleteClick(params.row.id)} color="primary">
            Supprimer
          </Button>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="EffectifList" subtitle="Liste des effectifs" />
      <Box  mb="10px">
        <Button variant="contained" color="primary" onClick={handleAddClick} style={{ marginLeft: '5px' }}> 
          Ajouter un agent
        </Button>
        <Button variant="contained" color="primary" onClick={exportToExcel} style={{ marginLeft: '5px' }}>
          Exporter vers Excel
        </Button>
          <Button variant="contained" component="span" style={{ marginLeft: '5px' }}>
            Importer vers Excel
          </Button>
      </Box>
      <Box height="400px">
        <DataGrid rows={effectifList} columns={columns} pageSize={100} />
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <EffectifForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        editMode={editMode}
      />
    </Box>
  );
};

export default EffectifList;
