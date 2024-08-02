import React from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { tokens } from "../../theme";

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
      <Box display="flex" alignItems="center">
    
        <IconButton component={Link} to="/calendar">
          <CalendarTodayOutlinedIcon />
          <Typography variant="body2" color={colors.grey[100]} sx={{ ml: 1 }}>
           {/*  calendar*/}
          </Typography>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
