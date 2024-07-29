import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Bar, Line } from 'react-chartjs-2';
import { orangeInterns, orangeMoneyInterns, externals, directions } from '../../data/mockData';
import 'chart.js/auto'; // Ensure that chart.js is registered
import PeopleIcon from '@mui/icons-material/People';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const EffectifDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedDirection, setSelectedDirection] = useState('all');

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
    return data.filter(item => item.direction === selectedDirection);
  };

  const filteredOrangeInterns = filterDataByDirection(orangeInterns);
  const filteredOrangeMoneyInterns = filterDataByDirection(orangeMoneyInterns);
  const filteredExternals = filterDataByDirection(externals);

  const renderWidget = (title, value, color, icon) => (
    <Card sx={{ minWidth: 200, backgroundColor: color, mb: 2, borderRadius: 2, boxShadow: 3 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        {icon}
        <Box ml={2}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#fff' }}>
            {title}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#fff' }}>
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  const data = [
    { name: 'Internes Orange', total: filteredOrangeInterns.total, male: filteredOrangeInterns.male, female: filteredOrangeInterns.female },
    { name: 'Internes Orange Money', total: filteredOrangeMoneyInterns.total, male: filteredOrangeMoneyInterns.male, female: filteredOrangeMoneyInterns.female },
    { name: 'Externes', total: filteredExternals.total, male: filteredExternals.male, female: filteredExternals.female },
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
                <Grid item xs={4}>
                  {renderWidget('Total Internes', filteredOrangeInterns.total, '#4caf50', <PeopleIcon sx={{ color: '#fff', fontSize: 40 }} />)}
                </Grid>
              ) : null}
              {selectedGender === 'all' || selectedGender === 'male' ? (
                <Grid item xs={4}>
                  {renderWidget('Hommes', filteredOrangeInterns.male, '#2196f3', <MaleIcon sx={{ color: '#fff', fontSize: 40 }} />)}
                </Grid>
              ) : null}
              {selectedGender === 'all' || selectedGender === 'female' ? (
                <Grid item xs={4}>
                  {renderWidget('Femmes', filteredOrangeInterns.female, '#ff9800', <FemaleIcon sx={{ color: '#fff', fontSize: 40 }} />)}
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
                <Grid item xs={4}>
                  {renderWidget('Total Internes', filteredOrangeMoneyInterns.total, '#4caf50', <PeopleIcon sx={{ color: '#fff', fontSize: 40 }} />)}
                </Grid>
              ) : null}
              {selectedGender === 'all' || selectedGender === 'male' ? (
                <Grid item xs={4}>
                  {renderWidget('Hommes', filteredOrangeMoneyInterns.male, '#2196f3', <MaleIcon sx={{ color: '#fff', fontSize: 40 }} />)}
                </Grid>
              ) : null}
              {selectedGender === 'all' || selectedGender === 'female' ? (
                <Grid item xs={4}>
                  {renderWidget('Femmes', filteredOrangeMoneyInterns.female, '#ff9800', <FemaleIcon sx={{ color: '#fff', fontSize: 40 }} />)}
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
                <Grid item xs={4}>
                  {renderWidget('Total Externes', filteredExternals.total, '#4caf50', <PeopleIcon sx={{ color: '#fff', fontSize: 40 }} />)}
                </Grid>
              ) : null}
              {selectedGender === 'all' || selectedGender === 'male' ? (
                <Grid item xs={4}>
                  {renderWidget('Hommes', filteredExternals.male, '#2196f3', <MaleIcon sx={{ color: '#fff', fontSize: 40 }} />)}
                </Grid>
              ) : null}
              {selectedGender === 'all' || selectedGender === 'female' ? (
                                <Grid item xs={4}>
                                {renderWidget('Femmes', filteredExternals.female, '#ff9800', <FemaleIcon sx={{ color: '#fff', fontSize: 40 }} />)}
                              </Grid>
                            ) : null}
                          </Grid>
                        </Grid>
                      ) : null}
                    </Grid>
              
                    {/* Bar and Line Charts */}
                    <Box mt={4}>
                      <Typography variant="h5" gutterBottom>
                        Statistiques des Effectifs
                      </Typography>
                      <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                          <Card sx={{ p: 2, boxShadow: 3 }}>
                            <Bar data={barChartData} />
                          </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Card sx={{ p: 2, boxShadow: 3 }}>
                            <Line data={lineChartData} />
                          </Card>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                );
              };
              
              export default EffectifDashboard;
              