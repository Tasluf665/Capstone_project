import React from "react";
import { Box, Typography } from "@mui/material";
import { Header } from "components";

const WasteManagement = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="WASTE MANAGEMENT"
        subtitle="Monitor waste reduction and recycling efforts"
      />
      <Box mt="40px" height="75vh">
        <Typography variant="h4" color="primary">
          Waste Management Metrics
        </Typography>
        {/* Add your waste management content here */}
      </Box>
    </Box>
  );
};

export default WasteManagement; 