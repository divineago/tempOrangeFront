import React, { useState } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const TrainingDashboard = () => {
  const [filters, setFilters] = useState({ filterName: '' });

  const data = {
    totalAgents: 676,
    trainingParticipation: {
      inPerson: 44,
      eLearning: 220,
      total: 676,
    },
    directions: [
      { name: 'Direction Commercial et Marketing B2B', total: 33, notTrained: 33, trained: 0, inPerson: 0, eLearning: 0 },
      { name: 'Direction de Ventes & Distribution grand public', total: 56, notTrained: 0, trained: 56, inPerson: 0, eLearning: 0 },
      // Add other directions...
    ],
  };

  const pieDataEffectif = {
    labels: ['BENSIZWE', 'ITM', 'ORDC'],
    datasets: [
      {
        data: [272, 140, 264],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const pieDataFormation = {
    labels: ['Total Formations Hors E-Learning', 'Total Formations E-Learning'],
    datasets: [
      {
        data: [44, 220],
        backgroundColor: ['#FF6384', '#FFCE56'],
      },
    ],
  };

  const pieDataParticipation = {
    labels: ['Aucune Participation', 'Au Moins Une Participation'],
    datasets: [
      {
        data: [676, 0],
        backgroundColor: ['#FF6384', '#FFCE56'],
      },
    ],
  };

  const handleChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl variant="outlined" style={{ minWidth: 200, marginRight: 20 }}>
            <InputLabel>Filter Name</InputLabel>
            <Select
              name="filterName"
              value={filters.filterName}
              onChange={handleChange}
              label="Filter Name"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="value1">Value 1</MenuItem>
              <MenuItem value="value2">Value 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="total-agents">
            <h2>TOTAL AGENTS</h2>
            <p>{data.totalAgents}</p>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="training-participation">
            <h2>FORMATION EN HORS E-LEARNING</h2>
            <p>{data.trainingParticipation.inPerson}</p>
            <h2>FORMATION E-LEARNING</h2>
            <p>{data.trainingParticipation.eLearning}</p>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className="overall-participation">
            <h2>PARTICIPATION GLOBALE</h2>
            <p>{data.trainingParticipation.total}</p>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="directions-table">
            <h2>DIRECTIONS</h2>
            <table>
              <thead>
                <tr>
                  <th>Direction</th>
                  <th>Total</th>
                  <th>Pas Formés</th>
                  <th>Formés</th>
                  <th>Hors E-Learning</th>
                  <th>E-Learning</th>
                </tr>
              </thead>
              <tbody>
                {data.directions.map((direction, index) => (
                  <tr key={index}>
                    <td>{direction.name}</td>
                    <td>{direction.total}</td>
                    <td>{direction.notTrained}</td>
                    <td>{direction.trained}</td>
                    <td>{direction.inPerson}</td>
                    <td>{direction.eLearning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <h3>Graphique sur l'effectif</h3>
          <Pie data={pieDataEffectif} />
        </Grid>
        <Grid item xs={12} md={4}>
          <h3>Graphique des formations en présentiel et par E-learning</h3>
          <Pie data={pieDataFormation} />
        </Grid>
        <Grid item xs={12} md={4}>
          <h3>Graphique sur la participation aux formations</h3>
          <Pie data={pieDataParticipation} />
        </Grid>
      </Grid>
    </div>
  );
};

export default TrainingDashboard;
