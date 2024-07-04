// src/scenes/training/Evaluation.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Rating } from '@mui/material';
import Header from '../../components/Header';
import { trainingData } from '../../data/mockData'; // Import mock training data

const Evaluation = () => {
  const { id } = useParams();
  const training = trainingData.find((t) => t.id === id);
  const [satisfaction, setSatisfaction] = useState(0);
  const [feedback, setFeedback] = useState('');

  if (!training) {
    return <Typography variant="h5">Formation non trouvée</Typography>;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle evaluation submission
  };

  return (
    <Box m="20px">
      <Header title={`Évaluation de ${training.title}`} subtitle="Donnez votre avis sur la formation" />
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap="20px" maxWidth="400px" mx="auto">
          <Typography variant="h6">Cote de satisfaction</Typography>
          <Rating
            name="satisfaction"
            value={satisfaction}
            onChange={(event, newValue) => setSatisfaction(newValue)}
          />
          <TextField
            label="Feedback"
            name="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">Soumettre</Button>
        </Box>
      </form>
    </Box>
  );
};

export default Evaluation;
