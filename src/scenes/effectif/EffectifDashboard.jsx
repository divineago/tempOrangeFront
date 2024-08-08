import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert, TextField, Button } from '@mui/material';
import { Bar, Doughnut } from 'react-chartjs-2';
import { orangeInterns, orangeMoneyInterns, externals, directions} from '../../data/mockData';
import 'chart.js/auto'; 
import * as XLSX from 'xlsx';
import { fetchDataFromAPI} from "../../api";

const EffectifDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedDirection, setSelectedDirection] = useState('all');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [directions, setDirections] = useState([]);

  const [inputData, setInputData] = useState({
    orangeInterns: { total: 0, male: 0, female: 0 },
    orangeMoneyInterns: { total: 0, male: 0, female: 0 },
    externals: { total: 0, male: 0, female: 0 },
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

  const filteredOrangeInterns = filterDataByDirection(orangeInterns);
  const filteredOrangeMoneyInterns = filterDataByDirection(orangeMoneyInterns);
  const filteredExternals = filterDataByDirection(externals);

  const renderWidget = (title, value, color) => (
    <Card sx={{ minWidth: 275, backgroundColor: color, mb: 2, borderRadius: 2, boxShadow: 3 }}>
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

  const data = [
    { name: 'Orange', total: filteredOrangeInterns.total, male: filteredOrangeInterns.male, female: filteredOrangeInterns.female },
    { name: 'Orange Money', total: filteredOrangeMoneyInterns.total, male: filteredOrangeMoneyInterns.male, female: filteredOrangeMoneyInterns.female },
    { name: 'ITM', totMal: filteredExternals.total, male: filteredExternals.male, female: filteredExternals.female },
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
    labels: ['Internes Orange', 'Internes Orange Money', 'Externes'],
    datasets: [
      {
        data: [inputData.orangeInterns.total, inputData.orangeMoneyInterns.total, inputData.externals.total],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
        hoverBackgroundColor: ['#66bb6a', '#42a5f5', '#ffa726'],
      },
    ],
  };

  const doughnutChartDataGender = {
    labels: ['Hommes', 'Femmes'],
    datasets: [
      {
        data: [
          inputData.orangeInterns.male + inputData.orangeMoneyInterns.male + inputData.externals.male,
          inputData.orangeInterns.female + inputData.orangeMoneyInterns.female + inputData.externals.female,
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

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Effectif Dashboard
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={selectedCategory} onChange={handleCategoryChange}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="orangeInterns">Internes Orange</MenuItem>
              <MenuItem value="orangeMoneyInterns">Internes Orange Money</MenuItem>
              <MenuItem value="externals">Externes</MenuItem>
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
            {Array.isArray(directions) && directions.map((direction) => (
              <MenuItem key={direction.id} value={direction.id}>
                {direction.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      </Grid>

      <Grid container spacing={2} mb={2}>
        <Grid item xs={4}>
          <TextField
            label="Total Internes Orange"
            type="number"
            value={inputData.orangeInterns.total}
            onChange={(e) => handleInputChange('orangeInterns', 'total', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Hommes Internes Orange"
            type="number"
            value={inputData.orangeInterns.male}
            onChange={(e) => handleInputChange('orangeInterns', 'male', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Femmes Internes Orange"
            type="number"
            value={inputData.orangeInterns.female}
            onChange={(e) => handleInputChange('orangeInterns', 'female', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Total Internes Orange Money"
            type="number"
            value={inputData.orangeMoneyInterns.total}
            onChange={(e) => handleInputChange('orangeMoneyInterns', 'total', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Hommes Internes Orange Money"
            type="number"
            value={inputData.orangeMoneyInterns.male}
            onChange={(e) => handleInputChange('orangeMoneyInterns', 'male', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Femmes Internes Orange Money"
            type="number"
            value={inputData.orangeMoneyInterns.female}
            onChange={(e) => handleInputChange('orangeMoneyInterns', 'female', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Total Externes"
            type="number"
            value={inputData.externals.total}
            onChange={(e) => handleInputChange('externals', 'total', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Hommes Externes"
            type="number"
            value={inputData.externals.male}
            onChange={(e) => handleInputChange('externals', 'male', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Femmes Externes"
            type="number"
            value={inputData.externals.female}
            onChange={(e) => handleInputChange('externals', 'female', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button variant="contained" onClick={exportToExcel} color="primary">
            Export to Excel
          </Button>
        </Grid>
      </Grid>

      {/* Widgets */}
      <Grid container spacing={2} mb={2}>
      <Grid item xs={4} style={{ position: 'relative' }}>
          {renderWidget('Total Internes Orange', inputData.orangeInterns.total, '#4caf50')}
          <Button
            variant="contained"
            color="primary"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              margin: '8px',
            }}
            onClick={() => {
              // Action à effectuer lorsque le bouton est cliqué
            }}
          >
            Voir plus
          </Button>
        </Grid>

        <Grid item xs={4} style={{ position: 'relative' }}>
        {renderWidget('Total Internes Orange Money', inputData.orangeMoneyInterns.total, '#2196f3')}
        <Button
            variant="contained"
            color="primary"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              margin: '8px',
            }}
            onClick={() => {
              // Action à effectuer lorsque le bouton est cliqué
            }}
          >
            Voir plus
          </Button>
        </Grid>
        <Grid item xs={4} style={{ position: 'relative' }}>
        {renderWidget('Total Externes', inputData.externals.total, '#ff9800')}
        <Button
            variant="contained"
            color="primary"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              margin: '8px',
            }}
            onClick={() => {
              // Action à effectuer lorsque le bouton est cliqué
            }}
          >
            Voir plus
          </Button>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Répartition par type de personnel
              </Typography>
              <Bar data={barChartData} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Répartition totale
              </Typography>
              <Doughnut data={doughnutChartDataTotal} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                Répartition par genre
              </Typography>
              <Doughnut data={doughnutChartDataGender} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EffectifDashboard;
