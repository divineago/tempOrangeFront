import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Select,
  TextField
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
  console.log("Direction Options:", directionOptions);
  console.log("Employeur Options:", employeurOptions);
  console.log("Contrat Options:", contratOptions[0]);
  

  useEffect(() => {
    if (editMode && initialFormDataProp) {
      setFormData(initialFormDataProp);
    } else {
      setFormData(initialFormData);  
    }
  }, [editMode, initialFormDataProp]);

  useEffect(() => {
    const fetchEffectifData = async () => {
      try {
        const [choicesResponse, directionResponse, employeurResponse, contratResponse] = await Promise.all([
          fetchDataFromAPI('/effectif/agent/get_choices/'),
          fetchDataFromAPI('/effectif/agent/get_direction/'),
          fetchDataFromAPI('/effectif/agent/get_employeur/'),
          fetchDataFromAPI('/effectif/agent/get_contrat/')
        ]);

        const { age, genre, statut_contrat, nationalite } = choicesResponse.data;
        const direction = directionResponse.data;
        const employeur = employeurResponse.data;
        const contrat = contratResponse.data;
        console.log('Contrat Response:', contratResponse.data);

        const transformChoices = (choices) => {
          return Array.isArray(choices)
            ? choices.map(choice => ({
                value: choice.value,
                label: choice.label,
              }))
            : [];
        };
        const transformForeignKeyData = (data) => {
          console.log('Transforming foreign key data:', data);
          return Array.isArray(data)
            ? data.map(item => ({
                id: item.id,
                value: item.id, 
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

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
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
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Prénom"
                name="prenom"
                value={formData.prenom}
                onChange={handleInputChange}
                required
              />
              
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postnom"
                name="postnom"
                value={formData.postnom}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                fullWidth
                label="Direction"
                name="direction"
                value={formData.direction || ''}
                onChange={handleInputChange}
                select
                required
              >
                {directionOptions.map(option => (
                  <MenuItem key={`direction-${option.id}`} value={option.value}>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Employeur"
                name="employeur"
                value={formData.employeur || ''}
                onChange={handleInputChange}
                select
                required
              >
              {employeurOptions.map(option => (
                <MenuItem key={`employeur-${option.id}`} value={option.value}>
                  {option.label}
                </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                type="date"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
                <InputLabel>Contrat</InputLabel>
                <Select
                  name="contrat"
                  value={formData.contrat || ''}
                  onChange={handleInputChange}
                  label="Contrat"
                >
                  {!loading ? (
                    contratOptions.map(option => (
                      <MenuItem key={`contrat-${option.id}`} value={option.id}>
                        {option.label}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Loading...</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Matricule"
                name="num_mat"
                value={formData.num_mat}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Statut du Contrat"
                name="statut_contrat"
                value={formData.statut_contrat}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Grade"
                name="grade"
                value={formData.grade}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date de Fin de Contrat"
                name="date_fin_contrat"
                value={formData.date_fin_contrat}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControlLabel
                control={
                  <Checkbox
                    checked={Boolean(formData.periode_essai)}
                    onChange={handleInputChange}
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