import React from 'react';
import { Box, Button, TextField, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { directions, employeurs, genderOptions, contractOptions, statusOptions, classificationOptions } from '../../data/mockData';

const EffectifForm = ({ formData, handleInputChange, handleFormSubmit, openDialog, handleCloseDialog, editMode }) => {
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
                name="nom"
                value={formData.nom}
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
                name="directionId"
                value={formData.directionId}
                onChange={handleInputChange}
                select
                required
              >
                {directions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Employeur"
                name="employeurId"
                value={formData.employeurId}
                onChange={handleInputChange}
                select
                required
              >
                {employeurs.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Genre"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                select
                required
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date de Naissance"
                name="dateNaissance"
                value={formData.dateNaissance}
                onChange={handleInputChange}
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
                value={formData.contrat}
                onChange={handleInputChange}
                select
                required
              >
                {contractOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Matricule"
                name="mat"
                value={formData.mat}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Classification"
                name="classification"
                value={formData.classification}
                onChange={handleInputChange}
                select
                required
              >
                {classificationOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
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
                label="Lieu d'embauche"
                name="hiringplace"
                value={formData.hiringplace}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date d'Embauche"
                name="embauche"
                value={formData.embauche}
                onChange={handleInputChange}
                type="date"
                InputLabelProps={{ shrink: true }}
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
                label="Statut"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                select
                required
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date de fin de contrat"
                name="endcontrat"
                value={formData.endcontrat}
                onChange={handleInputChange}
                type="date"
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Durée du contrat (mois)"
                name="dureecontrat"
                value={formData.dureecontrat}
                onChange={handleInputChange}
                type="number"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Période d'essai (mois)"
                name="essai"
                value={formData.essai}
                onChange={handleInputChange}
                type="number"
                required
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Annuler
        </Button>
        <Button onClick={handleFormSubmit} color="primary">
          {editMode ? 'Mettre à jour' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EffectifForm;
