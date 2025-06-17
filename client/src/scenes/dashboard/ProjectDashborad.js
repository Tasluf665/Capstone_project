import React, { useMemo } from "react";
import { DownloadOutlined } from "@mui/icons-material";
import {
    Box,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { FlexBetween, Header } from "components";
import StatsRow from "components/Dashboard/StatsRow";
import MonthlyImpactChart from "components/Dashboard/MonthlyImpactChart";
import ImpactDistributionChart from "components/Dashboard/ImpactDistributionChart";
import ResourceUsageChart from "components/Dashboard/ResourceUsageChart";
import ProjectsTable from "components/Dashboard/ProjectsTable";
import useAuth from "../../hooks/useAuth";
import useBacklog from "../../hooks/useBacklog";

// Utility to parse dates and calculate time differences
const parseDate = (dateStr) => new Date(dateStr);
const daysDifference = (date1, date2) => Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));

const ProjectDashboard = ({ projectKey }) => {
    const theme = useTheme();
    const isNonMediumScreen = useMediaQuery("(min-width: 1200px)");

    const { authenticated, loading } = useAuth();
    const { loading: backlogLoading, selectedProject } = useBacklog(authenticated, projectKey);

    // Calculate metrics using useMemo
    const metrics = useMemo(() => {
        if (!selectedProject?.sustainabilityBacklog) return {};

        // Deduplicate tasks by id
        const uniqueTasks = [];
        const seenIds = new Set();
        for (const item of selectedProject.sustainabilityBacklog) {
            if (!seenIds.has(item.id)) {
                seenIds.add(item.id);
                uniqueTasks.push(item);
            }
        }

        // Total story points
        const totalStoryPoints = uniqueTasks.reduce((total, item) => {
            const storyPoints = item.fields.customfield_10016 || 0;
            return total + storyPoints;
        }, 0);

        // Total unique tasks
        const totalSustainabilityBacklog = uniqueTasks.length;

        // Priority distribution
        const priorityCounts = uniqueTasks.reduce((acc, item) => {
            const priority = item.fields.priority.name;
            acc[priority] = (acc[priority] || 0) + 1;
            return acc;
        }, {});


        // Use Date.now() for current date and time (adjusted to EEST)
        const currentDate = new Date(Date.now());
        currentDate.setUTCHours(currentDate.getUTCHours() + 3); // Adjust to EEST (UTC+3)
        const recentlyUpdated = uniqueTasks.filter((item) => {
            const updatedDate = parseDate(item.fields.updated);
            return daysDifference(currentDate, updatedDate) <= 7;
        }).length;

        // Average story points per task
        const avgStoryPoints = totalSustainabilityBacklog > 0 ? (totalStoryPoints / totalSustainabilityBacklog).toFixed(1) : 0;

        // Task updates over time (group by month)
        const updatesByMonth = uniqueTasks.reduce((acc, item) => {
            const updatedDate = parseDate(item.fields.updated);
            const month = updatedDate.toLocaleString('default', { month: 'short', year: 'numeric' });
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {});

        const updateTrendData = Object.entries(updatesByMonth)
            .map(([month, count]) => ({ x: month, y: count }))
            .sort((a, b) => parseDate(a.x) - parseDate(b.x));

        // Priority distribution for pie chart
        const priorityDistributionData = Object.entries(priorityCounts).map(([priority, count]) => ({
            id: priority,
            label: priority,
            value: count,
            color: priority === "Medium" ? "#f39c12" : priority === "Low" ? "#3498db" : "#e74c3c",
        }));

        // Story points per task for bar chart
        const storyPointsData = uniqueTasks.map((item) => ({
            task: item.key,
            storyPoints: item.fields.customfield_10016 || 0,
        }));

        return {
            totalStoryPoints,
            totalSustainabilityBacklog,
            recentlyUpdated,
            avgStoryPoints,
            updateTrendData: [{ id: "Updates", data: updateTrendData }],
            priorityDistributionData,
            storyPointsData,
            uniqueTasks,
        };
    }, [selectedProject]);

    const handleDownload = () => {
        const report = {
            title: "Project Dashboard Report",
            date: new Date().toLocaleDateString(),
            project: selectedProject?.projectName,
            metrics: {
                totalStoryPoints: metrics.totalStoryPoints,
                totalSustainabilityBacklog: metrics.totalSustainabilityBacklog,
                recentlyUpdated: metrics.recentlyUpdated,
                avgStoryPoints: metrics.avgStoryPoints,
                priorityDistribution: metrics.priorityCounts,
            },
        };

        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'project-dashboard-report.json';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    if (loading || backlogLoading) {
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
                    title={`${selectedProject?.projectName} ( ${selectedProject?.jiraProject.name} )`}
                    subtitle={`Created on ${new Date(selectedProject?.createdAt).toLocaleDateString()}`}
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

export default ProjectDashboard;