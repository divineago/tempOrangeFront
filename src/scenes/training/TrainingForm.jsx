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
import { fetchDataFromAPI, postDataToAPI, updateDataToAPI } from '../../api';

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

const TrainingForm = ({
  formData: initialFormDataProp,
  handleInputChange: handleInputChangeProp,
  handleTypeChange,
  handleFormSubmit,
  openDialog,
  handleCloseDialog,
  editMode
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [streamOptions, setStreamOptions] = useState([]);
  const [modeOptions, setModeOptions] = useState([]);
  const [categorieOptions, setCategorieOptions] = useState([]);
  const [loading, setLoading] = useState(true); // Indicateur de chargement

  useEffect(() => {
    if (editMode && initialFormDataProp) {
      setFormData(initialFormDataProp); // Met à jour les données du formulaire en mode édition
    }
  }, [editMode, initialFormDataProp]);

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await fetchDataFromAPI('/formation/formation/get-form-choices/');
        const { stream, mode, categorie } = response.data;

        console.log("API response data:", response.data); // Ajout d'un log pour vérifier la structure des données

        const transformChoices = (choices) => {
          return Array.isArray(choices)
            ? choices.map(choice => ({
                value: choice.value,
                label: choice.label,
              }))
            : [];
        };

        setStreamOptions(transformChoices(stream || []));
        setModeOptions(transformChoices(mode || []));
        setCategorieOptions(transformChoices(categorie || []));
        setLoading(false); // Données chargées
      } catch (error) {
        console.error('Erreur lors du chargement des données de formation :', error);
        setLoading(false); // En cas d'erreur, arrêtez le chargement
      }
    };

    fetchTrainingData();
  }, []);

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await updateDataToAPI(`/formation/formation/${formData.id}/`, formData); // Mise à jour avec l'ID
      } else {
        await postDataToAPI('/formation/formation/creer%20formation/', formData); // Ajout
      }
      handleCloseDialog(); // Utilise la prop pour fermer la boîte de dialogue
      setFormData(initialFormData); // Réinitialise le formulaire après soumission
    } catch (error) {
      console.error('Erreur lors de la soumission de la formation :', error);
    }
  };

  console.log("openDialog:", openDialog);
  console.log("editMode:", editMode);

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>{editMode ? 'Modifier Formation' : 'Ajouter Formation'}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap="10px" mb="20px">
            <TextField
              label="Titre"
              name="titre"
              value={formData.titre}
              onChange={handleFormInputChange} // Utilise la fonction interne pour gérer les changements
              variant="outlined"
            />
            <TextField
              select
              label="Stream"
              name="stream"
              value={formData.stream}
              onChange={handleFormInputChange} // Utilise la fonction interne pour gérer les changements
              variant="outlined"
            >
              {!loading && streamOptions.length > 0 ? (
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
              onChange={handleFormInputChange} // Utilise la fonction interne pour gérer les changements
              variant="outlined"
            >
              {!loading && modeOptions.length > 0 ? (
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
              onChange={handleFormInputChange} // Utilise la fonction interne pour gérer les changements
              variant="outlined"
            >
              {!loading && categorieOptions.length > 0 ? (
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
              onChange={handleFormInputChange} // Utilise la fonction interne pour gérer les changements
              variant="outlined"
            />
            <TextField
              label="Cible"
              name="cible"
              value={formData.cible}
              onChange={handleFormInputChange} // Utilise la fonction interne pour gérer les changements
              variant="outlined"
            />
            <TextField
              label="Date Début"
              name="date_debut"
              type="date"
              value={formData.date_debut}
              onChange={handleFormInputChange} // Utilise la fonction interne pour gérer les changements
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Date Fin"
              name="date_fin"
              type="date"
              value={formData.date_fin}
              onChange={handleFormInputChange} // Utilise la fonction interne pour gérer les changements
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
          <Button onClick={handleSubmit} color="primary">
            {editMode ? 'Modifier' : 'Ajouter'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TrainingForm;
