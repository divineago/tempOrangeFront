import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import AdminView from './scenes/User/AdminView';
import Login from './scenes/User/Login';
import SignUpForm from './scenes/User/SignupForm';
import EvaluationForm from './scenes/training/Evaluation';
import TrainingCalendar from './scenes/training/TrainingCalendar';
import RegistrationForm from './scenes/Form/RegistrationForm';
import './index.css'; // Assurez-vous d'importer le fichier de styles

function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated && <Sidebar />}
          <main className="content">
            {isAuthenticated && <Topbar />}
            <div className="main-content">
              <Routes>
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/" element={isAuthenticated ? <TrainingDashboard /> : <Navigate to="/login" />} />
                <Route path="/trainingform" element={isAuthenticated ? <TrainingForm /> : <Navigate to="/login" />} />
                <Route path="/trainingform" element={isAuthenticated ? <FormComponent /> : <Navigate to="/login" />} />
                <Route path="/trainingprogress" element={isAuthenticated ? <TrainingProgress /> : <Navigate to="/login" />} />
                <Route path="/effectiflist" element={isAuthenticated ? <EffectifList /> : <Navigate to="/login" />} />
                <Route path="/traininglist" element={isAuthenticated ? <TrainingList /> : <Navigate to="/login" />} />
                <Route path="/effectifdashboard" element={isAuthenticated ? <EffectifDashboard /> : <Navigate to="/login" />} />
                <Route path="/trainingdashboard" element={isAuthenticated ? <TrainingDashboard /> : <Navigate to="/login" />} />
                <Route path="/register" element={isAuthenticated ? <RegistrationForm /> : <Navigate to="/login" />} />
                <Route path="/notificationicon" element={isAuthenticated ? <NotificationIcon /> : <Navigate to="/login" />} />
                <Route path="/notificationpopup" element={isAuthenticated ? <NotificationPopup /> : <Navigate to="/login" />} />
                <Route path="/evaluation" element={isAuthenticated ? <EvaluationForm /> : <Navigate to="/login" />} />
                <Route path="/calendar" element={isAuthenticated ? <TrainingCalendar /> : <Navigate to="/login" />} />
                <Route path="/admin" element={isAuthenticated ? <AdminView /> : <Navigate to="/login" />} />
              </Routes>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
