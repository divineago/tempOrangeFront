import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, Typography, Box, Button, Card, CardContent, Modal } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { mockData } from '../../data/mockData';
import * as XLSX from 'xlsx';

const TrainingDashboard = () => {
  const [filters, setFilters] = useState({ direction: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const directionsWithId = mockData.directions.map((direction, index) => ({
    id: index + 1, // Ensure each id is unique
    ...direction,
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
    { field: 'title', headerName: 'Titre de la formation', width: 200 }, // Nouveau champ
  ];

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredDirections);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Directions');
    XLSX.writeFile(workbook, 'training_dashboard.xlsx');
  };

  const createDoughnutData = (data) => ({
    labels: data?.labels || [],
    datasets: [
      {
        data: data?.datasets?.[0]?.data || [],
        backgroundColor: data?.datasets?.[0]?.backgroundColor || [],
      },
    ],
  });

  const handleCardClick = (data) => {
    setModalData(data);
    setModalOpen(true);
  };

  const renderWidget = (title, value, color, data) => (
    <Card
      sx={{ minWidth: 275, backgroundColor: color, mb: 2, borderRadius: 2, boxShadow: 3, cursor: 'pointer' }}
      onClick={() => handleCardClick(data)}
    >
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#fff' }}>
          {title}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#fff' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord de la formation
      </Typography>

      <Grid container spacing={2} mb={2}>
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
      </Grid>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} md={4}>
          {renderWidget('TOTAL AGENTS', mockData.totalAgents, '#4caf50', mockData.totalAgentsData)}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderWidget('FORMATION EN HORS E-LEARNING', mockData.trainingParticipation.inPerson, '#2196f3', mockData.inPersonData)}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderWidget('FORMATION E-LEARNING', mockData.trainingParticipation.eLearning, '#ff9800', mockData.eLearningData)}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderWidget('PARTICIPATION GLOBALE', mockData.trainingParticipation.total, '#f44336', mockData.totalParticipationData)}
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Effectif par Employeur</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <Doughnut data={createDoughnutData(mockData.donutDataEffectif)} options={{ maintainAspectRatio: false }} />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Formations par Type</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <Doughnut data={createDoughnutData(mockData.donutDataFormation)} options={{ maintainAspectRatio: false }} />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Participation aux Formations</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <Doughnut data={createDoughnutData(mockData.donutDataParticipation)} options={{ maintainAspectRatio: false }} />
            </Box>
          </Card>
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
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={downloadExcel}>
          Télécharger en Excel
        </Button>
      </Box>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-title" variant="h6" component="h2">
            Détails
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {JSON.stringify(modalData, null, 2)}
          </Typography>
          <Button onClick={() => setModalOpen(false)} sx={{ mt: 2 }}>Fermer</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default TrainingDashboard;
