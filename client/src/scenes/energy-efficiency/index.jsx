import React, { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CustomColumnMenu } from "components";
import { Header } from "components";

const EnergyEfficiency = () => {
  const theme = useTheme();
  const [view, setView] = useState("daily");

  // Sample data - replace with actual API data
  const mockData = {
    daily: [
      { id: 1, date: "2024-03-01", consumption: 1200, savings: 200, source: "Electricity" },
      { id: 2, date: "2024-03-02", consumption: 1100, savings: 300, source: "HVAC" },
      { id: 3, date: "2024-03-03", consumption: 1000, savings: 400, source: "Lighting" },
    ],
    monthly: [
      { id: 1, month: "January", consumption: 35000, savings: 5000, source: "All" },
      { id: 2, month: "February", consumption: 32000, savings: 8000, source: "All" },
      { id: 3, month: "March", consumption: 30000, savings: 10000, source: "All" },
    ],
  };

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "consumption",
      headerName: "Energy Consumption (kWh)",
      flex: 1,
    },
    {
      field: "savings",
      headerName: "Energy Savings (kWh)",
      flex: 1,
    },
    {
      field: "source",
      headerName: "Source",
      flex: 1,
    },
  ];

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

export default EnergyEfficiency; 