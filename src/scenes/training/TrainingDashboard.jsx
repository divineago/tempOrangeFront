import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, Typography, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { mockData } from '../../data/mockData';
import * as XLSX from 'xlsx';


const TrainingDashboard = () => {
  const [filters, setFilters] = useState({ direction: '' });

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const directionsWithId = mockData.directions.map((direction, index) => ({
    id: index + 1, // Ensure each id is unique
    ...direction
  }));

  const filteredDirections = filters.direction
    ? directionsWithId.filter((direction) => direction.name === filters.direction)
    : directionsWithId;

  const columns = [
    { field: 'name', headerName: 'Direction', width: 150 },
    { field: 'total', headerName: 'Total', width: 100 },
    { field: 'notTrained', headerName: 'Pas Formés', width: 150 },
    { field: 'trained', headerName: 'Formés', width: 100 },
    { field: 'inPerson', headerName: 'Hors E-Learning', width: 150 },
    { field: 'eLearning', headerName: 'E-Learning', width: 150 },
  ];

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredDirections);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Directions');
    XLSX.writeFile(workbook, 'training_dashboard.xlsx');
  };



  return (
    <div id="training-dashboard">
      <Typography variant="h4" gutterBottom>
        Tableau de bord de la formation
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Direction</InputLabel>
            <Select
              name="direction"
              value={filters.direction}
              onChange={handleChange}
              label="Direction"
            >
              <MenuItem value=""><em>Toutes les directions</em></MenuItem>
              {mockData.directions.map((direction, index) => (
                <MenuItem key={index} value={direction.name}>{direction.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">TOTAL AGENTS</Typography>
          <Typography variant="body1">{mockData.totalAgents}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">FORMATION EN HORS E-LEARNING</Typography>
          <Typography variant="body1">{mockData.trainingParticipation.inPerson}</Typography>
          <Typography variant="h6">FORMATION E-LEARNING</Typography>
          <Typography variant="body1">{mockData.trainingParticipation.eLearning}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6">PARTICIPATION GLOBALE</Typography>
          <Typography variant="body1">{mockData.trainingParticipation.total}</Typography>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="space-between" mt={4} sx={{ '& > *': { flex: 1, margin: '0 10px' } }}>
        <Box>
          <Typography variant="h6">Effectif par Employeur</Typography>
          <Pie data={mockData.donutDataEffectif} options={{ maintainAspectRatio: false }} />
        </Box>
        <Box>
          <Typography variant="h6">Formations par Type</Typography>
          <Pie data={mockData.donutDataFormation} options={{ maintainAspectRatio: false }} />
        </Box>
        <Box>
          <Typography variant="h6">Participation aux Formations</Typography>
          <Pie data={mockData.donutDataParticipation} options={{ maintainAspectRatio: false }} />
        </Box>
      </Box>
      <Typography variant="h6" style={{ marginTop: '20px' }}>DIRECTIONS</Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredDirections}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </div>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={downloadExcel}>
          Télécharger en Excel
        </Button>
      </Box>
    </div>
  );
};

export default TrainingDashboard;
