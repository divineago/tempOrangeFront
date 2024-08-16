import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { fetchDataFromAPI } from "../../api";
import 'chart.js/auto'; // Ensure that chart.js is registered
import * as XLSX from 'xlsx';
import EditIcon from '@mui/icons-material/Edit';
import {
  Card, CardContent, Typography, Box, Button, IconButton, TextField, Modal, Snackbar, Alert,
  FormControl, InputLabel, Select, MenuItem, Grid
} from '@mui/material';

const EffectifDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedDirection, setSelectedDirection] = useState('all');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [directions, setDirections] = useState([]);
  const [openModal, setOpenModal] = useState(null);

  const [inputData, setInputData] = useState({
    Bensizwe: { total: 0, male: 0, female: 0 },
    Itm: { total: 0, male: 0, female: 0 },
    Orange: { total: 0, male: 0, female: 0 },
    OrangeMoney: { total: 0, male: 0, female: 0 },
    orangeInterns: { total: 0, male: 0, female: 0 },
    orangeMoneyInterns: { total: 0, male: 0, female: 0 },
    externals: { total: 0, male: 0, female: 0 }
  });

  useEffect(() => {
    fetchEffectifData();
  }, []);

  const fetchEffectifData = async () => {
    try {
      const response = await fetchDataFromAPI('/effectif/direction/get_direction/');
      console.log('Fetched directions:', response.data);
      if (Array.isArray(response.data)) {
        setDirections(response.data);
      } else {
        console.error('Expected an array but got:', response.data);
        setDirections([]);
      }
    } catch (error) {
      console.error('Error fetching direction data:', error);
      setDirections([]);
    }
  };

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
    if (!data || !data.items || !Array.isArray(data.items)) {
      console.error('Invalid data structure:', data);
      return { ...data, items: [] };
    }

    if (selectedDirection === 'all') return data;

    return {
      ...data,
      items: data.items.filter(item => item.direction === selectedDirection),
    };
  };

  const filteredBensizwe = filterDataByDirection(inputData.Bensizwe);
  const filteredItm = filterDataByDirection(inputData.Itm);
  const filteredOrange = filterDataByDirection(inputData.Orange);
  const filteredOrangeMoney = filterDataByDirection(inputData.OrangeMoney);

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
              <MenuItem value="internal">Internal</MenuItem>
              <MenuItem value="external">External</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select value={selectedGender} onChange={handleGenderChange}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Direction</InputLabel>
            <Select value={selectedDirection} onChange={handleDirectionChange}>
              <MenuItem value="all">All</MenuItem>
              {directions.map(direction => (
                <MenuItem key={direction.id} value={direction.id}>{direction.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Widgets */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          {renderWidget('Bensizwe', inputData.Bensizwe.total, '#4caf50', 'Bensizwe')}
          {renderModal('Bensizwe')}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderWidget('Itm', inputData.Itm.total, '#2196f3', 'Itm')}
          {renderModal('Itm')}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderWidget('Orange', inputData.Orange.total, '#ff9800', 'Orange')}
          {renderModal('Orange')}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {renderWidget('Orange Money', inputData.OrangeMoney.total, '#ff5722', 'OrangeMoney')}
          {renderModal('OrangeMoney')}
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={2} mt={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Effectifs Totals</Typography>
              <Bar data={barChartData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Répartition des Effectifs</Typography>
              <Doughnut data={doughnutChartDataTotal} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Répartition par Genre</Typography>
              <Doughnut data={doughnutChartDataGender} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Export Button */}
      <Box display="flex" justifyContent="flex-end" mt={4}>
        <Button variant="contained" color="primary" onClick={exportToExcel}>
          Exporter en Excel
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EffectifDashboard;
