import React, { useState } from 'react';
import { Box, Typography, Container, Paper, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import EvaluationChaud from './Evaluationchaud';
import EvaluationEfficacite from './EvaluationEfficacite';

const Evaluation = () => {
  const [evaluationType, setEvaluationType] = useState('');

  const handleEvaluationTypeChange = (e) => {
    setEvaluationType(e.target.value);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={6} sx={{ padding: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Choisissez le type d'évaluation
          </Typography>
          <RadioGroup
            row
            value={evaluationType}
            onChange={handleEvaluationTypeChange}
            sx={{ mt: 2 }}
          >
            <FormControlLabel value="chaud" control={<Radio />} label="Évaluation à chaud" />
            <FormControlLabel value="efficacite" control={<Radio />} label="Évaluation de l'efficacité" />
          </RadioGroup>

          {evaluationType === 'chaud' && <EvaluationChaud />}
          {evaluationType === 'efficacite' && <EvaluationEfficacite />}
        </Box>
      </Paper>
    </Container>
  );
};

export default Evaluation;
