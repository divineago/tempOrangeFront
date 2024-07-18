import React, { useState } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import Header from '../../components/Header';
import { trainingData as initialTrainingData, trainingTypes } from '../../data/mockData';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import TrainingForm from './TrainingForm';

const TrainingList = () => {
  const [trainingData, setTrainingData] = useState(initialTrainingData);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    type: '',
    startDate: '',
    endDate: '',
    duration: '',
    evaluationDate: '',
    direction: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openDialog, setOpenDialog] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setSnackbarMessage('End date cannot be before start date');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    if (editMode) {
      const updatedList = trainingData.map((training) =>
        training.id === formData.id ? { ...formData, duration: calculateDuration(formData.startDate, formData.endDate) } : training
      );
      setTrainingData(updatedList);
    } else {
      const newTraining = { ...formData, id: trainingData.length + 1, duration: calculateDuration(formData.startDate, formData.endDate) };
      setTrainingData([...trainingData, newTraining]);
    }
    setFormData({
      id: '',
      title: '',
      type: '',
      startDate: '',
      endDate: '',
      duration: '',
      evaluationDate: '',
      direction: '',
    });
    setEditMode(false);
    setOpenDialog(false);
    setSnackbarMessage(editMode ? 'Training updated successfully' : 'Training added successfully');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  };

  const handleEdit = (training) => {
    setFormData({ ...training });
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this training?')) {
      const updatedList = trainingData.filter((training) => training.id !== id);
      setTrainingData(updatedList);
      setSnackbarMessage('Training deleted successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    }
  };

  const handleTypeChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      type: event.target.value,
    }));
  };

  const calculateDuration = (startDate, endDate) => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const difference = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      return difference;
    }
    return '';
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(trainingData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'TrainingList');
    XLSX.writeFile(wb, 'TrainingList.xlsx');
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
          setTrainingData(json);
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
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'startDate', headerName: 'Start Date', width: 150 },
    { field: 'endDate', headerName: 'End Date', width: 150 },
    { field: 'duration', headerName: 'Duration (Days)', width: 130 },
    { field: 'evaluationDate', headerName: 'Evaluation Date', width: 150 },
    { field: 'direction', headerName: 'Direction', width: 150 },
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
  };

  return (
    <Box m="20px">
      <Header title="Training List" subtitle="Liste de toutes les formations" />
      <Box m="10px 0">
        <Button variant="contained" color="primary" onClick={handleOpenDialog} style={{ marginLeft: '5px' }}>
          Ajouter formation
        </Button>
        <Button variant="contained" color="primary" onClick={handleExportExcel} style={{ marginLeft: '5px' }}>
          Exporter vers Excel
        </Button>
        <input
          accept=".xlsx, .xls"
          style={{ display: 'none' }}
          id="import-excel"
          type="file"
          onChange={handleImportExcel}
        />
        <label htmlFor="import-excel">
          <Button variant="contained" component="span" style={{ marginLeft: '5px' }}>
            Importer vers Excel
          </Button>
        </label>
      </Box>
      <Box height="70vh">
        <DataGrid rows={trainingData} columns={columns} pageSize={100} rowsPerPageOptions={[100]} />
      </Box>
      <TrainingForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleTypeChange={handleTypeChange}
        handleFormSubmit={handleFormSubmit}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        editMode={editMode}
        trainingTypes={trainingTypes}
      />
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TrainingList;
