import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, useTheme } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import SustainabilityAppBar from '../../components/sustainabilityBacklog/SustainabilityAppBar';
import BacklogList from '../../components/sustainabilityBacklog/BacklogList';
import SustainabilityList from '../../components/sustainabilityBacklog/SustainabilityList';
import ImportDialog from '../../components/sustainabilityBacklog/ImportDialog';
import useAuth from '../../hooks/useAuth';
import useBacklog from '../../hooks/useBacklog';
import useSustainabilityBacklog from '../../hooks/useSustainabilityBacklog';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

function SustainabilityBacklog({ projectKey }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const { authenticated, loading, apiError, handleLogin, handleLogout } = useAuth();
    const { backlog, setBacklog, error, setError, loading: backlogLoading, selectedProject } = useBacklog(authenticated, projectKey);
    console.log("backlog", backlog);
    const {
        sustainabilityBacklog,
        isEditing,
        setIsEditing,
        draggedItem,
        dropTargetIndex,
        dropTargetList,
        openDialog,
        setOpenDialog,
        dialogMode,
        setDialogMode,
        importMode,
        setImportMode,
        selectedIssue,
        setSelectedIssue,
        manualIssue,
        setManualIssue,
        handleDragStart,
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        handleViewDetails,
        handleAddToSustainability,
        handleRemoveFromSustainability,
        handleManualImport,
        handleFileImport,
        updateSustainabilityBacklog
    } = useSustainabilityBacklog(projectKey);

    // Filter out backlog items that are already in sustainability backlog
    const filteredBacklog = backlog.filter(backlogItem => {
        // First check if item is not in sustainability backlog
        const notInSustainabilityBacklog = !sustainabilityBacklog.some(sustainabilityItem =>
            sustainabilityItem.id === backlogItem.id
        );

        // Then check if item has sustainability in summary or description
        const hasSustainability = backlogItem.fields.summary.toLowerCase().includes('sustainability') ||
            (backlogItem.fields.description?.content?.[0]?.content?.[0]?.text || '')
                .toLowerCase()
                .includes('sustainability');

        return notInSustainabilityBacklog && hasSustainability;
    });

    // Get remaining backlog items for ImportDialog
    const remainingBacklog = backlog.filter(backlogItem => {
        // Check if item is not in sustainability backlog
        const notInSustainabilityBacklog = !sustainabilityBacklog.some(sustainabilityItem =>
            sustainabilityItem.id === backlogItem.id
        );

        // Check if item does not have sustainability in summary or description
        const noSustainability = !backlogItem.fields.summary.toLowerCase().includes('sustainability') &&
            !(backlogItem.fields.description?.content?.[0]?.content?.[0]?.text || '')
                .toLowerCase()
                .includes('sustainability');

        return notInSustainabilityBacklog && noSustainability;
    });

    if (loading || backlogLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    if (!authenticated || apiError || error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column" gap={2}>
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
        <Box sx={{ flexGrow: 1 }}>
            <SustainabilityAppBar authenticated={authenticated} handleLogout={handleLogout} handleLogin={handleLogin} />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" component="h1">
                        {selectedProject?.projectName} ( {selectedProject?.jiraProject.name} )
                    </Typography>

                    <Button
                        onClick={() => navigate(`/dashboard/${projectKey}`)}
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
                        Dashboard
                    </Button>


                    {isEditing ? (
                        <Button
                            onClick={() => {
                                setIsEditing(false);
                                updateSustainabilityBacklog(sustainabilityBacklog, projectKey);
                            }}
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
                            Save Changes
                        </Button>
                    ) : (
                        <Button
                            onClick={() => setIsEditing(true)}
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
                            startIcon={<EditIcon />}
                        >
                            Manage Initiatives
                        </Button>
                    )}
                </Box>
                {error && (
                    <Box sx={{ mb: 2, p: 2, bgcolor: 'error.light', color: 'error.contrastText', borderRadius: 1 }}>
                        <Typography variant="body1" gutterBottom>
                            {error}
                        </Typography>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => setError(null)}
                        >
                            Dismiss
                        </Button>
                    </Box>
                )}

                <Box sx={{ display: 'flex', gap: 3 }}>
                    <BacklogList
                        backlog={filteredBacklog}
                        isEditing={isEditing}
                        draggedItem={draggedItem}
                        dropTargetIndex={dropTargetIndex}
                        dropTargetList={dropTargetList}
                        handleDragStart={handleDragStart}
                        handleDragEnter={handleDragEnter}
                        handleDragLeave={handleDragLeave}
                        handleDragOver={handleDragOver}
                        handleDrop={(e) => handleDrop(e, 'backlog', backlog, setBacklog)}
                        handleViewDetails={handleViewDetails}
                    />
                    <SustainabilityList
                        sustainabilityBacklog={sustainabilityBacklog}
                        isEditing={isEditing}
                        draggedItem={draggedItem}
                        dropTargetIndex={dropTargetIndex}
                        dropTargetList={dropTargetList}
                        handleDragStart={handleDragStart}
                        handleDragEnter={handleDragEnter}
                        handleDragLeave={handleDragLeave}
                        handleDragOver={handleDragOver}
                        handleDrop={(e) => handleDrop(e, 'sustainability', backlog, setBacklog)}
                        handleViewDetails={handleViewDetails}
                        handleRemove={handleRemoveFromSustainability}
                        openImportDialog={() => {
                            setDialogMode('import');
                            setOpenDialog(true);
                        }}
                    />
                </Box>

                <ImportDialog
                    open={openDialog}
                    onClose={() => {
                        setOpenDialog(false);
                        setDialogMode('details');
                        setSelectedIssue(null);
                    }}
                    dialogMode={dialogMode}
                    setDialogMode={setDialogMode}
                    importMode={importMode}
                    setImportMode={setImportMode}
                    backlog={remainingBacklog}
                    sustainabilityBacklog={sustainabilityBacklog}
                    handleAddToSustainability={handleAddToSustainability}
                    handleFileImport={(e) => handleFileImport(e, backlog, setBacklog, setError)}
                    manualIssue={manualIssue}
                    setManualIssue={setManualIssue}
                    handleManualImport={() => handleManualImport(backlog, setBacklog)}
                    selectedIssue={selectedIssue}
                />
            </Container>
        </Box>
    );
}

export default SustainabilityBacklog;