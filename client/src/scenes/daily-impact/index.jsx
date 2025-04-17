import React from "react";
import { Box, Typography } from "@mui/material";
import { Header } from "components";

const DailyImpact = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="DAILY IMPACT"
        subtitle="Daily sustainability metrics and progress"
      />
      <Box mt="40px" height="75vh">
        <Typography variant="h4" color="primary">
          Daily Sustainability Impact
        </Typography>
        {/* Add your daily impact content here */}
      </Box>
    </Box>
  );
};

export default DailyImpact; 