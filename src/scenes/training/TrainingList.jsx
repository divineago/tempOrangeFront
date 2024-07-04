import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem } from '@mui/material';
import Header from '../../components/Header';
import { directions, trainingData as initialTrainingData } from '../../data/mockData';
import { DataGrid } from '@mui/x-data-grid';

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
      // Update existing training
      const updatedList = trainingData.map((training) =>
        training.id === formData.id ? { ...formData, duration: calculateDuration(formData.startDate, formData.endDate) } : training
      );
      setTrainingData(updatedList);
    } else {
      // Add new training
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
  };

  const handleEdit = (training) => {
    setFormData({ ...training });
    setEditMode(true);
  };

  const handleDelete = (id) => {
    const updatedList = trainingData.filter((training) => training.id !== id);
    setTrainingData(updatedList);
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
      <Header title="TRAINING LIST" subtitle="Liste des formations" />

      <form onSubmit={handleFormSubmit}>
        <Box display="flex" flexDirection="column" gap="10px" mb="20px">
          <TextField label="Title" name="title" value={formData.title} onChange={handleInputChange} variant="outlined" required />
          <TextField
            select
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleTypeChange}
            variant="outlined"
            required
          >
            <MenuItem value="En ligne">En ligne</MenuItem>
            <MenuItem value="En présentiel">En présentiel</MenuItem>
          </TextField>
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            required
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            required
          />
          <TextField
            label="Evaluation Date"
            name="evaluationDate"
            type="date"
            value={formData.evaluationDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            required
          />
          <TextField
            select
            label="Direction"
            name="direction"
            value={formData.direction}
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
          <Button type="submit" variant="contained" color="primary">
            {editMode ? 'Update Training' : 'Add Training'}
          </Button>
        </Box>
      </form>

      <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
        <DataGrid rows={trainingData.map(row => ({ ...row, duration: calculateDuration(row.startDate, row.endDate) }))} columns={columns} pageSize={5} />
      </div>
    </Box>
  );
};

export default TrainingList;
