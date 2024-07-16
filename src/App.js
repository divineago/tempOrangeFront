// src/App.js
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './scenes/global/Sidebar';
import Topbar from './scenes/global/Topbar';
import TrainingForm from './scenes/training/TrainingForm';
import TrainingProgress from './scenes/training/TrainingProgress';
import EffectifList from './scenes/effectif/EffectifList';
import TrainingList from './scenes/training/TrainingList';
import TrainingDashboard from './scenes/training/TrainingDashboard';
import EffectifDashboard from './scenes/effectif/EffectifDashboard';
import FormComponent from './scenes/Form/FormComponent';
import NotificationIcon from './scenes/Form/NotificationIcon';
import NotificationPopup from './scenes/Form/NotificationPopup';
import EvaluationForm from './scenes/training/Evaluation';
import RegistrationForm from './scenes/Form/RegistrationForm';
import MyComponent from './components/MyComponent'; 
import './index.css'; // Assurez-vous d'importer le fichier de styles

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <div className="main-content">
              <Routes>
              <Route path="/trainingform" element={<TrainingForm />} />
              <Route path="/trainingform" element={<FormComponent />} />
              <Route path="/trainingprogress" element={<TrainingProgress />} />
              <Route path="/effectiflist" element={<EffectifList />} />
              <Route path="/traininglist" element={<TrainingList />} />
              <Route path="/effectifdashboard" element={<EffectifDashboard />} />
              <Route path="/trainingdashboard" element={<TrainingDashboard />} />
              <Route path="/mycomponent" element={<MyComponent />} /> {/* Route pour MyComponent */}
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/notificationicon" element={<NotificationIcon />} />
              <Route path="/notificationpopup" element={<NotificationPopup />} />
              <Route path="/evaluation" element={<EvaluationForm />} />
              </Routes>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
