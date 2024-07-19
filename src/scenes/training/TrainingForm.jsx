import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { fetchDataFromAPI, postDataToAPI } from '../../api';

const initialFormData = {
  id: '',
  titre: '',
  date_debut: '',
  date_fin: '',
  stream: '',
  mode: '',
  categorie: '',
  description: '',
  cible: '',
};

const TrainingForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [openDialog, setOpenDialog] = useState(false);
  const [streamOptions, setStreamOptions] = useState([]);
  const [modeOptions, setModeOptions] = useState([]);
  const [categorieOptions, setCategorieOptions] = useState([]);

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await fetchDataFromAPI('/formation/formation/creer%20formation/');
        const { stream, mode, categorie } = response.data;

        const transformChoices = (choices) => {
          return Array.isArray(choices)
            ? choices.map(choice => ({
                value: choice[0],
                label: choice[1],
              }))
            : [];
        };

        setStreamOptions(transformChoices(stream?.choices || []));
        setModeOptions(transformChoices(mode?.choices || []));
        setCategorieOptions(transformChoices(categorie?.choices || []));
      } catch (error) {
        console.error('Erreur lors du chargement des données de formation :', error);
      }
    };

    fetchTrainingData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      await postDataToAPI('/formation/formation/creer%20formation/', formData);
      setOpenDialog(false);
      setFormData(initialFormData); // Réinitialise le formulaire après soumission
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la formation :', error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <Button onClick={handleOpenDialog} color="primary" variant="contained">
        Ajouter Formation
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>Ajouter une formation</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap="10px" mb="20px">
            <TextField
              label="Titre"
              name="titre"
              value={formData.titre}
              onChange={handleInputChange}
              variant="outlined"
              required
            />
            <TextField
              select
              label="Stream"
              name="stream"
              value={formData.stream}
              onChange={handleInputChange}
              variant="outlined"
              required
            >
              {streamOptions.length > 0 ? (
                streamOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Loading...</MenuItem>
              )}
            </TextField>
            <TextField
              select
              label="Mode"
              name="mode"
              value={formData.mode}
              onChange={handleInputChange}
              variant="outlined"
              required
            >
              {modeOptions.length > 0 ? (
                modeOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Loading...</MenuItem>
              )}
            </TextField>
            <TextField
              select
              label="Catégorie"
              name="categorie"
              value={formData.categorie}
              onChange={handleInputChange}
              variant="outlined"
              required
            >
              {categorieOptions.length > 0 ? (
                categorieOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Loading...</MenuItem>
              )}
            </TextField>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              label="Cible"
              name="cible"
              value={formData.cible}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              label="Date Début"
              name="date_debut"
              type="date"
              value={formData.date_debut}
              onChange={handleInputChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Date Fin"
              name="date_fin"
              type="date"
              value={formData.date_fin}
              onChange={handleInputChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleFormSubmit} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TrainingForm;
