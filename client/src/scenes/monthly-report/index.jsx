import React from "react";
import { Box, Typography } from "@mui/material";
import { Header } from "components";

const MonthlyReport = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="MONTHLY REPORT"
        subtitle="Monthly sustainability performance and trends"
      />
      <Box mt="40px" height="75vh">
        <Typography variant="h4" color="primary">
          Monthly Sustainability Report
        </Typography>
        {/* Add your monthly report content here */}
      </Box>
    </Box>
  );
};

export default MonthlyReport; 