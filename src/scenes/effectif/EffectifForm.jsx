import React from 'react';
import { Box, Button, TextField, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { directions, employeurs, genderOptions, contractOptions, statusOptions, classificationOptions } from '../../data/mockData';

const EffectifForm = ({ formData, handleInputChange, handleFormSubmit, openDialog, handleCloseDialog, editMode }) => {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
      <DialogTitle>{editMode ? 'Modifier Effectif' : 'Ajouter Agent'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="10px" mb="20px">
          <TextField label="Nom" name="nom" value={formData.nom} onChange={handleInputChange} required />
          <TextField label="Prénom" name="prenom" value={formData.prenom} onChange={handleInputChange} required />
          <TextField label="Postnom" name="postnom" value={formData.postnom} onChange={handleInputChange} required />
          <TextField
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
          <TextField
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
          <TextField
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
          <TextField
            label="Date de Naissance"
            name="dateNaissance"
            value={formData.dateNaissance}
            onChange={handleInputChange}
            type="date"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
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
          <TextField label="Matricule" name="mat" value={formData.mat} onChange={handleInputChange} required />
          <TextField
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
          <TextField label="Fonction" name="fonction" value={formData.fonction} onChange={handleInputChange} required />
          <TextField label="Lieu d'embauche" name="hiringplace" value={formData.hiringplace} onChange={handleInputChange} required />
          <TextField
            label="Date d'Embauche"
            name="embauche"
            value={formData.embauche}
            onChange={handleInputChange}
            type="date"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField label="Email" name="email" value={formData.email} onChange={handleInputChange} type="email" required />
          <TextField
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
          <TextField
            label="Date de fin de contrat"
            name="endcontrat"
            value={formData.endcontrat}
            onChange={handleInputChange}
            type="date"
            InputLabelProps={{ shrink: true }}
            required
          />        
          <TextField
            label="Durée du contrat (mois)"
            name="dureecontrat"
            value={formData.dureecontrat}
            onChange={handleInputChange}
            type="number"
            required
          />
          <TextField
            label="Période d'essai (mois)"
            name="essai"
            value={formData.essai}
            onChange={handleInputChange}
            type="number"
            required
          />
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
