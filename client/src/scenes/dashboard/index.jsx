import React, { useState, useMemo } from "react";
import {
  DownloadOutlined,
  Nature,
  TrendingUp,
  Assessment,
  LocalFlorist,
  WaterDrop,
  Code,
  ElectricBolt,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  LinearProgress,
  Card,
  CardContent,
  Grid,
  Slider,
  IconButton,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { FlexBetween, Header, StatBox, DataGridCustomToolbar } from "components";

// Hardcoded data for sustainability metrics
const sustainabilityData = {
  carbonReduction: "2.5 tons",
  treesSaved: 150,
  energySaved: "45,000 kWh",
  waterConserved: "120,000 L",
  greenCodeImpact: "85%",
  projects: [
    {
      _id: 1,
      projectName: "Green Code Optimization",
      createdAt: "2024-03-01",
      impactScore: "High",
      status: "Active",
    },
    {
      _id: 2,
      projectName: "Energy-Efficient Algorithms",
      createdAt: "2024-03-15",
      impactScore: "Medium",
      status: "Completed",
    },
    {
      _id: 3,
      projectName: "Sustainable Data Centers",
      createdAt: "2024-04-01",
      impactScore: "High",
      status: "In Progress",
    },
  ],
};

// Chart data
const monthlyImpactData = [
  {
    id: "Carbon Reduction",
    data: [
      { x: "Jan", y: 1.2 },
      { x: "Feb", y: 1.5 },
      { x: "Mar", y: 1.8 },
      { x: "Apr", y: 2.0 },
      { x: "May", y: 2.2 },
      { x: "Jun", y: 2.5 },
    ],
  },
  {
    id: "Energy Saved",
    data: [
      { x: "Jan", y: 30000 },
      { x: "Feb", y: 35000 },
      { x: "Mar", y: 38000 },
      { x: "Apr", y: 40000 },
      { x: "May", y: 42000 },
      { x: "Jun", y: 45000 },
    ],
  },
];

const impactDistributionData = [
  {
    id: "Code Optimization",
    label: "Code Optimization",
    value: 35,
    color: "#2ecc71",
  },
  {
    id: "Energy Efficiency",
    label: "Energy Efficiency",
    value: 25,
    color: "#3498db",
  },
  {
    id: "Resource Usage",
    label: "Resource Usage",
    value: 20,
    color: "#9b59b6",
  },
  {
    id: "Carbon Footprint",
    label: "Carbon Footprint",
    value: 20,
    color: "#e74c3c",
  },
];

const resourceUsageData = [
  {
    category: "CPU Usage",
    before: 85,
    after: 45,
  },
  {
    category: "Memory Usage",
    before: 75,
    after: 40,
  },
  {
    category: "Network Traffic",
    before: 90,
    after: 50,
  },
  {
    category: "Storage Usage",
    before: 80,
    after: 35,
  },
];

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreen = useMediaQuery("(min-width: 1200px)");
  const [treesValue, setTreesValue] = useState(150);
  const [energyValue, setEnergyValue] = useState(45);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "impactScore",
      headerName: "Impact Score",
      flex: 0.5,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: 
              params.value === "High" ? theme.palette.success.main :
              params.value === "Medium" ? theme.palette.warning.main :
              theme.palette.error.main,
            padding: "4px 8px",
            borderRadius: "4px",
            color: "white",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: 
              params.value === "Active" ? theme.palette.success.main :
              params.value === "Completed" ? theme.palette.info.main :
              theme.palette.warning.main,
            padding: "4px 8px",
            borderRadius: "4px",
            color: "white",
          }}
        >
          {params.value}
        </Box>
      ),
    },
  ];

  const handleDownload = () => {
    const report = {
      title: "Sustainability Report",
      date: new Date().toLocaleDateString(),
      metrics: sustainabilityData,
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sustainability-report.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header 
          title="SUSTAINABILITY DASHBOARD" 
          subtitle="Track Your Green Impact" 
        />
        <Button
          onClick={handleDownload}
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary.light,
            },
          }}
        >
          <DownloadOutlined sx={{ mr: "10px" }} />
          Download Report
        </Button>
      </FlexBetween>

      {/* Stats Row */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreen ? undefined : "span 12",
          },
        }}
      >
        <StatBox
          title="Carbon Reduction"
          value={sustainabilityData.carbonReduction}
          increase="+21%"
          description="Since last month"
          icon={
            <Nature
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="Trees Saved"
          value={sustainabilityData.treesSaved}
          increase="+15%"
          description="Equivalent trees saved"
          icon={
            <LocalFlorist
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="Energy Saved"
          value={sustainabilityData.energySaved}
          increase="+25%"
          description="Since last month"
          icon={
            <ElectricBolt
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="Water Conserved"
          value={sustainabilityData.waterConserved}
          increase="+18%"
          description="Since last month"
          icon={
            <WaterDrop
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
      </Box>

      {/* Charts Row */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="20px"
      >
        {/* Monthly Impact Trend */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100], mb: "1rem" }}>
            Monthly Impact Trend
          </Typography>
          <Box height="260px">
            <ResponsiveLine
              data={monthlyImpactData}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: theme.palette.secondary[200],
                    },
                  },
                  legend: {
                    text: {
                      fill: theme.palette.secondary[200],
                      fontSize: 14,
                    },
                  },
                  ticks: {
                    line: {
                      stroke: theme.palette.secondary[200],
                      strokeWidth: 1,
                    },
                    text: {
                      fill: theme.palette.secondary[200],
                    },
                  },
                },
                legends: {
                  text: {
                    fill: theme.palette.secondary[200],
                    fontSize: 14,
                  },
                },
                tooltip: {
                  container: {
                    color: theme.palette.primary.main,
                  },
                },
              }}
              margin={{ top: 20, right: 40, bottom: 100, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
              }}
              curve="catmullRom"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Month",
                legendOffset: 36,
                legendPosition: "middle",
              }}
              axisLeft={{
                orient: "left",
                tickValues: 5,
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Impact Value",
                legendOffset: -60,
                legendPosition: "middle",
              }}
              enableGridX={false}
              enableGridY={false}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 80,
                  itemsSpacing: 40,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 16,
                  itemBackground: "none",
                  itemTextColor: "#fff",
                  itemBorderRadius: 12,
                  itemPadding: 4,
                  effects: [],
                  style: {
                    fontSize: 11,
                    fontWeight: 'bold',
                  },
                },
              ]}
            />
          </Box>
        </Box>

        {/* Impact Distribution */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100], mb: "1rem" }}>
            Impact Distribution
          </Typography>
          <Box height="260px">
            <ResponsivePie
              data={impactDistributionData}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: theme.palette.secondary[200],
                    },
                  },
                  legend: {
                    text: {
                      fill: theme.palette.secondary[200],
                      fontSize: 14,
                    },
                  },
                  ticks: {
                    line: {
                      stroke: theme.palette.secondary[200],
                      strokeWidth: 1,
                    },
                    text: {
                      fill: theme.palette.secondary[200],
                    },
                  },
                },
                legends: {
                  text: {
                    fill: theme.palette.secondary[200],
                    fontSize: 14,
                  },
                },
                tooltip: {
                  container: {
                    color: theme.palette.primary.main,
                  },
                },
              }}
              margin={{ top: 20, right: 40, bottom: 100, left: 40 }}
              innerRadius={0.65}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
              }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor={theme.palette.secondary[200]}
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
              }}
              arcLabel={d => `${d.value}`}
            />
          </Box>
        </Box>

        {/* Resource Usage Comparison */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100], mb: "1rem" }}>
            Resource Usage Comparison
          </Typography>
          <Box height="260px">
            <ResponsiveBar
              data={resourceUsageData}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: theme.palette.secondary[200],
                    },
                  },
                  legend: {
                    text: {
                      fill: theme.palette.secondary[200],
                      fontSize: 14,
                    },
                  },
                  ticks: {
                    line: {
                      stroke: theme.palette.secondary[200],
                      strokeWidth: 1,
                    },
                    text: {
                      fill: theme.palette.secondary[200],
                    },
                  },
                },
                legends: {
                  text: {
                    fill: theme.palette.secondary[200],
                    fontSize: 14,
                  },
                },
                tooltip: {
                  container: {
                    color: theme.palette.primary.main,
                  },
                },
              }}
              margin={{ top: 20, right: 40, bottom: 100, left: 60 }}
              keys={["before", "after"]}
              indexBy="category"
              padding={0.3}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "nivo" }}
              borderColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Resource Type",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Usage Percentage",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 0,
                  translateY: 80,
                  itemsSpacing: 20,
                  itemWidth: 60,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 16,
                  itemBackground: "none",
                  itemTextColor: "#fff",
                  itemBorderRadius: 12,
                  itemPadding: 4,
                  effects: [],
                  style: {
                    fontSize: 11,
                    fontWeight: 'bold',
                  },
                },
              ]}
            />
          </Box>
        </Box>
      </Box>

      {/* Projects Table */}
      <Box
        mt="20px"
        height="400px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
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
            backgroundColor: theme.palette.background.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          rows={sustainabilityData.projects}
          columns={columns}
          getRowId={(row) => row._id}
          components={{
            Toolbar: DataGridCustomToolbar,
          }}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
