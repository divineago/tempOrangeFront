import React, { useState } from 'react';
import { Container, Button, Menu, MenuItem, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EvaluationEfficacite from './EvaluationEfficacite';
import Evaluationchaud from './Evaluationchaud';
import Header from '../../components/Header';

const evaluationData = [];

const Evaluation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [data, setData] = useState(evaluationData);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenForm = (type) => {
    setSelectedForm(type);
    setOpen(true);
    handleCloseMenu();
  };

  const handleCloseForm = () => {
    setOpen(false);
    setSelectedForm(null);
  };

  const handleSave = (newEvaluation) => {
    setData((prevData) => [...prevData, { ...newEvaluation, id: prevData.length + 1 }]);
    handleCloseForm();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'question1', headerName: 'Question 1', width: 150 },
    { field: 'question2', headerName: 'Question 2', width: 150 },
    { field: 'question3', headerName: 'Question 3', width: 150 },
    { field: 'question4', headerName: 'Question 4', width: 150 },
    { field: 'question5', headerName: 'Question 5', width: 150 },
    { field: 'question6', headerName: 'Question 6', width: 150, hide: selectedForm !== 'à Chaud' },
    { field: 'question7', headerName: 'Question 7', width: 150, hide: selectedForm !== 'à Chaud' },
    { field: 'question8', headerName: 'Question 8', width: 150, hide: selectedForm !== 'à Chaud' },
    { field: 'question9', headerName: 'Question 9', width: 150, hide: selectedForm !== 'à Chaud' },
    { field: 'question10', headerName: 'Question 10', width: 150, hide: selectedForm !== 'à Chaud' },
    { field: 'question11', headerName: 'Question 11', width: 150, hide: selectedForm !== 'à Chaud' },
    { field: 'question12', headerName: 'Question 12', width: 150, hide: selectedForm !== 'à Chaud' },
    { field: 'question13', headerName: 'Question 13', width: 150, hide: selectedForm !== 'à Chaud' },
    { field: 'commentaires', headerName: 'Commentaires', width: 300 },
  ];

  return (
    <Container>
      <Header title="Évaluation des Formations" />
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h4" gutterBottom>
          Évaluation des Formations
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Sélectionner le type d'évaluation
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          <MenuItem onClick={() => handleOpenForm('Efficacité')}>Évaluation d'Efficacité</MenuItem>
          <MenuItem onClick={() => handleOpenForm('à Chaud')}>Évaluation à Chaud</MenuItem>
        </Menu>
      </Paper>

      <Dialog open={open} onClose={handleCloseForm} fullWidth maxWidth="md">
        <DialogTitle>{selectedForm === 'Efficacité' ? "Évaluation d'Efficacité" : "Évaluation à Chaud"}</DialogTitle>
        <DialogContent>
          {selectedForm === 'Efficacité' && <EvaluationEfficacite onSave={handleSave} />}
          {selectedForm === 'à Chaud' && <Evaluationchaud onSave={handleSave} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm} color="secondary">
            Annuler
          </Button>
        </DialogActions>
      </Dialog>

      <Paper elevation={3} sx={{ height: 400, marginTop: 2 }}>
        <DataGrid rows={data} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
      </Paper>
    </Container>
  );
};

export default Evaluation;
