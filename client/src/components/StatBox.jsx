import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const StatBox = ({ title, value, increase, description, icon }) => {
  const theme = useTheme();

  return (
    <Box
      gridColumn="span 3"
      backgroundColor={theme.palette.background.alt}
      p="1.5rem"
      borderRadius="0.55rem"
    >
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: theme.palette.secondary[100] }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: theme.palette.secondary[200] }}>
          {title}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
        >
          {increase}
        </Typography>
      </Box>
      <Typography mt="1rem" fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
        {description}
      </Typography>
    </Box>
  );
};

export default StatBox;
