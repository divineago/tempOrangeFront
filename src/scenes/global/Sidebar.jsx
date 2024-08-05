import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, Modal } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import Login from '../User/Login';

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      className="menu-item-hover"
      onClick={() => setSelected(title)}
      icon={icon}
      style={{ color: '#fff', background: 'none' }}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Home');
  const [openLogin, setOpenLogin] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return (
    <Box className="app">
      <Box className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            <MenuItem
              onClick={toggleSidebar}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: '10px 0 20px 0',
                color: '#007BFF',
                background: 'none',
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color="#fff">
                    HR Dashboard
                  </Typography>
                  <IconButton onClick={toggleSidebar} style={{ color: '#fff' }}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px" textAlign="center">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`../../assets/Ordc.png`}
                    style={{ cursor: 'pointer', borderRadius: '50%' }}
                  />
                </Box>
                <Typography
                  variant="h2"
                  color="#fff"
                  fontWeight="bold"
                  sx={{ m: '10px 0 0 0' }}
                >
                  {/* Add user's name here */}
                </Typography>
                <Typography variant="h5" color="#28A745">
                  {/* Add user's role or additional info here */}
                </Typography>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? '10px' : '10%'}>
              <Typography
                variant="h6"
                color="#6C757D"
                sx={{ m: '15px 0 5px 20px' }}
              >
                Formation
              </Typography>
              <Item
                title="Dashboard Formation"
                to="/trainingdashboard"
                icon={<AssessmentIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Training List"
                to="/traininglist"
                icon={<ListAltIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Participation"
                to="/trainingparticipation"
                icon={<AssignmentIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Evaluation"
                to="/evaluation"
                icon={<AssignmentTurnedInOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Typography
                variant="h6"
                color="#6C757D"
                sx={{ m: '15px 0 5px 20px' }}
              >
                Effectif
              </Typography>
              <Item
                title="Effectif List"
                to="/effectiflist"
                icon={<PeopleAltIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Dashboard Effectif"
                to="/effectifdashboard"
                icon={<AssessmentIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Planning"
                to="/calendar"
                icon={<CalendarTodayOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </ProSidebar>
      </Box>

      <Box className={`topbar ${isCollapsed ? 'collapsed' : ''}`}>
        <Typography variant="h6">
       
        </Typography>
      </Box>

      <Box className={`content ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Your main content goes here */}
      </Box>

      <Box className={`footer ${isCollapsed ? 'collapsed' : ''}`}>
        <Typography variant="caption">
          &copy; 2024 ORDC
        </Typography>
      </Box>

      <Modal
        open={openLogin}
        onClose={handleCloseLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Login />
      </Modal>
    </Box>
  );
};

export default Sidebar;
