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

const CarbonFootprint = () => {
  const theme = useTheme();
  const [view, setView] = useState("daily");

  // Sample data - replace with actual API data
  const mockData = {
    daily: [
      { id: 1, date: "2024-03-01", emissions: 1200, reduction: 200, source: "Electricity" },
      { id: 2, date: "2024-03-02", emissions: 1100, reduction: 300, source: "Transport" },
      { id: 3, date: "2024-03-03", emissions: 1000, reduction: 400, source: "Manufacturing" },
    ],
    monthly: [
      { id: 1, month: "January", emissions: 35000, reduction: 5000, source: "All" },
      { id: 2, month: "February", emissions: 32000, reduction: 8000, source: "All" },
      { id: 3, month: "March", emissions: 30000, reduction: 10000, source: "All" },
    ],
  };

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "emissions",
      headerName: "Emissions (kg CO2)",
      flex: 1,
    },
    {
      field: "reduction",
      headerName: "Reduction (kg CO2)",
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

export default CarbonFootprint; 
