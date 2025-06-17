import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Header } from "components";

const DailyImpact = () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Typography variant="h4" color={theme.palette.secondary[200]}>
        We are working on it
      </Typography>
    </Box>
  );
};

export default DailyImpact; 