import React, { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Grid, Typography } from '@mui/material';
import Header from '../../components/Header';
import { directions, genderOptions, agePyramid, statusOptions, initialEffectifData } from '../../data/mockData';
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from 'recharts';

const EffectifDashboard = () => {
  const [effectifData, setEffectifData] = useState(initialEffectifData);
  const [filters, setFilters] = useState({
    direction: '',
    gender: '',
    ageGroup: '',
    status: '',
  });

  const [filteredData, setFilteredData] = useState(initialEffectifData);

  useEffect(() => {
    let filtered = initialEffectifData;

    if (filters.direction) {
      filtered = filtered.filter(item => item.directionId === filters.direction);
    }
    if (filters.gender) {
      filtered = filtered.filter(item => item.gender === filters.gender);
    }
    if (filters.ageGroup) {
      // Add age group filtering logic here
    }
    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status);
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
      <Header title="Tableau de Bord de l'Effectif" subtitle="Statistiques de l'Effectif des Agents" />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {renderBarChart(filteredData, 'directionId', 'count', 'Effectif par Direction')}
          {renderPieChart(filteredData, 'count', 'gender', 'Répartition par Genre')}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderBarChart(agePyramid, 'ageGroup', 'count', 'Pyramide des Âges')}
          {renderPieChart(filteredData, 'count', 'status', 'Répartition par Statut')}
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
              label="Tranche d'Âge"
              name="ageGroup"
              value={filters.ageGroup}
              onChange={handleFilterChange}
              select
              fullWidth
            >
              {agePyramid.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Statut"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              select
              fullWidth
            >
              {statusOptions.map((option) => (
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

export default EffectifDashboard;
