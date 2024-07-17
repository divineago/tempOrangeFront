// src/scenes/training/TrainingForm.jsx
import React from 'react';
import { Box, TextField, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { directions } from '../../data/mockData';

const TrainingForm = ({ formData, handleInputChange, handleTypeChange, handleFormSubmit, openDialog, handleCloseDialog, editMode }) => {
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
      <DialogTitle>{editMode ? 'Modifier Formation' : 'Ajouter Formation'}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap="10px" mb="20px">
          <TextField label="Title" name="title" value={formData.title} onChange={handleInputChange} variant="outlined" required />
          <TextField
            select
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleTypeChange}
            variant="outlined"
            required
          >
            <MenuItem value="En ligne">En ligne </MenuItem>
            <MenuItem value="En présentiel">En présentiel</MenuItem>
          </TextField>
          <TextField label="Start Date" name="startDate" type="date" value={formData.startDate} onChange={handleInputChange} variant="outlined" required InputLabelProps={{ shrink: true }} />
          <TextField label="End Date" name="endDate" type="date" value={formData.endDate} onChange={handleInputChange} variant="outlined" required InputLabelProps={{ shrink: true }} />
          <TextField label="Evaluation Date" name="evaluationDate" type="date" value={formData.evaluationDate} onChange={handleInputChange} variant="outlined" required InputLabelProps={{ shrink: true }} />
          <TextField
            select
            label="Direction"
            name="direction"
            value={formData.direction}
            onChange={handleInputChange}
            variant="outlined"
            required
          >
            {directions.map((dir) => (
              <MenuItem key={dir.value} value={dir.value}>
                {dir.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color="primary">
          {editMode ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TrainingForm;
