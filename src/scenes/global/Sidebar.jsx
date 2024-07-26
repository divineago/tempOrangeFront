import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, Modal } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
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
    <Box className="sidebar">
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

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Typography
              variant="h6"
              color="#6C757D"
              sx={{ m: '15px 0 5px 20px' }}
            >
              {/* Optional section title */}
            </Typography>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
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
              icon={<ListAltIcon />}
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
              icon={<ListAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Evaluation"
              to="/evaluation"
              icon={<PersonOutlinedIcon />}
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
              icon={<PeopleAltIcon />}
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
            <MenuItem onClick={handleOpenLogin} icon={<PersonOutlinedIcon />}>
              <Typography>Login</Typography>
            </MenuItem>
          </Box>
        </Menu>
      </ProSidebar>
      <Box className="footer">&copy; {new Date().getFullYear()} ORDC</Box>

      <Modal
        open={openLogin}
        onClose={handleCloseLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Login />
        </Box>
      </Modal>
    </Box>
  );
};

export default Sidebar;
