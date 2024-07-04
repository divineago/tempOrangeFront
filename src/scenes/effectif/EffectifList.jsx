import React, { useState } from 'react';
import { Box, Button, TextField,  MenuItem } from '@mui/material';
import Header from '../../components/Header';
import { genderOptions, contractOptions, directions, employeurs, effectifList as initialEffectifList } from '../../data/mockData';
import { DataGrid } from '@mui/x-data-grid';

const EffectifList = () => {
  const [effectifList, setEffectifList] = useState(initialEffectifList);
  const [formData, setFormData] = useState({
    id: '',
    lastName: '',
    firstName: '',
    directionId: '',
    employeurId: '',
    gender: '',
    birthDate: '',
    seniority: '',
    contractType: '',
  });
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (editMode) {
      // Update existing employee
      const updatedList = effectifList.map((employee) =>
        employee.id === formData.id ? { ...formData } : employee
      );
      setEffectifList(updatedList);
    } else {
      // Add new employee
      const newEmployee = { ...formData, id: effectifList.length + 1 };
      setEffectifList([...effectifList, newEmployee]);
    }
    setFormData({
      id: '',
      lastName: '',
      firstName: '',
      directionId: '',
      employeurId: '',
      gender: '',
      birthDate: '',
      seniority: '',
      contractType: '',
    });
    setEditMode(false);
  };

  const handleEdit = (employee) => {
    setFormData({ ...employee });
    setEditMode(true);
  };

  const handleDelete = (id) => {
    const updatedList = effectifList.filter((employee) => employee.id !== id);
    setEffectifList(updatedList);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    {
      field: 'directionId',
      headerName: 'Direction',
      width: 150,
      valueGetter: (params) => directions.find(dir => dir.value === params.row.directionId)?.label || '',
    },
    {
      field: 'employeurId',
      headerName: 'Employeur',
      width: 150,
      valueGetter: (params) => employeurs.find(emp => emp.value === params.row.employeurId)?.label || '',
    },
    { field: 'gender', headerName: 'Gender', width: 130 },
    {
      field: 'birthDate',
      headerName: 'Birth Date',
      type: 'date',
      width: 130,
    },
    { field: 'seniority', headerName: 'Seniority', width: 130 },
    { field: 'contractType', headerName: 'Contract Type', width: 150 },
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

  return (
    <Box m="20px">
      <Header title="EFFECTIF LIST" subtitle="Liste des employés" />

      <form onSubmit={handleFormSubmit}>
        <Box display="flex" flexDirection="column" gap="10px" mb="20px">
          <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} variant="outlined" required />
          <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} variant="outlined" required />

          <TextField
            select
            label="Direction"
            name="directionId"
            value={formData.directionId}
            onChange={handleInputChange}
            variant="outlined"
            required
          >
            {directions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
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
            {employeurs.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
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
            label="Birth Date"
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            required
          />

          <TextField
            label="Seniority"
            name="seniority"
            type="number"
            value={formData.seniority}
            onChange={handleInputChange}
            variant="outlined"
            required
          />

          <TextField
            select
            label="Contract Type"
            name="contractType"
            value={formData.contractType}
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
            {editMode ? 'Update Employee' : 'Add Employee'}
          </Button>
        </Box>
      </form>

      <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
        <DataGrid rows={effectifList} columns={columns} pageSize={5} />
      </div>
    </Box>
  );
};

export default EffectifList;
