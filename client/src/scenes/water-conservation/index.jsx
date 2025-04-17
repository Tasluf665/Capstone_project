import React from "react";
import { Box, Typography } from "@mui/material";
import { Header } from "components";

const WaterConservation = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="WATER CONSERVATION"
        subtitle="Track water usage and conservation efforts"
      />
      <Box mt="40px" height="75vh">
        <Typography variant="h4" color="primary">
          Water Conservation Metrics
        </Typography>
        {/* Add your water conservation content here */}
      </Box>
    </Box>
  );
};

export default WaterConservation; 