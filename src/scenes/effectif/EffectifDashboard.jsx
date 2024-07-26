import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { orangeInterns, orangeMoneyInterns, externals } from '../../data/mockData'; // Assurez-vous que le chemin est correct

const EffectifDashboard = () => {
  const renderWidget = (title, value, color) => (
    <Card sx={{ minWidth: 275, backgroundColor: color }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h3">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Effectif Dashboard
      </Typography>
      <Grid container spacing={2}>
        {/* Internes Orange Section */}
        <Grid item xs={12}>
          <Typography variant="h6">LES INTERNES ORANGE</Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              {renderWidget('Total Internes', orangeInterns.total, '#FF7F50')}
            </Grid>
            <Grid item xs={3}>
              {renderWidget('Hommes', orangeInterns.male, '#FFA07A')}
            </Grid>
            <Grid item xs={3}>
              {renderWidget('Femmes', orangeInterns.female, '#FF6347')}
            </Grid>
          </Grid>
        </Grid>

        {/* Internes Orange Money Section */}
        <Grid item xs={12}>
          <Typography variant="h6">LES INTERNES ORANGE MONEY</Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              {renderWidget('Total Internes', orangeMoneyInterns.total, '#FF7F50')}
            </Grid>
            <Grid item xs={3}>
              {renderWidget('Hommes', orangeMoneyInterns.male, '#FFA07A')}
            </Grid>
            <Grid item xs={3}>
              {renderWidget('Femmes', orangeMoneyInterns.female, '#FF6347')}
            </Grid>
          </Grid>
        </Grid>

        {/* Externes Section */}
        <Grid item xs={12}>
          <Typography variant="h6">LES EXTERNES</Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              {renderWidget('Total Externes', externals.total, '#1E90FF')}
            </Grid>
            <Grid item xs={3}>
              {renderWidget('Hommes', externals.male, '#87CEFA')}
            </Grid>
            <Grid item xs={3}>
              {renderWidget('Femmes', externals.female, '#4682B4')}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EffectifDashboard;
