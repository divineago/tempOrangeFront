import React, { useState } from 'react';
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
import AdminView from './scenes/User/AdminView';
import Login from './scenes/User/Login';
import SignUpForm from './scenes/User/SignupForm';
import Evaluation from './scenes/training/Evaluation';
import TrainingCalendar from './scenes/training/TrainingCalendar';
import TrainingParticipation from './scenes/training/TrainingParticipation';
import './index.css';

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={`app ${isSidebar ? '' : 'collapsed'}`}>
          <Sidebar isSidebar={isSidebar} />
          <main className={`content ${isSidebar ? '' : 'collapsed'}`}>
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/trainingdashboard" element={<TrainingDashboard />} />
              <Route path="/trainingform" element={<TrainingForm />} />
              <Route path="/trainingprogress" element={<TrainingProgress />} />
              <Route path="/effectiflist" element={<EffectifList />} />
              <Route path="/traininglist" element={<TrainingList />} />
              <Route path="/effectifdashboard" element={<EffectifDashboard />} />
              <Route path="/notificationpopup" element={<NotificationPopup />} />
              <Route path="/evaluation" element={<Evaluation />} />
              <Route path="/calendar" element={<TrainingCalendar />} />
              <Route path="/trainingparticipation" element={<TrainingParticipation />} />
              <Route path="/admin" element={<AdminView />} />
            </Routes>
          </main>
          <div className={`footer ${isSidebar ? '' : 'collapsed'}`}>
            &copy; {new Date().getFullYear()} ORDC
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
