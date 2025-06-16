import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import {
  DashboardIndex,
  Layout,
  CarbonFootprint,
  EnergyEfficiency,
  WaterConservation,
  WasteManagement,
  DailyImpact,
  MonthlyReport,
  SustainabilityBacklogIndex, // Your main component
  KnowledgeSharing,
  Accessibility,
  AuthScreen,
} from "scenes";
import secureLocalStorage from "react-secure-storage";
import { setUser, $user } from "store/user";
import { setStoryPoints } from "store/storyPoints";
import { useStore } from "@nanostores/react";
import ProtectedRoute from "ProtectedRoutes";
import axios from "axios";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const user = useStore($user);

  useEffect(() => {
    const session = secureLocalStorage.getItem("session");
    if (session) {
      setUser(session);
    }
  }, []);

  useEffect(() => {
    if (user.id) {
      const getStoryPoints = async () => {
        await axios
          .get(
            `${process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"
            }/api/backlog/getAllProjects?uid=${user.id}`,
            { withCredentials: true }
          )
          .then((response) => {
            setStoryPoints({
              projects: response.data.projects,
              storyPoints: response.data.totalStoryPoints,
            });
          })
          .catch((error) => {
            console.error("Error fetching story points:", error);
          });
      };
      getStoryPoints();
    }
  }, [user]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardIndex />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/:projectKey"
                element={
                  <ProtectedRoute>
                    <DashboardIndex />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/carbon-footprint"
                element={
                  <ProtectedRoute>
                    <CarbonFootprint />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/energy-efficiency"
                element={
                  <ProtectedRoute>
                    <EnergyEfficiency />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/water-conservation"
                element={
                  <ProtectedRoute>
                    <WaterConservation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/waste-management"
                element={
                  <ProtectedRoute>
                    <WasteManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/daily-impact"
                element={
                  <ProtectedRoute>
                    <DailyImpact />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/monthly-report"
                element={
                  <ProtectedRoute>
                    <MonthlyReport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/knowledge-sharing"
                element={
                  <ProtectedRoute>
                    <KnowledgeSharing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/accessibility"
                element={
                  <ProtectedRoute>
                    <Accessibility />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sustainability-backlog"
                element={
                  <ProtectedRoute>
                    <SustainabilityBacklogIndex />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sustainability-backlog/create-new"
                element={
                  <ProtectedRoute>
                    <SustainabilityBacklogIndex />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sustainability-backlog/:projectKey"
                element={
                  <ProtectedRoute>
                    <SustainabilityBacklogIndex />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/" element={<AuthScreen />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;