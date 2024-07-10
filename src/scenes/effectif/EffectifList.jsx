import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem, Snackbar, Alert } from '@mui/material';
import Header from '../../components/Header';
import { directions, employeurs, genderOptions, contractOptions, effectifList as initialEffectifList } from '../../data/mockData';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';

const EffectifList = () => {
  const [effectifList, setEffectifList] = useState(initialEffectifList);
  const [formData, setFormData] = useState({
    id: '',
    nom: '',
    prenom: '',
    directionId: '',
    employeurId: '',
    gender: '',
    dateNaissance: '',
    seniorite: '',
    contrat: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!formData.nom || !formData.prenom || !formData.dateNaissance) {
      setSnackbarMessage('Please fill in all required fields');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    if (editMode) {
      const updatedList = effectifList.map((effectif) =>
        effectif.id === formData.id ? formData : effectif
      );
      setEffectifList(updatedList);
      setSnackbarMessage('Employee updated successfully');
    } else {
      const newEffectif = { ...formData, id: effectifList.length + 1 };
      setEffectifList([...effectifList, newEffectif]);
      setSnackbarMessage('Employee added successfully');
    }

    setSnackbarSeverity('success');
    setOpenSnackbar(true);

    setFormData({
      id: '',
      nom: '',
      prenom: '',
      directionId: '',
      employeurId: '',
      gender: '',
      dateNaissance: '',
      seniorite: '',
      contrat: '',
    });
    setEditMode(false);
  };

  const handleEdit = (effectif) => {
    setFormData({ ...effectif });
    setEditMode(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const updatedList = effectifList.filter((effectif) => effectif.id !== id);
      setEffectifList(updatedList);
      setSnackbarMessage('Employee deleted successfully');
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
          setSnackbarMessage('Data imported successfully');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
        } catch (error) {
          setSnackbarMessage('Error importing data');
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
    { field: 'prenom', headerName: 'Prenom', width: 150 },
    { field: 'directionId', headerName: 'Direction', width: 150 },
    { field: 'employeurId', headerName: 'Employeur', width: 150 },
    { field: 'gender', headerName: 'Gender', width: 150 },
    { field: 'dateNaissance', headerName: 'Date de Naissance', width: 150, type: 'date' },
    { field: 'seniorite', headerName: 'Seniorite', width: 150, type: 'number' },
    { field: 'contrat', headerName: 'Contrat', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <Button variant="outlined" color="primary" size="small" onClick={() => handleEdit(params.row)}>
            Edit
          </Button>
          <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(params.row.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box m="20px">
      <Header title="EFFECTIF LIST" subtitle="Liste des effectifs" />

      <form onSubmit={handleFormSubmit}>
        <Box display="flex" flexDirection="column" gap="10px" mb="20px">
          <TextField
            label="Nom"
            name="nom"
            value={formData.nom}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
          <TextField
            label="Prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
          <TextField
            select
            label="Direction"
            name="directionId"
            value={formData.directionId}
            onChange={handleInputChange}
            variant="outlined"
            required
          >
            {directions.map((direction) => (
              <MenuItem key={direction.value} value={direction.value}>
                {direction.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Employeur"
            name="employeurId"
            value={formData.employeurId}
            onChange={handleInputChange}
            variant="outlined"
            required
          >
            {employeurs.map((employeur) => (
              <MenuItem key={employeur.value} value={employeur.value}>
                {employeur.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            variant="outlined"
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
            type="date"
            value={formData.dateNaissance}
            onChange={handleInputChange}
            variant="outlined"
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Seniorite"
            name="seniorite"
            type="number"
            value={formData.seniorite}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
          <TextField
            select
            label="Contrat"
            name="contrat"
            value={formData.contrat}
            onChange={handleInputChange}
            variant="outlined"
            required
          >
            {contractOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" color="primary">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </Box>
      </form>

      <Box mb="20px">
        <Button variant="contained" color="primary" onClick={handleExportExcel}>
          Export to Excel
        </Button>
        <input type="file" accept=".xlsx, .xls" onChange={handleImportExcel} style={{ display: 'none' }} id="upload-excel" />
        <label htmlFor="upload-excel">
          <Button variant="contained" color="secondary" component="span">
            Import from Excel
          </Button>
        </label>
      </Box>

      <Box height="400px">
        <DataGrid rows={effectifList} columns={columns} pageSize={5} />
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EffectifList;
