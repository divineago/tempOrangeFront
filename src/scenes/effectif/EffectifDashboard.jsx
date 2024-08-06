import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import { Bar, Doughnut } from 'react-chartjs-2';
import { orangeInterns, orangeMoneyInterns, externals, directions} from '../../data/mockData';
import 'chart.js/auto'; // Ensure that chart.js is registered

const EffectifDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedDirection, setSelectedDirection] = useState('all');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleDirectionChange = (event) => {
    setSelectedDirection(event.target.value);
  };

  const filterDataByDirection = (data) => {
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
        data: [filteredOrangeInterns.total, filteredOrangeMoneyInterns.total, filteredExternals.total],
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
          filteredOrangeInterns.male + filteredOrangeMoneyInterns.male + filteredExternals.male,
          filteredOrangeInterns.female + filteredOrangeMoneyInterns.female + filteredExternals.female,
        ],
        backgroundColor: ['#2196f3', '#ff9800'],
        hoverBackgroundColor: ['#42a5f5', '#ffa726'],
      },
    ],
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
              {directions.map((direction) => (
                <MenuItem key={direction.value} value={direction.value}>
                  {direction.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {/* Internes Orange Section */}
        {selectedCategory === 'all' || selectedCategory === 'orangeInterns' ? (
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>LES INTERNES ORANGE</Typography>
            <Grid container spacing={2}>
              {selectedGender === 'all' || selectedGender === 'total' ? (
                <Grid item xs={3}>
                  {renderWidget('Total Internes', filteredOrangeInterns.total, '#4caf50')}
                </Grid>
              ) : null}
              {selectedGender === 'all' || selectedGender === 'male' ? (
                <Grid item xs={3}>
                  {renderWidget('Hommes', filteredOrangeInterns.male, '#2196f3')}
                </Grid>
              ) : null}
              {selectedGender === 'all' || selectedGender === 'female' ? (
                <Grid item xs={3}>
                  {renderWidget('Femmes', filteredOrangeInterns.female, '#ff9800')}
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        ) : null}
        {/* Internes Orange Money Section */}
        {selectedCategory === 'all' || selectedCategory === 'orangeMoneyInterns' ? (
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>LES INTERNES ORANGE MONEY</Typography>
            <Grid container spacing={2}>
              {selectedGender === 'all' || selectedGender === 'total' ? (
                <Grid item xs={3}>
                  {renderWidget('Total Internes', filteredOrangeMoneyInterns.total, '#4caf50')}
                </Grid>
              ) : null}
              {selectedGender === 'all' || selectedGender === 'male' ? (
                <Grid item xs={3}>
                  {renderWidget('Hommes', filteredOrangeMoneyInterns.male, '#2196f3')}
                </Grid>
              ) : null}
              {selectedGender === 'all' || selectedGender === 'female' ? (
                <Grid item xs={3}>
                  {renderWidget('Femmes', filteredOrangeMoneyInterns.female, '#ff9800')}
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        ) : null}
        {/* Externes Section */}
        {selectedCategory === 'all' || selectedCategory === 'externals' ? (
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>LES EXTERNES</Typography>
            <Grid container spacing={2}>
              {selectedGender === 'all' || selectedGender === 'total' ? (
                <Grid item xs={3}>
                  {renderWidget('Total Externes', filteredExternals.total, '#4caf50')}
                </Grid>
              ) : null}
              {selectedGender === 'all' || selectedGender === 'male' ? (
                <Grid item xs={3}>
                  {renderWidget('Hommes', filteredExternals.male, '#2196f3')}
                </Grid>
              ) : null}
              {selectedGender === 'all' || selectedGender === 'female' ? (
                <Grid item xs={3}>
                  {renderWidget('Femmes', filteredExternals.female, '#ff9800')}
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        ) : null}
      </Grid>

      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Bar data={barChartData} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Doughnut data={doughnutChartDataTotal} options={{ maintainAspectRatio: false, responsive: true }} />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Doughnut data={doughnutChartDataGender} options={{ maintainAspectRatio: false, responsive: true }} />
          </Card>
        </Grid>
      </Grid>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EffectifDashboard;
