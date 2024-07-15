// EvaluationEfficacite.js
import React, { useState } from 'react';
import { Typography, Button, Container, Paper, Radio, RadioGroup, FormControlLabel } from '@mui/material';

const EvaluationEfficacite = () => {
  const [formData, setFormData] = useState({
    // Initialiser les champs nécessaires
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Évaluation d\'Efficacité:', formData);
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Évaluation d'Efficacité
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6">Rubrique 1: Applicabilité des compétences acquises</Typography>
          <Typography variant="body1">1. J'utilise régulièrement les compétences apprises.</Typography>
          <RadioGroup name="question1" onChange={handleChange}>
            <FormControlLabel value="1" control={<Radio />} label="1 - Pas du tout" />
            <FormControlLabel value="2" control={<Radio />} label="2 - Rarement" />
            <FormControlLabel value="3" control={<Radio />} label="3 - Parfois" />
            <FormControlLabel value="4" control={<Radio />} label="4 - Souvent" />
            <FormControlLabel value="5" control={<Radio />} label="5 - Très souvent" />
          </RadioGroup>
          
          <Typography variant="body1">2. Les compétences apprises ont amélioré ma performance.</Typography>
          <RadioGroup name="question2" onChange={handleChange}>
            <FormControlLabel value="1" control={<Radio />} label="1 - Pas du tout" />
            <FormControlLabel value="2" control={<Radio />} label="2 - Rarement" />
            <FormControlLabel value="3" control={<Radio />} label="3 - Parfois" />
            <FormControlLabel value="4" control={<Radio />} label="4 - Souvent" />
            <FormControlLabel value="5" control={<Radio />} label="5 - Très souvent" />
          </RadioGroup>

          {/* Ajouter plus de questions/rubriques ici */}

          <Typography variant="h6">Signification des cotations</Typography>
          <Typography variant="body2">
            1 - Pas du tout, 2 - Rarement, 3 - Parfois, 4 - Souvent, 5 - Très souvent
          </Typography>

          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Soumettre
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EvaluationEfficacite;
