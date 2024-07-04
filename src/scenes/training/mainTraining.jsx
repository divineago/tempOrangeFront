import React from "react";
import { Box, Typography } from "@mui/material";

const MainTraining = ({ data }) => {
  // Vérifie si data.items est défini avant d'utiliser join
  const itemsString = data.items ? data.items.join(', ') : '';

  return (
    <Box>
      <Typography variant="h2">Main Training</Typography>
      <Box mt={2}>
        <Typography variant="body1">
          Training Details:
        </Typography>
        <ul>
          {data.items && data.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </Box>
      <Box mt={2}>
        <Typography variant="body1">
          Items String: {itemsString}
        </Typography>
      </Box>
    </Box>
  );
};

export default MainTraining;
