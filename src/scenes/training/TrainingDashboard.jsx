import React, { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Grid, Typography } from '@mui/material';
import Header from '../../components/Header';
import { directions, trainingTypes, genderOptions, periodOptions, trainingData as initialTrainingData } from '../../data/mockData';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Tooltip, Legend, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const TrainingDashboard = () => {
  const [trainingData, setTrainingData] = useState(initialTrainingData);
  const [filters, setFilters] = useState({
    direction: '',
    type: '',
    gender: '',
    period: '',
  });

  const [filteredData, setFilteredData] = useState(initialTrainingData);

  useEffect(() => {
    let filtered = initialTrainingData;

    if (filters.direction) {
      filtered = filtered.filter(item => item.directionId === filters.direction);
    }
    if (filters.type) {
      filtered = filtered.filter(item => item.type === filters.type);
    }
    if (filters.gender) {
      filtered = filtered.filter(item => item.gender === filters.gender);
    }
    if (filters.period) {
      // Add period filtering logic here
    }

    setFilteredData(filtered);
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderBarChart = (data, xKey, yKey, title) => (
    <Box mb="20px">
      <Typography variant="h6">{title}</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={yKey} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#82ca9d" : "#8884d8"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );

  const renderLineChart = (data, xKey, yKey, title) => (
    <Box mb="20px">
      <Typography variant="h6">{title}</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={yKey} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );

  const renderPieChart = (data, dataKey, nameKey, title) => (
    <Box mb="20px">
      <Typography variant="h6">{title}</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey={dataKey} nameKey={nameKey} fill="#8884d8" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#82ca9d" : "#8884d8"} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );

  return (
    <Box m="20px">
      <Header title="Tableau de Bord des Formations" subtitle="Statistiques des Formations des Agents" />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {renderBarChart(filteredData, 'directionId', 'count', 'Formations par Direction')}
          {renderPieChart(filteredData, 'count', 'type', 'Répartition par Type de Formation')}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderLineChart(filteredData, 'period', 'count', 'Évolution des Formations dans le Temps')}
          {renderPieChart(filteredData, 'count', 'gender', 'Répartition par Genre')}
        </Grid>
      </Grid>

      <Box mt="20px">
        <Typography variant="h6">Filtres</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              label="Direction"
              name="direction"
              value={filters.direction}
              onChange={handleFilterChange}
              select
              fullWidth
            >
              {directions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Type de Formation"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              select
              fullWidth
            >
              {trainingTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Genre"
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              select
              fullWidth
            >
              {genderOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Période"
              name="period"
              value={filters.period}
              onChange={handleFilterChange}
              select
              fullWidth
            >
              {periodOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TrainingDashboard;
