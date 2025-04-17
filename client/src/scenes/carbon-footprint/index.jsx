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
    <Box m="1.5rem 2.5rem">
      <Header
        title="CARBON FOOTPRINT"
        subtitle="Track and analyze your carbon emissions"
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

export default CarbonFootprint; 