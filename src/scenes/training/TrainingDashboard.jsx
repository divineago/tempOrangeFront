import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { mockData } from '../../data/mockData';

const TrainingDashboard = () => {
  const [filters, setFilters] = useState({ direction: '' });

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  // Ajout d'un id unique à chaque direction
  const directionsWithId = mockData.directions.map((direction, index) => ({
    id: index + 1, // Assurez-vous que cet id est unique pour chaque direction
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

  return (
    <div>
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
      <Typography variant="h6" style={{ marginTop: '20px' }}>DIRECTIONS</Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredDirections}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </div>
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Box width="30%">
          <Typography variant="h6">Effectif par Employeur</Typography>
          <Doughnut data={mockData.donutDataEffectif} options={{ maintainAspectRatio: false }} width={200} height={200} />
        </Box>
        <Box width="30%">
          <Typography variant="h6">Formations par Type</Typography>
          <Doughnut data={mockData.donutDataFormation} options={{ maintainAspectRatio: false }} width={200} height={200} />
        </Box>
        <Box width="30%">
          <Typography variant="h6">Participation aux Formations</Typography>
          <Doughnut data={mockData.donutDataParticipation} options={{ maintainAspectRatio: false }} width={200} height={200} />
        </Box>
      </Box>
    </div>
  );
};

export default TrainingDashboard;
