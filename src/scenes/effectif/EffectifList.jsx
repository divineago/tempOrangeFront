import React, { useState} from 'react';
import { Box, Button, TextField, MenuItem, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Header from '../../components/Header';
import { directions, employeurs, effectifList as initialEffectifList, genderOptions, contractOptions, statusOptions, classificationOptions } from '../../data/mockData';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';

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
    { field: 'nom', headerName: 'Nom', width: 150 },
    { field: 'prenom', headerName: 'Prénom', width: 150 },
    { field: 'postnom', headerName: 'Postnom', width: 150 },
    {
      field: 'directionId',
      headerName: 'Direction',
      width: 200,
      valueGetter: (params) => directions.find((dir) => dir.value === params.row.directionId)?.label,
    },
    {
      field: 'employeurId',
      headerName: 'Employeur',
      width: 200,
      valueGetter: (params) => employeurs.find((emp) => emp.value === params.row.employeurId)?.label,
    },
    { field: 'gender', headerName: 'Genre', width: 150 },
    { field: 'dateNaissance', headerName: 'Date de Naissance', width: 150 },
    { 
      field: 'seniority', 
      headerName: 'Ancienneté (années)', 
      width: 130, 
      valueGetter: (params) => calculateSeniority(params.row.embauche)
    },
    { field: 'contrat', headerName: 'Contrat', width: 150 },
    { field: 'classification', headerName: 'Classification', width: 150 },
    { field: 'status', headerName: 'Statut', width: 150 },
    { field: 'hiringplace', headerName: 'Lieu d\'embauche', width: 150 },
    { 
      field: 'hiringdate', 
      headerName: 'Date d\'embauche', 
      width: 150,
      valueGetter: (params) => {
        const date = new Date(params.row.hiringdate);
        return date.toLocaleDateString('fr-FR');
      }
    },
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
  };

  return (
    <Box m="20px">
      <Header title="LISTE DES EFFECTIFS" subtitle="Liste des effectifs" />

      <Box mb="20px">
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Ajouter un Agent
        </Button>
        <Button variant="contained" color="primary" onClick={handleExportExcel}>
          Exporter vers Excel
        </Button>
        <input type="file" accept=".xlsx, .xls" onChange={handleImportExcel} style={{ display: 'none' }} id="upload-excel-effectif" />
        <label htmlFor="upload-excel-effectif">
          <Button variant="contained" color="secondary" component="span">
            Importer depuis Excel
          </Button>
        </label>
      </Box>

      <Box height="400px" mb="20px">
        <DataGrid rows={effectifList} columns={columns} pageSize={5} />
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>{editMode ? 'Modifier Effectif' : 'Ajouter Agent'}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap="10px" mb="20px">
            <TextField label="Nom" name="nom" value={formData.nom} onChange={handleInputChange} required />
            <TextField label="Prénom" name="prenom" value={formData.prenom} onChange={handleInputChange} required />
            <TextField label="Postnom" name="postnom" value={formData.postnom} onChange={handleInputChange} required />
            <TextField
              label="Direction"
              name="directionId"
              value={formData.directionId}
              onChange={handleInputChange}
              select
              required
            >
              {directions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Employeur"
              name="employeurId"
              value={formData.employeurId}
              onChange={handleInputChange}
              select
              required
            >
              {employeurs.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Genre"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              select
              required
            >
              {genderOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Date de Naissance"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleInputChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Contrat"
              name="contrat"
              value={formData.contrat}
              onChange={handleInputChange}
              select
              required
            >
              {contractOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField label="Matricule" name="mat" value={formData.mat} onChange={handleInputChange} required />
            <TextField
              label="Classification"
              name="classification"
              value={formData.classification}
              onChange={handleInputChange}
              select
              required
            >
              {classificationOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField label="Fonction" name="fonction" value={formData.fonction} onChange={handleInputChange} required />
            <TextField label="Lieu d'embauche" name="hiringplace" value={formData.hiringplace} onChange={handleInputChange} required />
            <TextField
              label="Date d'Embauche"
              name="embauche"
              value={formData.embauche}
              onChange={handleInputChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField label="Email" name="email" value={formData.email} onChange={handleInputChange} type="email" required />
            <TextField
              label="Statut"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              select
              required
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Date de fin de contrat"
              name="endcontrat"
              value={formData.endcontrat}
              onChange={handleInputChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              required
            />        
            <TextField
              label="Durée du contrat (mois)"
              name="dureecontrat"
              value={formData.dureecontrat}
              onChange={handleInputChange}
              type="number"
              required
            />
            <TextField
              label="Période d'essai (mois)"
              name="essai"
              value={formData.essai}
              onChange={handleInputChange}
              type="number"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            {editMode ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EffectifList;
