import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Bar, Line } from 'react-chartjs-2';
import { orangeInterns, orangeMoneyInterns, externals } from '../../data/mockData';
import 'chart.js/auto'; // Ensure that chart.js is registered

const EffectifDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

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
    { name: 'Internes Orange', total: orangeInterns.total, male: orangeInterns.male, female: orangeInterns.female },
    { name: 'Internes Orange Money', total: orangeMoneyInterns.total, male: orangeMoneyInterns.male, female: orangeMoneyInterns.female },
    { name: 'Externes', total: externals.total, male: externals.male, female: externals.female },
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

  const lineChartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Total',
        borderColor: '#4caf50',
        fill: false,
        data: data.map(item => item.total),
      },
      {
        label: 'Hommes',
        borderColor: '#2196f3',
        fill: false,
        data: data.map(item => item.male),
      },
      {
        label: 'Femmes',
        borderColor: '#ff9800',
        fill: false,
        data: data.map(item => item.female),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Effectif Dashboard
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select value={selectedGender} onChange={handleGenderChange}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="male">Hommes</MenuItem>
              <MenuItem value="female">Femmes</MenuItem>
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
                  {renderWidget('Total Internes', orangeInterns.total, '#4caf50')}
                </Grid>
              ) : null}
              {selectedGender === 'all' || selectedGender === 'male' ? (
                <Grid item xs={3}>
                  {renderWidget('Hommes', orangeInterns.male, '#2196f3')}
                </Grid>
              ) : null}
              {selectedGender === 'all' || selectedGender === 'female' ? (
                <Grid item xs={3}>
                  {renderWidget('Femmes', orangeInterns.female, '#ff9800')}
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
                  {renderWidget('Total Internes', orangeMoneyInterns.total, '#4caf50')}
                </Grid>
              ) : null}
              {selectedGender === 'all' || selectedGender === 'male' ? (
                <Grid item xs={3}>
                  {renderWidget('Hommes', orangeMoneyInterns.male, '#2196f3')}
                </Grid>
              ) : null}
              {selectedGender === 'all' || selectedGender === 'female' ? (
                <Grid item xs={3}>
                  {renderWidget('Femmes', orangeMoneyInterns.female, '#ff9800')}
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
                  {renderWidget('Total Externes', externals.total, '#4caf50')}
                </Grid>
              ) : null}
              {selectedGender === 'all' || selectedGender === 'male' ? (
                <Grid item xs={3}>
                  {renderWidget('Hommes', externals.male, '#2196f3')}
                </Grid>
              ) : null}
              {selectedGender === 'all' || selectedGender === 'female' ? (
                <Grid item xs={3}>
                  {renderWidget('Femmes', externals.female, '#ff9800')}
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        ) : null}
      </Grid>

      {/* Charts */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Effectif Par Categorie
        </Typography>
        <Box sx={{ height: '400px' }}>
          <Bar data={barChartData} options={chartOptions} />
        </Box>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Evolution Par Categorie
        </Typography>
        <Box sx={{ height: '400px' }}>
          <Line data={lineChartData} options={chartOptions} />
        </Box>
      </Box>
    </Box>
  );
};

export default EffectifDashboard;
