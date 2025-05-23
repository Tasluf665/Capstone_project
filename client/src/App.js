import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import {
  Dashboard,
  Layout,
  CarbonFootprint,
  EnergyEfficiency,
  WaterConservation,
  WasteManagement,
  DailyImpact,
  MonthlyReport,
  SustainabilityBacklogIndex, // Import the index as the main component
  KnowledgeSharing,
  Accessibility,
} from "scenes";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/carbon-footprint" element={<CarbonFootprint />} />
              <Route path="/energy-efficiency" element={<EnergyEfficiency />} />
              <Route path="/water-conservation" element={<WaterConservation />} />
              <Route path="/waste-management" element={<WasteManagement />} />
              <Route path="/daily-impact" element={<DailyImpact />} />
              <Route path="/monthly-report" element={<MonthlyReport />} />
              <Route path="/knowledge-sharing" element={<KnowledgeSharing />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="/sustainability-backlog" element={<SustainabilityBacklogIndex />} />
              <Route path="/sustainability-backlog/create-new" element={<SustainabilityBacklogIndex />} />
              <Route path="/sustainability-backlog/:projectKey" element={<SustainabilityBacklogIndex />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;