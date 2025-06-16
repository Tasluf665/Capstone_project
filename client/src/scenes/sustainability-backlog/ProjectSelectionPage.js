import React, { useState } from 'react';
import { Container, Box, Typography, Button, TextField, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useBacklog from '../../hooks/useBacklog';
import useAuth from '../../hooks/useAuth';
import SustainabilityAppBar from '../../components/sustainabilityBacklog/SustainabilityAppBar';

function ProjectSelectionPage() {
    const theme = useTheme();
    const { jiraProjects } = useBacklog(true, null); // Fetch JIRA projects
    const [dashboardName, setDashboardName] = useState('');
    const [selectedJiraProject, setSelectedJiraProject] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { authenticated, handleLogin, handleLogout } = useAuth();

    const handleSelect = async () => {
        if (dashboardName.trim() && selectedJiraProject) {
            setIsLoading(true);
            setErrorMessage(null);

            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"}/api/project/save`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust based on your auth setup
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        projectName: dashboardName,
                        jiraProject: {
                            id: selectedJiraProject.id,
                            name: selectedJiraProject.name,
                            key: selectedJiraProject.key,
                        },
                    }),
                });

                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    navigate(`/sustainability-backlog/`); // Navigate to the new project's page
                    setDashboardName('');
                    setSelectedJiraProject(null);
                } else {
                    setErrorMessage(data.message || 'Failed to save project');
                }
            } catch (error) {
                console.error('Error saving project:', error);
                setErrorMessage('An error occurred while saving the project');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <SustainabilityAppBar authenticated={authenticated} handleLogout={handleLogout} handleLogin={handleLogin} />

            <Container
                maxWidth="lg"
                sx={{
                    minHeight: '80vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >

                <Box
                    sx={{
                        width: '100%',
                        maxWidth: '400px', // Limits the overall width of the form
                    }}
                >
                    <Typography variant="h4" component="h1" mb={3} textAlign="center">
                        Create a new project
                    </Typography>
                    {errorMessage && (
                        <Box sx={{ mb: 2, p: 2, bgcolor: 'error.light', color: 'error.contrastText', borderRadius: 1 }}>
                            <Typography variant="body1" gutterBottom>
                                {errorMessage}
                            </Typography>
                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => setErrorMessage(null)}
                            >
                                Dismiss
                            </Button>
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            label="Dashboard Name"
                            value={dashboardName}
                            onChange={(e) => setDashboardName(e.target.value)}
                            variant="outlined"
                            fullWidth={false} // Disable full width
                            sx={{ width: '400px' }} // Set specific width
                            helperText="Enter a custom name for your dashboard (e.g., Dashboard)"
                            disabled={isLoading}
                        />
                        <TextField
                            select
                            label=""
                            value={selectedJiraProject?.id || ''}
                            onChange={(e) => setSelectedJiraProject(jiraProjects.find(p => p.id === e.target.value))}
                            variant="outlined"
                            fullWidth={false} // Disable full width
                            sx={{ width: '400px' }} // Set specific width
                            SelectProps={{ native: true }}
                            disabled={isLoading}
                        >
                            <option value="">Select a project</option>
                            {jiraProjects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </TextField>
                        <Button
                            onClick={handleSelect}
                            disabled={!dashboardName.trim() || !selectedJiraProject || isLoading}
                            sx={{
                                backgroundColor: theme.palette.secondary.light,
                                color: theme.palette.background.alt,
                                "&:hover": {
                                    backgroundColor: theme.palette.background.alt,
                                    color: theme.palette.secondary.light,
                                },
                                width: '300px', // Match button width to inputs
                                ":disabled": {
                                    backgroundColor: theme.palette.secondary.light,
                                    color: theme.palette.background.alt,
                                },
                                alignSelf: 'center',
                            }}
                        >
                            {isLoading ? 'Saving...' : 'Proceed'}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default ProjectSelectionPage;