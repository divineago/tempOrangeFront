import React, { useState, useEffect } from "react";
import Loading from "../utils/loading";
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
  TextField,
} from "@mui/material";
import { fetchDataFromAPI, postDataToAPI, updateDataToAPI } from "../../api";

const initialFormData = {
  id: "",
  cuid: "",
  name: "",
  prenom: "",
  postnom: "",
  direction: "",
  employeur: "",
  genre: "",
  date_naissance: "",
  contrat: "",
  num_mat: "",
  phone: "",
  age: "",
  statut_contrat: "",
  fonction: "",
  email: "",
  anciennete_annee: "",
  anciennete_mois: "",
  nationalite: "",
  lieu_embauche: "",
  grade: "",
  date_fin_contrat: "",
  date_embauche: "",
  dure_contrat: "",
  periode_essai: "",
};

const EffectifForm = ({
  formData: initialFormDataProp,
  handleFormSubmit,
  openDialog,
  handleCloseDialog,
  editMode,
}) => {
  const [isSuccess, setIsSuccess] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [cuidOptions, setCuidOptions] = useState([]);
  const [nationaliteOptions, setNationaliteOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [ageOptions, setAgeOptions] = useState([]);
  const [statut_contratOptions, setStatut_contratOptions] = useState([]);
  const [directionOptions, setDirectionOptions] = useState([]);
  const [employeurOptions, setEmployeurOptions] = useState([]);
  const [contratOptions, setContratOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setIsSuccess(true)
    if (editMode && initialFormDataProp) {
      setFormData(initialFormDataProp);
    } else {
      setFormData(initialFormData);
    }
  }, [editMode, initialFormDataProp]);

  useEffect(() => {
    const fetchEffectifData = async () => {
      try {
        const [
          choicesResponse,
          directionResponse,
          employeurResponse,
          contratResponse,
          cuidResponse,
        ] = await Promise.all([
          fetchDataFromAPI("/effectif/agent/get_choices/"),
          fetchDataFromAPI("/effectif/agent/get_direction/"),
          fetchDataFromAPI("/effectif/agent/get_employeur/"),
          fetchDataFromAPI("/effectif/agent/get_contrat/"),
          fetchDataFromAPI("/effectif/agent/get_user/"),
        ]);

        const { age, genre, statut_contrat, nationalite } =
          choicesResponse.data;
        const direction = directionResponse.data;
        const employeur = employeurResponse.data;
        const contrat = contratResponse.data;
        const cuid = cuidResponse.data;

        const transformChoices = (choices) => {
          return Array.isArray(choices)
            ? choices.map((choice) => ({
                value: choice.value,
                label: choice.label,
              }))
            : [];
        };
        const transformForeignKeyData = (data) => {
          return Array.isArray(data)
            ? data.map((item) => ({
                id: item.id,
                value: item.id,
                label: item.label,
              }))
            : [];
        };
        setGenreOptions(transformChoices(genre || []));
        setAgeOptions(transformChoices(age || []));
        setCuidOptions(transformForeignKeyData(cuid || [])); // Mise à jour des options de CUID
        setStatut_contratOptions(transformChoices(statut_contrat || []));
        setDirectionOptions(transformForeignKeyData(direction || []));
        setEmployeurOptions(transformForeignKeyData(employeur || []));
        setContratOptions(transformForeignKeyData(contrat || []));
        setNationaliteOptions(transformChoices(nationalite || []));
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des données de l'effectif :",
          error
        );
        // setLoading(false);
      }
    };

    fetchEffectifData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
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
      submitData.periode_essai = submitData.periode_essai ?? false;

      submitData.user = {
        cuid: `${submitData?.cuid}`,
        email: `${submitData?.email}`,
        phone: `${submitData?.phone}`,
      };
      delete submitData.cuid;
      console.log("**********submit data:", submitData);
      //   const data={
      //     "contrat":2,
      //     "employeur": 1,
      //     "direction": 1,
      //     "user": {
      //         "cuid": "YUIOE7567",
      //         "email": "woso@mailatTYor.com",
      //         "phone": "825 6653899",

      //     },
      //     "statut_contrat": "local",
      //     "name": "YEUIO",
      //     "postnom": "URU",
      //     "prenom": "HJK",
      //     "age": "51-60",
      //     "genre": "Homme",
      //     "nationalite": "Congolaise",
      //     "fonction": "Est facere eos dolo",
      //     "grade": "Ex nisi perspiciatis",
      //     "anciennete_annee": "4",
      //     "anciennete_mois": "9",
      //     "num_mat": "13425HDYU",
      //     "periode_essai": true,
      //     "lieu_embauche": "Veniam qui aut est",
      //     "date_embauche": "2019-10-04",
      //     "date_naissance": "1998-01-20",
      //     "dure_contrat": "Magnam ut at in exce",
      //     "date_fin_contrat": "2023-12-20",
      //     "is_directeur": false
      // }

      if (editMode) {
        await updateDataToAPI(`/effectif/agent/${formData.id}/`, submitData);
      } else {
        const response = await postDataToAPI(
          "/effectif/agent/creer_agent/",
          submitData
        );
        if (response.status === 200) {
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
        }
        console.log(response);
      }

      handleCloseDialog();
      setFormData(initialFormData);
    } catch (error) {
      console.error("Erreur lors de la soumission de l'agent :", error);
    }
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md">
        <DialogTitle>
          {editMode ? "Modifier Effectif" : "Ajouter Agent"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleFormSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Cuid"
                  name="cuid"
                  value={formData.cuid}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
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
                <FormControl fullWidth required>
                  <InputLabel>Direction</InputLabel>
                  <Select
                    name="direction"
                    value={formData.direction || ""}
                    onChange={handleInputChange}
                    label="Direction">
                    {!loading ? (
                      directionOptions.map((option) => (
                        <MenuItem key={option.id} value={option.value}>
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
                <FormControl fullWidth required>
                  <InputLabel>Employeur</InputLabel>
                  <Select
                    name="employeur"
                    value={formData.employeur || ""}
                    onChange={handleInputChange}
                    label="Employeur">
                    {!loading ? (
                      employeurOptions.map((option) => (
                        <MenuItem key={option.id} value={option.value}>
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
                <FormControl fullWidth required>
                  <InputLabel>Genre</InputLabel>
                  <Select
                    name="genre"
                    value={formData.genre || ""}
                    onChange={handleInputChange}
                    label="Genre">
                    {!loading ? (
                      genreOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
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
                    value={formData.contrat || ""}
                    onChange={handleInputChange}
                    label="Contrat">
                    {!loading ? (
                      contratOptions.map((option) => (
                        <MenuItem key={option.id} value={option.value}>
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
                  label="Numéro de Matricule"
                  name="num_mat"
                  value={formData.num_mat}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Téléphone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>tranche d'âge</InputLabel>
                  <Select
                    name="age"
                    value={formData.age || ""}
                    onChange={handleInputChange}
                    label="age">
                    {!loading ? (
                      ageOptions.map((option) => (
                        <MenuItem key={option.id} value={option.value}>
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
                <FormControl fullWidth required>
                  <InputLabel>Statut du Contrat</InputLabel>
                  <Select
                    name="statut_contrat"
                    value={formData.statut_contrat || ""}
                    onChange={handleInputChange}
                    label="Statut du Contrat">
                    {!loading ? (
                      statut_contratOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
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
                <FormControl fullWidth required>
                  <InputLabel>Nationalité</InputLabel>
                  <Select
                    name="nationalite"
                    value={formData.nationalite || ""}
                    onChange={handleInputChange}
                    label="Nationalité">
                    {!loading ? (
                      nationaliteOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
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
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Durée du Contrat"
                  name="dure_contrat"
                  value={formData.dure_contrat}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="periode_essai"
                      defaultValue={false}
                      checked={formData.periode_essai}
                      onChange={handleInputChange}
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
            {editMode ? "Modifier" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>

      <Loading isSuccess={isSuccess} />
    </>
  );
};

export default EffectifForm;
