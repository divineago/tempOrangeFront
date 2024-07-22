// src/scenes/global/Topbar.js

import React from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import {  tokens } from "../../theme";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2} className="topbar">
      {/* TITLE */}
      <Typography variant="h4" color={colors.grey[100]}>
        HR Dashboard
      </Typography>

      {/* ICONS */}
      <Box display="flex">

        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton component={Link} to="/effectifdashboard">
          <PeopleAltIcon />
        </IconButton>
        <IconButton component={Link} to="/calendar">
          <ListAltIcon />
        </IconButton>
        <IconButton component={Link} to="/trainingdashboard">
          <HomeOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
