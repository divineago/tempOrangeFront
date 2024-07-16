import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const FormComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [training, setTraining] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log({ name, email, training });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        Enregistrement à une formation
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Nom"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Formation"
            variant="outlined"
            value={training}
            onChange={(e) => setTraining(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          S'enregistrer
        </Button>
      </form>
    </Box>
  );
};

export default FormComponent;
