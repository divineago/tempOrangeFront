// src/scenes/global/Topbar.js

import React from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2} className="topbar">
      {/* TITLE */}
      <Typography variant="h4" color={colors.grey[100]}>
        HR Dashboard
      </Typography>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
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
