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

const MonthlyReport = () => {
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

    // Filter uniqueTasks for tasks updated in the current month
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const uniqueTasksThisMonth = uniqueTasks.filter(item => {
      const updatedDate = parseDate(item.fields.updated);
      return (
        updatedDate.getMonth() === currentMonth &&
        updatedDate.getFullYear() === currentYear
      );
    });

    // Total story points across all projects (for current month)
    const totalStoryPoints = uniqueTasksThisMonth.reduce((total, item) => {
      const storyPoints = item.fields.customfield_10016 || 0;
      return total + storyPoints;
    }, 0);

    // Total unique tasks across all projects (for current month)
    const totalSustainabilityBacklog = uniqueTasksThisMonth.length;

    // Priority distribution across all projects (for current month)
    const priorityCounts = uniqueTasksThisMonth.reduce((acc, item) => {
      const priority = item.fields.priority.name;
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, {});

    // Recently updated tasks (within last 7 days, for current month)
    const currentDate = new Date(Date.now());
    currentDate.setUTCHours(currentDate.getUTCHours() + 3); // Adjust to EEST (UTC+3)
    const recentlyUpdated = uniqueTasksThisMonth.filter((item) => {
      const updatedDate = parseDate(item.fields.updated);
      return daysDifference(currentDate, updatedDate) <= 7;
    }).length;

    // Task updates over time (group by week, for current month)
    function getISOWeekAndYear(date) {
      const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      const weekNum = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
      return { week: weekNum, year: d.getUTCFullYear() };
    }

    const updatesByWeek = uniqueTasksThisMonth.reduce((acc, item) => {
      const updatedDate = parseDate(item.fields.updated);
      const { week, year } = getISOWeekAndYear(updatedDate);
      const weekLabel = `W${week} ${year}`;
      acc[weekLabel] = (acc[weekLabel] || 0) + 1;
      return acc;
    }, {});

    const updateTrendData = Object.entries(updatesByWeek)
      .map(([week, count]) => ({ x: week, y: count }))
      .sort((a, b) => {
        const [aW, aY] = a.x.split(' ');
        const [bW, bY] = b.x.split(' ');
        return aY === bY ? parseInt(aW.slice(1)) - parseInt(bW.slice(1)) : parseInt(aY) - parseInt(bY);
      });

    // Priority distribution for pie chart (for current month)
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
      uniqueTasks: uniqueTasksThisMonth,
    };
  }, [userProjects]);

  const handleDownload = () => {
    const report = {
      title: "Sustainability Report",
      date: new Date().toLocaleDateString(),
      metrics: {
        totalStoryPoints: metrics.totalStoryPoints,
        totalSustainabilityBacklog: metrics.totalSustainabilityBacklog,
        recentlyUpdated: metrics.recentlyUpdated,
        priorityDistribution: metrics.priorityDistributionData,
      },
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
          subtitle="Track Efforts for the Current Month"
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

export default MonthlyReport;
