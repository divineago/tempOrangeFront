import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './scenes/global/Sidebar';
import Topbar from './scenes/global/Topbar';
import TrainingForm from './scenes/training/TrainingForm';
import TrainingProgress from './scenes/training/TrainingProgress';
import EffectifList from './scenes/effectif/EffectifList';
import DirectionList from './scenes/effectif/DirectionList';
import DirectionForm from './scenes/effectif/DirectionForm';

import ContratList from './scenes/effectif/ContratList';
import ContratForm from './scenes/effectif/ContratForm';

import EmployeurList from './scenes/effectif/EmployeurList';
import EmployeurForm from './scenes/effectif/EmployeurForm';

import TrainingList from './scenes/training/TrainingList';
import TrainingDashboard from './scenes/training/TrainingDashboard';
import EffectifDashboard from './scenes/effectif/EffectifDashboard';
import NotificationPopup from './scenes/Form/NotificationPopup';
import AdminView from './scenes/user/AdminView';
import Login from './scenes/user/Login';
import Evaluation from './scenes/training/Evaluation';
import TrainingCalendar from './scenes/training/TrainingCalendar';
import TrainingParticipation from './scenes/training/TrainingParticipation';
import './index.css';
import AssignSubordinatesForm from './scenes/effectif/AssignSubordinatesForm';

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
                <Route path="/trainingdashboard" element={<TrainingDashboard />} />
                <Route path="/trainingform" element={<TrainingForm />} />
                <Route path="/trainingprogress" element={<TrainingProgress />} />
                <Route path="/directionList" element={<DirectionList/>} />
                <Route path="/directionForm" element={<DirectionForm/>} />

                <Route path="/ContratList" element={<ContratList/>} />
                <Route path="/ContratForm" element={<ContratForm/>} />
                
                <Route path="/EmployeurList" element={<EmployeurList/>} />
                <Route path="/EmployeurForm" element={<EmployeurForm/>} />

                <Route path="/assign-subordinates" element={<AssignSubordinatesForm/>} />

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
