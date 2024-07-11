// src/scenes/training/Evaluation.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const EvaluationForm = () => {
  const [satisfaction, setSatisfaction] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ satisfaction, comments });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        Formulaire d'évaluation de la formation
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <Typography variant="h6">Niveau de satisfaction</Typography>
          <RadioGroup row value={satisfaction} onChange={(e) => setSatisfaction(e.target.value)}>
            <FormControlLabel value="1" control={<Radio />} label="1" />
            <FormControlLabel value="2" control={<Radio />} label="2" />
            <FormControlLabel value="3" control={<Radio />} label="3" />
            <FormControlLabel value="4" control={<Radio />} label="4" />
            <FormControlLabel value="5" control={<Radio />} label="5" />
          </RadioGroup>
        </Box>
        <Box mb={2}>
          <TextField
            label="Commentaires"
            variant="outlined"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Soumettre
        </Button>
      </form>
    </Box>
  );
};

export default EvaluationForm;
