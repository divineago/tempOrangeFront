import React, { useState } from 'react';
import { Box, TextField, MenuItem, Typography, Card, CardContent, Grid } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import Header from '../../components/Header';
import { directions, employeurs } from '../../data/mockData';

const sampleTrainingCategories = [
  { value: 'leadership', label: 'Formation Leadership' },
  { value: 'projectManagement', label: 'Gestion de Projet' },
  { value: 'webDevelopment', label: 'Développement Web' },
  { value: 'digitalMarketing', label: 'Marketing Digital' },
];

const TrainingDashboard = () => {
  const [filters, setFilters] = useState({
    employeur: '',
    direction: '',
    trainingCategory: '',
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Dummy data for training statistics
  const trainingStats = {
    leadership: { onlineTraining: 15, offlineTraining: 10, participants: 80, participationRate: '60%' },
    projectManagement: { onlineTraining: 20, offlineTraining: 15, participants: 100, participationRate: '70%' },
    webDevelopment: { onlineTraining: 25, offlineTraining: 20, participants: 120, participationRate: '75%' },
    digitalMarketing: { onlineTraining: 30, offlineTraining: 25, participants: 150, participationRate: '80%' },
  };

  const currentStats = trainingStats[filters.trainingCategory] || {};

  return (
    <Box m="20px">
      <Header title="DASHBOARD DE FORMATION" subtitle="Vue d'ensemble des formations" />

      <Box display="flex" justifyContent="space-between" mb="20px">
        <TextField
          select
          label="Employeur"
          name="employeur"
          value={filters.employeur}
          onChange={handleFilterChange}
          variant="outlined"
          sx={{ width: '30%', color: 'orange' }}
        >
          {employeurs.map((employeur) => (
            <MenuItem key={employeur.value} value={employeur.value}>
              {employeur.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Direction"
          name="direction"
          value={filters.direction}
          onChange={handleFilterChange}
          variant="outlined"
          sx={{ width: '30%', color: 'black' }}
        >
          {directions.map((direction) => (
            <MenuItem key={direction.value} value={direction.value}>
              {direction.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Categorie de Formation"
          name="trainingCategory"
          value={filters.trainingCategory}
          onChange={handleFilterChange}
          variant="outlined"
          sx={{ width: '30%', color: 'black' }}
        >
          {sampleTrainingCategories.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {filters.trainingCategory && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ color: 'orange' }}>
                    Formations Online
                  </Typography>
                  <Typography variant="h2">{currentStats.onlineTraining}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ color: 'orange' }}>
                    Formations Offline
                  </Typography>
                  <Typography variant="h2">{currentStats.offlineTraining}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ color: 'orange' }}>
                    Participants
                  </Typography>
                  <Typography variant="h2">{currentStats.participants}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ color: 'orange' }}>
                    Taux de participation
                  </Typography>
                  <Typography variant="h2">{currentStats.participationRate}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box mt="20px">
            <Typography variant="h5" mb="10px">
              Statistiques des Formations
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 30, label: 'Formation Leadership' },
                        { id: 1, value: 25, label: 'Gestion de Projet' },
                        { id: 2, value: 20, label: 'Développement Web' },
                        { id: 3, value: 25, label: 'Marketing Digital' },
                      ],
                    },
                  ]}
                  width={600}
                  height={400}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <BarChart
                  xAxis={[{ scaleType: 'band', data: ['Formation A', 'Formation B', 'Formation C'] }]}
                  series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                  width={600}
                  height={400}
                />
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default TrainingDashboard;
