import React, { useState } from 'react';
import { Typography, Button, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material';

const Evaluationchaud = ({ onSave }) => {
  const [formData, setFormData] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: '',
    question7: '',
    question8: '',
    question9: '',
    question10: '',
    question11: '',
    question12: '',
    question13: '',
    commentaires: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, type: 'à Chaud' });
    setFormData({
      question1: '',
      question2: '',
      question3: '',
      question4: '',
      question5: '',
      question6: '',
      question7: '',
      question8: '',
      question9: '',
      question10: '',
      question11: '',
      question12: '',
      question13: '',
      commentaires: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="body1">1. Le contenu de la formation était-il clair et compréhensible ?</Typography>
      <RadioGroup name="question1" value={formData.question1} onChange={handleChange}>
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
      <Typography variant="body1">2. Les supports pédagogiques étaient-ils utiles et pertinents ?</Typography>
      <RadioGroup name="question2" value={formData.question2} onChange={handleChange}>
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
      <Typography variant="body1">3. La durée de la formation était-elle adaptée ?</Typography>
      <RadioGroup name="question3" value={formData.question3} onChange={handleChange}>
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
      <Typography variant="body1">4. L'animateur a-t-il bien maîtrisé le sujet ?</Typography>
      <RadioGroup name="question4" value={formData.question4} onChange={handleChange}>
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
      <Typography variant="body1">5. L'animateur a-t-il répondu à vos questions ?</Typography>
      <RadioGroup name="question5" value={formData.question5} onChange={handleChange}>
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
      <Typography variant="body1">6. Comment évalueriez-vous globalement cette formation ?</Typography>
      <RadioGroup name="question6" value={formData.question6} onChange={handleChange}>
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
      <Typography variant="body1">7. Quels sont les points forts de la formation ?</Typography>
      <TextField
        name="question7"
        value={formData.question7}
        onChange={handleChange}
        fullWidth
        multiline
        margin="normal"
      />
      <Typography variant="body1">8. Quels sont les points à améliorer ?</Typography>
      <TextField
        name="question8"
        value={formData.question8}
        onChange={handleChange}
        fullWidth
        multiline
        margin="normal"
      />
      <Typography variant="body1">9. Recommanderiez-vous cette formation à vos collègues ?</Typography>
      <RadioGroup name="question9" value={formData.question9} onChange={handleChange}>
        <FormControlLabel value="oui" control={<Radio />} label="Oui" />
        <FormControlLabel value="non" control={<Radio />} label="Non" />
      </RadioGroup>
      <Typography variant="body1">10. Comment évalueriez-vous globalement cette formation ?</Typography>
      <RadioGroup name="question10" value={formData.question10} onChange={handleChange}>
        <FormControlLabel value="1" control={<Radio />} label="1" />
        <FormControlLabel value="2" control={<Radio />} label="2" />
        <FormControlLabel value="3" control={<Radio />} label="3" />
        <FormControlLabel value="4" control={<Radio />} label="4" />
        <FormControlLabel value="5" control={<Radio />} label="5" />
      </RadioGroup>
    
      <Typography variant="body1">Commentaires</Typography>
      <TextField
        name="commentaires"
        value={formData.commentaires}
        onChange={handleChange}
        fullWidth
        multiline
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        Enregistrer
      </Button>
    </form>
  );
};

export default Evaluationchaud;
