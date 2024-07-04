import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, Grid, MenuItem } from '@mui/material';
import Header from '../../components/Header';
import { contractOptions } from '../../data/mockData';

const initialTrainingData = {
  title: '',
  type: '',
  startDate: '',
  endDate: '',
  duration: '',
  evaluationDate: '',
};

const TrainingForm = () => {
  const [trainings, setTrainings] = useState([]);
  const [formData, setFormData] = useState(initialTrainingData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setTrainings([...trainings, formData]);
    setFormData(initialTrainingData);
  };

  return (
    <Box m="20px">
      <Header title="TRAINING FORM" subtitle="Formulaire de formation" />

      <form onSubmit={handleFormSubmit}>
        <Box display="flex" flexDirection="column" gap="10px" mb="20px">
          <TextField label="Title" name="title" value={formData.title} onChange={handleInputChange} variant="outlined" required />
          <TextField
            select
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            variant="outlined"
            required
          >
            <MenuItem value="En ligne">En ligne</MenuItem>
            <MenuItem value="En présentiel">En présentiel</MenuItem>
          </TextField>
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            required
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            required
          />
          <TextField
            label="Duration"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
          <TextField
            label="Evaluation Date"
            name="evaluationDate"
            type="date"
            value={formData.evaluationDate}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Add Training
          </Button>
        </Box>
      </form>

      <Grid container spacing={3}>
        {trainings.map((training, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{training.title}</Typography>
                <Typography>{`Type: ${training.type}`}</Typography>
                <Typography>{`Start Date: ${training.startDate}`}</Typography>
                <Typography>{`End Date: ${training.endDate}`}</Typography>
                <Typography>{`Duration: ${training.duration}`}</Typography>
                <Typography>{`Evaluation Date: ${training.evaluationDate}`}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrainingForm;
