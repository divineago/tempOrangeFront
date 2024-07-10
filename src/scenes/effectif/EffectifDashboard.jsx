import React, { useState } from 'react';
import { Box, TextField, MenuItem, Typography, Grid } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import Header from '../../components/Header';
import { directions, sampleDirectionStats } from '../../data/mockData';

const EffectifDashboard = () => {
  const [filters, setFilters] = useState({
    direction: '',
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const currentStats = sampleDirectionStats[filters.direction] || {
    pieData: [],
    lineData: { uData: [], pData: [] },
    barData: [],
  };

  return (
    <Box m="20px">
      <Header title="DASHBOARD DES EFFECTIFS" subtitle="Vue d'ensemble des effectifs" />

      <Box display="flex" justifyContent="space-between" mb="20px">
        <TextField
          select
          label="Direction"
          name="direction"
          value={filters.direction}
          onChange={handleFilterChange}
          variant="outlined"
          sx={{ width: '100%', color: 'black' }}
        >
          {directions.map((direction) => (
            <MenuItem key={direction.value} value={direction.value}>
              {direction.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {filters.direction && (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <PieChart
                series={[
                  {
                    data: currentStats.pieData,
                  },
                ]}
                width={600}
                height={400}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LineChart
                width={600}
                height={400}
                series={[
                  { data: currentStats.lineData.pData, label: 'Personnel', yAxisKey: 'leftAxisId' },
                  { data: currentStats.lineData.uData, label: 'Effectif', yAxisKey: 'rightAxisId' },
                ]}
                xAxis={[{ scaleType: 'point', data: ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'] }]}
                yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
                rightAxis="rightAxisId"
              />
            </Grid>
          </Grid>

          <Box mt="20px">
            <Typography variant="h5" mb="10px">
              Statistiques par Direction
            </Typography>
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Direction A', 'Direction B', 'Direction C'] }]}
              series={[{ data: currentStats.barData }]}
              width={600}
              height={400}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default EffectifDashboard;
