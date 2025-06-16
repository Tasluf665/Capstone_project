import React from 'react';
import { Container, Box, Typography, Button, Card, CardContent, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useBacklog from '../../hooks/useBacklog';
import LoginIcon from '@mui/icons-material/Login';
import SustainabilityAppBar from '../../components/sustainabilityBacklog/SustainabilityAppBar';
import { increaseActiveStoryPoints } from 'store/storyPoints';

function ProjectListPage() {
    const theme = useTheme();
    const { authenticated, loading, apiError, handleLogin, handleLogout } = useAuth();
    const { userProjects, loading: backlogLoading } = useBacklog(authenticated, null); // Fetch existing projects
    console.log("userProjects", userProjects);
    const navigate = useNavigate();

    if (loading || backlogLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    if (!authenticated || apiError) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" flexDirection="column" gap={2}>
                <Typography variant="h5" color="text.secondary">
                    Please log into JIRA to view the sustainability backlog
                </Typography>
                <Button
                    onClick={handleLogin}
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
                    startIcon={<LoginIcon />}
                >
                    Login
                </Button>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <SustainabilityAppBar authenticated={authenticated} handleLogout={handleLogout} handleLogin={handleLogin} />
            <Typography variant="h4" component="h1" mb={3} textAlign="center">
                Your Projects
            </Typography>

            {/* <button onClick={
                () => increaseActiveStoryPoints("TP", 10)
            }>
                click me to add a new story point
            </button> */}

            {userProjects && userProjects.length > 0 ? (
                <>
                    <Button
                        onClick={() => navigate('/sustainability-backlog/create-new')}
                        sx={{
                            mb: 2,
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.alt,
                            "&:hover": {
                                backgroundColor: theme.palette.background.alt,
                                color: theme.palette.secondary.light,
                            },
                            padding: "6px 16px",
                            alignSelf: 'flex-start',
                        }}
                    >
                        Create Project
                    </Button>

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        {userProjects.map((project) => (
                            <Card
                                key={project.key}
                                sx={{
                                    width: 300,
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" component="div" gutterBottom>
                                        {project.projectName || 'Unnamed Project'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {project.jiraProject?.name || 'Unknown Project'}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Created: {new Date(project.createdAt).toLocaleDateString()}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                        <Button
                                            onClick={() => navigate(`/sustainability-backlog/${project.jiraProject.key}`)}
                                            sx={{
                                                backgroundColor: theme.palette.secondary.light,
                                                color: theme.palette.background.alt,
                                                "&:hover": {
                                                    backgroundColor: theme.palette.background.alt,
                                                    color: theme.palette.secondary.light,
                                                },
                                                padding: "6px 16px",
                                            }}
                                        >
                                            Details
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </>
            ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h6" color="text.secondary" mb={2}>
                        No projects created yet.
                    </Typography>
                    <Button
                        onClick={() => navigate('/sustainability-backlog/create-new')}
                        sx={{
                            backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.alt,
                            "&:hover": {
                                backgroundColor: theme.palette.background.alt,
                                color: theme.palette.secondary.light,
                            },
                            padding: "10px 20px",
                        }}
                    >
                        Create Project
                    </Button>
                </Box>
            )}
        </Container>
    );
}

export default ProjectListPage;