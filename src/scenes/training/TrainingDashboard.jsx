import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BarChart, PieChart, BarSeries, PieSeries, ChartContainer, ChartTooltip, ChartLegend, CartesianGrid, XAxis, YAxis } from '@mui/x-charts';
import Header from '../../components/Header';
import { trainingData } from '../../data/mockData';

const TrainingDashboard = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    setTrainings(trainingData);
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'duration', headerName: 'Duration (hours)', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
  ];

  const rows = trainings.map((training, index) => ({
    id: index + 1,
    name: training.name,
    type: training.type,
    duration: training.duration,
    date: training.date,
  }));

  const trainingTypeData = trainings.reduce((acc, training) => {
    const found = acc.find((item) => item.name === training.type);
    if (found) {
      found.value += 1;
    } else {
      acc.push({ name: training.type, value: 1 });
    }
    return acc;
  }, []);

  const durationData = trainings.reduce((acc, training) => {
    const found = acc.find((item) => item.name === training.type);
    if (found) {
      found.value += training.duration;
    } else {
      acc.push({ name: training.type, value: training.duration });
    }
    return acc;
  }, []);

  return (
    <Box m="20px">
      <Header title="TRAINING DASHBOARD" subtitle="Interactive Training Statistics" />

      <Box mt="20px">
        <Typography variant="h6">Training List</Typography>
        <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
      </Box>

      <Box mt="40px">
        <Typography variant="h6">Training Type Distribution</Typography>
        <ChartContainer width={400} height={400}>
          <PieChart data={trainingTypeData}>
            <PieSeries dataKey="value" nameKey="name">
              <ChartTooltip />
              <ChartLegend />
            </PieSeries>
          </PieChart>
        </ChartContainer>
      </Box>

      <Box mt="40px">
        <Typography variant="h6">Total Duration by Training Type</Typography>
        <ChartContainer width={600} height={300}>
          <BarChart data={durationData}>
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip />
            <ChartLegend />
            <BarSeries dataKey="value" nameKey="name" fill="#8884d8" />
          </BarChart>
        </ChartContainer>
      </Box>
    </Box>
  );
};

export default TrainingDashboard;
