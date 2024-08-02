import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { fetchDataFromAPI, postDataToAPI, updateDataToAPI } from '../../api';
import DirectionForm from './DirectionForm';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Nom', width: 150, editable: true },
  { field: 'short_name', headerName: 'Short Name', width: 150, editable: true },
  { field: 'description', headerName: 'Description', width: 250, editable: true },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={() => (params.row)}
        >
          Modifier
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => (params.row.id)}
        >
          Supprimer
        </Button>
      </>
    ),
  },
];

const EmployerList = () => {
  const [employers, setEmployers] = useState([]);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchEmployers();
  }, []);

  const fetchEmployers = async () => {
    const data = await fetchDataFromAPI('/effectif/employeurs/');
    setEmployers(data);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedEmployer((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    if (editMode) {
      await updateDataToAPI(`/employeurs/${selectedEmployer.id}/`, selectedEmployer);
    } else {
      await postDataToAPI('/employeurs/', selectedEmployer);
    }
    fetchEmployers();
    handleCloseDialog();
  };

 
  const handleAddNew = () => {
    setSelectedEmployer({
      id: '',
      name: '',
      short_name: '',
      description: '',
    });
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEmployer(null);
  };

  return (
    <Box m="20px">
      <Button variant="contained" color="primary" onClick={handleAddNew}>
        Ajouter Employeur
      </Button>
      <Box mt="20px" height="400px">
        <DataGrid rows={employers} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
      </Box>

      {openDialog && (
        <DirectionForm
          formData={selectedEmployer}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          editMode={editMode}
        />
      )}
    </Box>
  );
};

export default EmployerList;
