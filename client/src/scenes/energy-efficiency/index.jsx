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
    <Box m="1.5rem 2.5rem">
      <Header
        title="ENERGY EFFICIENCY"
        subtitle="Monitor and optimize energy consumption"
      />

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
      >
        {/* View Selector */}
        <Box
          gridColumn="span 12"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <FormControl sx={{ width: "200px" }}>
            <InputLabel>View</InputLabel>
            <Select
              value={view}
              label="View"
              onChange={(e) => setView(e.target.value)}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {/* Add export functionality */}}
          >
            Export Report
          </Button>
        </Box>

        {/* Data Grid */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
          }}
        >
          <DataGrid
            rows={mockData[view]}
            columns={columns}
            components={{
              ColumnMenu: CustomColumnMenu,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default EnergyEfficiency; 