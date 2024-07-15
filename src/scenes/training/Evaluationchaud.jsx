// EvaluationChaud.js
import React, { useState } from 'react';
import { Typography, Button, Container, Paper, Radio, RadioGroup, FormControlLabel } from '@mui/material';

const EvaluationChaud = () => {
  const [formData, setFormData] = useState({
    // Initialiser les champs nécessaires
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Evaluation à chaud:', formData);
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Évaluation à Chaud
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6">Rubrique 1: Pertinence de la formation</Typography>
          <Typography variant="body1">1. Les objectifs de la formation étaient clairs.</Typography>
          <RadioGroup name="question1" onChange={handleChange}>
            <FormControlLabel value="1" control={<Radio />} label="1 - Pas du tout" />
            <FormControlLabel value="2" control={<Radio />} label="2 - Peu" />
            <FormControlLabel value="3" control={<Radio />} label="3 - Moyennement" />
            <FormControlLabel value="4" control={<Radio />} label="4 - Bien" />
            <FormControlLabel value="5" control={<Radio />} label="5 - Très bien" />
          </RadioGroup>
          
          <Typography variant="body1">2. La formation répondait à mes attentes.</Typography>
          <RadioGroup name="question2" onChange={handleChange}>
            <FormControlLabel value="1" control={<Radio />} label="1 - Pas du tout" />
            <FormControlLabel value="2" control={<Radio />} label="2 - Peu" />
            <FormControlLabel value="3" control={<Radio />} label="3 - Moyennement" />
            <FormControlLabel value="4" control={<Radio />} label="4 - Bien" />
            <FormControlLabel value="5" control={<Radio />} label="5 - Très bien" />
          </RadioGroup>

          {/* Ajouter plus de questions/rubriques ici */}

          <Typography variant="h6">Signification des cotations</Typography>
          <Typography variant="body2">
            1 - Pas du tout, 2 - Peu, 3 - Moyennement, 4 - Bien, 5 - Très bien
          </Typography>

          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Soumettre
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EvaluationChaud;
