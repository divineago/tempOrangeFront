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
import NotificationPopup from './scenes/Form/NotificationPopup';
import AdminView from './scenes/user/AdminView';
import Login from './scenes/user/Login';
import Evaluation from './scenes/training/Evaluation';
import TrainingCalendar from './scenes/training/TrainingCalendar';
import MyComponent from './components/MyComponent'; 
import './index.css'; // Assurez-vous d'importer le fichier de styles

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {<Sidebar />}
          <Sidebar />
          <main className="content">
            <Topbar />
            <div className="main-content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/trainingdashboard" element={<TrainingDashboard />} />
                <Route path="/trainingform" element={<TrainingForm />} />
                <Route path="/trainingprogress" element={<TrainingProgress />} />
                <Route path="/effectiflist" element={<EffectifList />} />
                <Route path="/traininglist" element={<TrainingList />} />
                <Route path="/effectifdashboard" element={<EffectifDashboard />} />
                <Route path="/notificationpopup" element={<NotificationPopup />} />
                <Route path="/evaluation" element={<Evaluation />} />
                <Route path="/calendar" element={<TrainingCalendar />} />
                <Route path="/admin" element={<AdminView />} />
              </Routes>
            </div>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
