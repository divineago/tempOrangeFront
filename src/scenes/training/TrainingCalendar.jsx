import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Button, Modal, TextField, Typography } from '@mui/material'; 

// Configurer moment en français
import 'moment/locale/fr';
moment.locale('fr');

const localizer = momentLocalizer(moment);

const messages = {
  allDay: 'Toute la journée',
  previous: 'Précédent',
  next: 'Suivant',
  today: "Aujourd'hui",
  month: 'Mois',
  week: 'Semaine',
  day: 'Jour',
  agenda: 'Agenda',
  date: 'Date',
  time: 'Heure',
  event: 'Événement',
  showMore: total => `+ ${total} plus`,
};

const TrainingCalendar = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSelect = ({ start, end }) => {
    setStart(start);
    setEnd(end);
    setOpen(true);
  };

  const handleSubmit = () => {
    setEvents([...events, { title, start, end }]);
    setOpen(false);
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Calendrier des formations
      </Typography>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSelect}
        style={{ height: 500 }}
        messages={messages} // Ajouter les messages en français
      />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box p={4} bgcolor="white" margin="auto" borderRadius={4}>
          <Typography variant="h6" gutterBottom>
            Ajouter une formation
          </Typography>
          <TextField
            label="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
            Ajouter
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default TrainingCalendar;
