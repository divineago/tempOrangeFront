import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert, TextField, Button, Modal, IconButton } from '@mui/material';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Bensizwe, Itm, Orange, OrangeMoney, directions, employeurs } from '../../data/mockData';
import 'chart.js/auto'; // Ensure that chart.js is registered
import * as XLSX from 'xlsx';
import EditIcon from '@mui/icons-material/Edit';

const EffectifDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedDirection, setSelectedDirection] = useState('all');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openModal, setOpenModal] = useState(null);

  const [inputData, setInputData] = useState({
    Bensizwe: { total: 0, male: 0, female: 0 },
    Itm: { total: 0, male: 0, female: 0 },
    Orange: { total: 0, male: 0, female: 0 },
    OrangeMoney: { total: 0, male: 0, female: 0 },
    employeurs,
  });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleDirectionChange = (event) => {
    setSelectedDirection(event.target.value);
  };

  const handleInputChange = (category, field, value) => {
    setInputData((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [field]: Number(value),
      },
    }));
  };

  const filterDataByDirection = (data) => {
    if (selectedDirection === 'all') return data;
    return {
      ...data,
      items: data.items.filter(item => item.direction === selectedDirection),
    };
  };

  const filteredBensizwe = filterDataByDirection(Bensizwe);
  const filteredItm = filterDataByDirection(Itm);
  const filteredOrange = filterDataByDirection(Orange);
  const filteredOrangeMoney = filterDataByDirection(OrangeMoney);

  const handleOpenModal = (category) => {
    setOpenModal(category);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const renderWidget = (title, value, color, category) => (
    <Card sx={{ minWidth: 275, backgroundColor: color, mb: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#fff' }}>
          {title}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#fff' }}>
          {value}
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={() => handleOpenModal(category)} sx={{ color: '#fff' }}>
            <EditIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );

  const data = [
    { name: 'Bensizwe', ...inputData.Bensizwe },
    { name: 'Itm', ...inputData.Itm },
    { name: 'Orange', ...inputData.Orange },
    { name: 'Orange Money', ...inputData.OrangeMoney },
  ];

  const barChartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Total',
        backgroundColor: '#4caf50',
        data: data.map(item => item.total),
      },
      {
        label: 'Hommes',
        backgroundColor: '#2196f3',
        data: data.map(item => item.male),
      },
      {
        label: 'Femmes',
        backgroundColor: '#ff9800',
        data: data.map(item => item.female),
      },
    ],
  };

  const doughnutChartDataTotal = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.total),
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#ff5722'],
        hoverBackgroundColor: ['#66bb6a', '#42a5f5', '#ffa726', '#ff7043'],
      },
    ],
  };

  const doughnutChartDataGender = {
    labels: ['Hommes', 'Femmes'],
    datasets: [
      {
        data: [
          inputData.Bensizwe.male + inputData.Itm.male + inputData.Orange.male + inputData.OrangeMoney.male,
          inputData.Bensizwe.female + inputData.Itm.female + inputData.Orange.female + inputData.OrangeMoney.female,
        ],
        backgroundColor: ['#2196f3', '#ff9800'],
        hoverBackgroundColor: ['#42a5f5', '#ffa726'],
      },
    ],
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'EffectifDashboard');
    XLSX.writeFile(workbook, 'EffectifDashboard.xlsx');
  };

  const renderModal = (category) => (
    <Modal open={openModal === category} onClose={handleCloseModal}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4
      }}>
        <Typography variant="h6" component="h2">
          {`Modifier ${category}`}
        </Typography>
        <TextField
          label={`Total ${category}`}
          type="number"
          value={inputData[category].total}
          onChange={(e) => handleInputChange(category, 'total', e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <TextField
          label={`Hommes ${category}`}
          type="number"
          value={inputData[category].male}
          onChange={(e) => handleInputChange(category, 'male', e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <TextField
          label={`Femmes ${category}`}
          type="number"
          value={inputData[category].female}
          onChange={(e) => handleInputChange(category, 'female', e.target.value)}
          fullWidth
          sx={{ mt: 2 }}
        />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={handleCloseModal} variant="contained" color="primary">
            Fermer
          </Button>
        </Box>
      </Box>
    </Modal>
  );

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Effectif Dashboard
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={selectedCategory} onChange={handleCategoryChange}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Bnw">BENSIZWE</MenuItem>
              <MenuItem value="Itm">ITM</MenuItem>
              <MenuItem value="OM">ORANGE MONEY</MenuItem>
              <MenuItem value="Ordc">ORANGE</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select value={selectedGender} onChange={handleGenderChange}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="male">Hommes</MenuItem>
              <MenuItem value="female">Femmes</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Direction</InputLabel>
            <Select value={selectedDirection} onChange={handleDirectionChange}>
              <MenuItem value="all">All</MenuItem>
              {directions.map((direction, index) => (
                <MenuItem key={index} value={direction}>
                  {direction}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Cards */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {renderWidget('Bensizwe', inputData.Bensizwe.total, '#4caf50', 'Bensizwe')}
        </Grid>
        <Grid item xs={3}>
          {renderWidget('Itm', inputData.Itm.total, '#2196f3', 'Itm')}
        </Grid>
        <Grid item xs={3}>
          {renderWidget('Orange', inputData.Orange.total, '#ff9800', 'Orange')}
        </Grid>
        <Grid item xs={3}>
          {renderWidget('Orange Money', inputData.OrangeMoney.total, '#ff5722', 'OrangeMoney')}
        </Grid>
      </Grid>

      {/* Charts */}
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Effectif par catégorie
              </Typography>
              <Bar data={barChartData} />
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Répartition globale
              </Typography>
              <Doughnut data={doughnutChartDataTotal} />
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
              </Typography>
              <Doughnut data={doughnutChartDataGender} />
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Export Button */}
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={exportToExcel}>
          Exporter en Excel
        </Button>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Modals */}
      {renderModal('Bensizwe')}
      {renderModal('Itm')}
      {renderModal('Orange')}
      {renderModal('OrangeMoney')}
    </Box>
  );
};

export default EffectifDashboard;
