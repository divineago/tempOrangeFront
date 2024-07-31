import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, 
  Checkbox,
  FormControlLabel,
  Grid
} from '@mui/material';
import { fetchDataFromAPI, postDataToAPI, updateDataToAPI } from '../../api';


const initialFormData = {
      id: '',
      name: '',
      prenom: '',
      postnom: '',
      direction: '',
      employeur: '',
      genre: '',
      date_naissance: '',
      contrat: '',
      num_mat: '',
      age: '',
      statut_contrat: '',
      fonction: '',
      email: '',
      anciennete_annee:'',
      anciennete_mois:'',
      nationalite: '',
      lieu_embauche: '',
      grade: '',
      date_fin_contrat: '',
      date_embauche: '',
      dure_contrat: '',
      periode_essai: '',
};

const EffectifForm = ({
  formData: initialFormDataProp,
  handleInputChange: handleInputChangeProp,
  handleFormSubmit,
  openDialog,
  handleCloseDialog,
  editMode
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const [nationaliteOptions, setNationaliteOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [ageOptions, setAgeOptions] = useState([]);
  const [statut_contratOptions, setStatut_contratOptions] = useState([]);
  const [directionOptions, setDirectionOptions] = useState([]);
  const [employeurOptions, setEmployeurOptions] = useState([]);
  const [contratOptions, setContratOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('Contrat Options:', contratOptions);
  console.log('form data: ',formData.contrat)

  useEffect(() => {
    if (editMode && initialFormDataProp) {
      setFormData(initialFormDataProp);
    } else {
      setFormData(initialFormData);  
    }
    console.log('Valeur initiale de formData:', initialFormDataProp);
    console.log('Valeur actuelle de formData:', formData);
  }, [editMode, initialFormDataProp]);

  useEffect(() => {
    const fetchEffectifData = async () => {
      try {
        const [choicesResponse, directionResponse, employeurResponse,contratResponse] = await Promise.all([
          fetchDataFromAPI('/effectif/agent/get_choices/'),
          fetchDataFromAPI('/effectif/agent/get_direction/'),
          fetchDataFromAPI('/effectif/agent/get_employeur/'),
          fetchDataFromAPI('/effectif/agent/get_contrat/')

        ]);
        const { age, genre, statut_contrat, nationalite} = choicesResponse.data;
        const direction = directionResponse.data;
        const employeur = employeurResponse.data;
        const contrat = contratResponse.data;
        console.log('Réponse API:',choicesResponse.data,contratResponse.data,directionResponse.data);

  
        const transformChoices = (choices) => {
          return Array.isArray(choices)
            ? choices.map(choice => ({
                value: choice.value,
                label: choice.label,
              }))
            : [];
        };
        const transformForeignKeyData = (data) => {
          return Array.isArray(data)
            ? data.map(item => ({
                id: item.id,
                value: item.value,
                label: item.label,
              }))
            : [];
        };
        setGenreOptions(transformChoices(genre || []));
        setAgeOptions(transformChoices(age || []));
        setStatut_contratOptions(transformChoices(statut_contrat || []));
        setDirectionOptions(transformForeignKeyData(direction || []));
        setEmployeurOptions(transformForeignKeyData(employeur || []));
        setContratOptions(transformForeignKeyData(contrat || []));
        setNationaliteOptions(transformChoices(nationalite || []));
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des données de l\'effectif :', error);
        setLoading(false);
      }
    };
  
    fetchEffectifData();
  }, []);

  const handleFormInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    console.log('Nom:', name, 'Valeur reçue:', value);
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,

    }));
  };

  const handleSubmit = async () => {
    try {
      const submitData = {
        ...formData,
        employeur: Number(formData.employeur),
        direction: Number(formData.direction),
        contrat: Number(formData.contrat),
      };
  
      if (editMode) {
        await updateDataToAPI(`/effectif/agent/${formData.id}/`, submitData);
      } else {
        await postDataToAPI('/effectif/agent/creer_agent/', submitData);
      }
      handleCloseDialog();
      setFormData(initialFormData);
    } catch (error) {
      console.error('Erreur lors de la soumission de l\'agent :', error);
    }
  };
  
  
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
      <DialogTitle>{editMode ? 'Modifier Effectif' : 'Ajouter Agent'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nom"
                name="name"
                value={formData.name}
                onChange={handleFormInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Prénom"
                name="prenom"
                value={formData.prenom}
                onChange={handleFormInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postnom"
                name="postnom"
                value={formData.postnom}
                onChange={handleFormInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                fullWidth
                label="Direction"
                name="direction"
                value={formData.direction || ''}
                onChange={handleFormInputChange}
                select
                required
              >
                {!loading && directionOptions.length > 0 ? (
                  directionOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                     {option.label}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Loading...</MenuItem>
                )}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Employeur"
                name="employeur"
                value={formData.employeur|| ''}
                onChange={handleFormInputChange}
                select
                required
              >
              {!loading && employeurOptions.length > 0 ? (
                employeurOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                     {option.label}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Loading...</MenuItem>
              )}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Genre"
                name="genre"
                value={formData.genre}
                onChange={handleFormInputChange}
                select
                required
              >
                {!loading && genreOptions.length > 0 ? (
                  genreOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Loading...</MenuItem>
                )}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date de Naissance"
                name="date_naissance"
                value={formData.date_naissance}
                onChange={handleFormInputChange}
                type="date"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Contrat"
                name="contrat"
                value={formData.contrat || ''}
                onChange={handleFormInputChange}
                select
                required
              >{!loading && contratOptions.length > 0 ? (
                contratOptions.map((option) => {
                console.log('Clé de MenuItem:', option.id); // Vérifiez les clés
                  <MenuItem key={option.id} value={option.id}>
                      {option.label}
                  </MenuItem>
                })
              ) : (
                <MenuItem disabled>Loading...</MenuItem>
              )}
                
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Matricule"
                name="num_mat"
                value={formData.num_mat}
                onChange={handleFormInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Statut du Contrat"
                name="statut_contrat"
                value={formData.statut_contrat}
                onChange={handleFormInputChange}
                select
                required
              >
                {!loading && statut_contratOptions.length > 0 ? (
                  statut_contratOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Loading...</MenuItem>
                )}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="tranche d'age"
                name="age"
                value={formData.age}
                onChange={handleFormInputChange}
                select
                required
              >
                {!loading && ageOptions.length > 0 ? (
                  ageOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>Loading...</MenuItem>
                )}
              </TextField>
              </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fonction"
                name="fonction"
                value={formData.fonction}
                onChange={handleFormInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleFormInputChange}
                type="email"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nationalité"
                name="nationalite"
                value={formData.nationalite}
                onChange={handleFormInputChange}
                select
                required
              >
               {!loading && nationaliteOptions.length > 0 ? (
                nationaliteOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Loading...</MenuItem>
              )}
               </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Lieu d'Embauche"
                name="lieu_embauche"
                value={formData.lieu_embauche}
                onChange={handleFormInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Grade"
                name="grade"
                value={formData.grade}
                onChange={handleFormInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date de Fin de Contrat"
                name="date_fin_contrat"
                value={formData.date_fin_contrat}
                onChange={handleFormInputChange}
                type="date"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date d'Embauche"
                name="date_embauche"
                value={formData.date_embauche}
                onChange={handleFormInputChange}
                type="date"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Durée du Contrat (mois)"
                name="dure_contrat"
                value={formData.dure_contrat}
                onChange={handleFormInputChange}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.periode_essai}
                    onChange={handleFormInputChange}
                    name="periode_essai"
                  />
                }
                label="Période d'Essai"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} color="primary">
            {editMode ? 'Modifier' : 'Ajouter'}
          </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EffectifForm;