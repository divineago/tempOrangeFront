import React, { useState } from 'react';
import { Typography, Button, Container, Paper, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material';
import Header from '../../components/Header';

const EvaluationEfficacite = ({ onSave }) => {
  const [formData, setFormData] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    commentaires: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, type: 'Efficacité' });
    setFormData({
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: '',
      commentaires: '',
    });
  };

  return (
    <Container>
      <Header title="Évaluation d'Efficacité" />
      <Paper elevation={3} sx={{ padding: 2 }}>
        <form onSubmit={handleSubmit}>
          <Typography variant="h6">Impact de la formation</Typography>
          <Typography variant="body1">1. Avez-vous constaté un changement dans la manière de travailler de votre collaborateur(trice) ?</Typography>
          <RadioGroup name="question1" value={formData.question1} onChange={handleChange}>
            <FormControlLabel value="1" control={<Radio />} label="Pas du tout" />
            <FormControlLabel value="2" control={<Radio />} label="Rarement" />
            <FormControlLabel value="3" control={<Radio />} label="Parfois" />
            <FormControlLabel value="4" control={<Radio />} label="Souvent" />
            <FormControlLabel value="5" control={<Radio />} label="Très souvent" />
          </RadioGroup>
          <Typography variant="body1">2. Cette formation a-t-elle eu un effet immédiat dans la gestion quotidienne de votre collaborateur(trice) ?</Typography>
          <RadioGroup name="question2" value={formData.question2} onChange={handleChange}>
            <FormControlLabel value="1" control={<Radio />} label="Pas du tout" />
            <FormControlLabel value="2" control={<Radio />} label="Rarement" />
            <FormControlLabel value="3" control={<Radio />} label="Parfois" />
            <FormControlLabel value="4" control={<Radio />} label="Souvent" />
            <FormControlLabel value="5" control={<Radio />} label="Très souvent" />
          </RadioGroup>
          <Typography variant="body1">3. Les compétences acquises sont-elles mises en application ?</Typography>
          <RadioGroup name="question3" value={formData.question3} onChange={handleChange}>
            <FormControlLabel value="1" control={<Radio />} label="Pas du tout" />
            <FormControlLabel value="2" control={<Radio />} label="Rarement" />
            <FormControlLabel value="3" control={<Radio />} label="Parfois" />
            <FormControlLabel value="4" control={<Radio />} label="Souvent" />
            <FormControlLabel value="5" control={<Radio />} label="Très souvent" />
          </RadioGroup>
          <Typography variant="body1">4. Avez-vous constaté une amélioration dans la qualité du travail de votre collaborateur(trice) ?</Typography>
          <RadioGroup name="question4" value={formData.question4} onChange={handleChange}>
            <FormControlLabel value="1" control={<Radio />} label="Pas du tout" />
            <FormControlLabel value="2" control={<Radio />} label="Rarement" />
            <FormControlLabel value="3" control={<Radio />} label="Parfois" />
            <FormControlLabel value="4" control={<Radio />} label="Souvent" />
            <FormControlLabel value="5" control={<Radio />} label="Très souvent" />
          </RadioGroup>
          <Typography variant="body1">5. Recommanderiez-vous cette formation à d'autres collaborateurs ?</Typography>
          <RadioGroup name="question5" value={formData.question5} onChange={handleChange}>
            <FormControlLabel value="1" control={<Radio />} label="Pas du tout" />
            <FormControlLabel value="2" control={<Radio />} label="Rarement" />
            <FormControlLabel value="3" control={<Radio />} label="Parfois" />
            <FormControlLabel value="4" control={<Radio />} label="Souvent" />
            <FormControlLabel value="5" control={<Radio />} label="Très souvent" />
          </RadioGroup>
          <Typography variant="h6">Commentaires</Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            name="commentaires"
            value={formData.commentaires}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Soumettre
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EvaluationEfficacite;
