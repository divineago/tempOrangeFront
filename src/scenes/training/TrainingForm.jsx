import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, Grid, MenuItem, Snackbar, Alert } from '@mui/material';
import Header from '../../components/Header';
import axios from 'axios';

const initialTrainingData = {
  titre: '',
  stream: '',
  date_debut: '',
  date_fin: '',
  categorie: '',
  description: '',
  cible: '',
};

const TrainingForm = () => {
  const [trainings, setTrainings] = useState([]);
  const [formData, setFormData] = useState(initialTrainingData);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/formation/formation/creer_formation', formData);
      setTrainings([...trainings, response.data]);
      setFormData(initialTrainingData);
      setSnackbarMessage('Training created successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Error creating training');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box m="20px">
      <Header title="TRAINING FORM" subtitle="Formulaire de formation" />

      <form onSubmit={handleFormSubmit}>
        <Box display="flex" flexDirection="column" gap="10px" mb="20px">
          <TextField label="Titre" name="titre" value={formData.titre} onChange={handleInputChange} variant="outlined" required />
          <TextField
            select
            label="Stream"
            name="stream"
            value={formData.stream}
            onChange={handleInputChange}
            variant="outlined"
            required
          >
            <MenuItem value="En ligne">En ligne</MenuItem>
            <MenuItem value="En présentiel">En présentiel</MenuItem>
          </TextField>
          <TextField
            label="Date Début"
            name="date_debut"
            type="date"
            value={formData.date_debut}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            required
          />
       
          <TextField label="Categorie" name="categorie" value={formData.categorie} onChange={handleInputChange} variant="outlined" required />
          <TextField label="Description" name="description" value={formData.description} onChange={handleInputChange} variant="outlined" required />
          <TextField label="Cible" name="cible" value={formData.cible} onChange={handleInputChange} variant="outlined" required />
          <Button type="submit" variant="contained" color="primary">
            Add Training
          </Button>
        </Box>
      </form>

      <Grid container spacing={3}>
        {trainings.map((training, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{training.titre}</Typography>
                <Typography>{`Stream: ${training.stream}`}</Typography>
                <Typography>{`Date Début: ${training.date_debut}`}</Typography>
                <Typography>{`Date Fin: ${training.date_fin}`}</Typography>
                <Typography>{`Categorie: ${training.categorie}`}</Typography>
                <Typography>{`Description: ${training.description}`}</Typography>
                <Typography>{`Cible: ${training.cible}`}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TrainingForm;
