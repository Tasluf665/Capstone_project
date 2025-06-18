import React, { useMemo } from "react";
import { DownloadOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { FlexBetween, Header } from "components";
import StatsRow from "components/Dashboard/StatsRow";
import MonthlyImpactChart from "components/Dashboard/MonthlyImpactChart";
import ImpactDistributionChart from "components/Dashboard/ImpactDistributionChart";
import ProjectsTable from "components/Dashboard/ProjectsTable";
import useAuth from "../../hooks/useAuth";
import useBacklog from "../../hooks/useBacklog";

// Utility to parse dates and calculate time differences
const parseDate = (dateStr) => new Date(dateStr);
const daysDifference = (date1, date2) => Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));

const WeeklyImpact = () => {
  const theme = useTheme();
  const { authenticated, loading: authLoading } = useAuth();
  const { userProjects, loading: backlogLoading } = useBacklog(authenticated);

  // Calculate combined metrics using useMemo
  const metrics = useMemo(() => {
    if (!userProjects) return {};

    // Collect all sustainability backlog items from all projects
    const allTasks = userProjects.flatMap(project =>
      project.sustainabilityBacklog || []
    );

    // Deduplicate tasks by id
    const uniqueTasks = [];
    const seenIds = new Set();
    for (const item of allTasks) {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        uniqueTasks.push(item);
      }
    }

    // Filter uniqueTasks for tasks updated in the current week
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diffToMonday = (dayOfWeek + 6) % 7;
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - diffToMonday);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);
    weekEnd.setHours(0, 0, 0, 0);

    const uniqueTasksThisWeek = uniqueTasks.filter(item => {
      const updatedDate = parseDate(item.fields.updated);
      return updatedDate >= weekStart && updatedDate < weekEnd;
    });

    // Total story points across all projects (for current week)
    const totalStoryPoints = uniqueTasksThisWeek.reduce((total, item) => {
      const storyPoints = item.fields.customfield_10016 || 0;
      return total + storyPoints;
    }, 0);

    // Total unique tasks across all projects (for current week)
    const totalSustainabilityBacklog = uniqueTasksThisWeek.length;

    // Priority distribution across all projects (for current week)
    const priorityCounts = uniqueTasksThisWeek.reduce((acc, item) => {
      const priority = item.fields.priority.name;
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, {});

    // Recently updated tasks (within last 7 days, for current week)
    const currentDate = new Date(Date.now());
    currentDate.setUTCHours(currentDate.getUTCHours() + 3); // Adjust to EEST (UTC+3)
    const recentlyUpdated = uniqueTasksThisWeek.filter((item) => {
      const updatedDate = parseDate(item.fields.updated);
      return daysDifference(currentDate, updatedDate) <= 7;
    }).length;

    // Task updates over time (group by day, for current week)
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      day.setHours(0, 0, 0, 0);
      daysOfWeek.push(day);
    }

    const updatesByDay = daysOfWeek.map((day, idx) => {
      const nextDay = new Date(day);
      nextDay.setDate(day.getDate() + 1);
      const count = uniqueTasksThisWeek.filter(item => {
        const updatedDate = parseDate(item.fields.updated);
        return updatedDate >= day && updatedDate < nextDay;
      }).length;
      return { x: dayLabels[idx], y: count };
    });

    const updateTrendData = updatesByDay;

    // Priority distribution for pie chart (for current week)
    const priorityDistributionData = Object.entries(priorityCounts).map(([priority, count]) => ({
      id: priority,
      label: priority,
      value: count,
      color: priority === "Medium" ? "#f39c12" : priority === "Low" ? "#3498db" : "#e74c3c",
    }));

    return {
      totalStoryPoints,
      totalSustainabilityBacklog,
      recentlyUpdated,
      updateTrendData: [{ id: "Updates", data: updateTrendData }],
      priorityDistributionData,
      uniqueTasks: uniqueTasksThisWeek,
    };
  }, [userProjects]);

  const handleDownload = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"}/api/project/download-all-reports`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to download report');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'project-dashboard-report.json';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      alert('Error downloading report: ' + error.message);
    }
  };

  if (authLoading || backlogLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="SUSTAINABILITY DASHBOARD"
          subtitle="Track Efforts for the Current Week"
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

      <StatsRow
        totalStoryPoints={metrics.totalStoryPoints || 0}
        totalSustainabilityBacklog={metrics.totalSustainabilityBacklog || 0}
        recentlyUpdated={metrics.recentlyUpdated || 0}
      />

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="20px"
      >
        <MonthlyImpactChart data={metrics.updateTrendData || []} />
        <ImpactDistributionChart data={metrics.priorityDistributionData || []} />
      </Box>

      <ProjectsTable
        rows={metrics.uniqueTasks?.map(item => ({
          ...item,
          summary: item.fields.summary,
          priority: item.fields.priority.name,
          storyPoints: item.fields.customfield_10016 || 'Not assigned',
          updated: item.fields.updated,
          labels: item.fields.labels,
        })) || []}
      />
    </Box>
  );
};

export default WeeklyImpact;
