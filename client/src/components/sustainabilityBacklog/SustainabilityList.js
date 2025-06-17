import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

const DropZone = styled(Box)(({ theme, isDropTarget }) => ({
    position: 'relative',
    minHeight: '20px',
    marginBottom: theme.spacing(2),
    '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        height: '2px',
        backgroundColor: theme.palette.primary.main,
        opacity: isDropTarget ? 1 : 0,
        transition: 'opacity 0.2s',
    },
    '&:hover::before': {
        opacity: 0.5,
    },
}));

const SustainabilityList = ({
    sustainabilityBacklog,
    isEditing,
    draggedItem,
    dropTargetIndex,
    dropTargetList,
    handleDragStart,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleViewDetails,
    handleRemove,
    openImportDialog,
}) => {
    const theme = useTheme();
    return (
        <Paper
            sx={{ p: 2, minHeight: '60vh', flex: 1 }}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'sustainability')}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Active Sustainability Projects</Typography>

                <Button
                    onClick={openImportDialog}
                    sx={{
                        backgroundColor: theme.palette.secondary.light,
                        color: theme.palette.background.alt,
                        fontSize: "12px",
                        fontWeight: "bold",
                        padding: "5px 10px",
                        "&:hover": {
                            backgroundColor: theme.palette.background.alt,
                            color: theme.palette.secondary.light,
                        },
                    }}
                >
                    Add New Effort
                </Button>
            </Box>
            {sustainabilityBacklog.length === 0 ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '50vh',
                        textAlign: 'center',
                        color: 'text.secondary',
                    }}
                >
                    <Typography variant="body1" gutterBottom>
                        No sustainability items yet
                    </Typography>
                    <Typography variant="body2">
                        Drag items from the All Sustainability Initiatives column or use the Add New Project button above
                    </Typography>
                </Box>
            ) : (
                sustainabilityBacklog.map((issue, index) => (
                    <React.Fragment key={`sustainability-${issue.id}-fragment`}>
                        <DropZone
                            onDragEnter={(e) => handleDragEnter(e, index, 'sustainability')}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, 'sustainability')}
                            isDropTarget={dropTargetIndex === index && dropTargetList === 'sustainability'}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 1,
                                p: 1,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                            }}
                            draggable={isEditing}
                            onDragStart={(e) => handleDragStart(e, issue, 'sustainability')}
                        >
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1">{String(issue.fields?.summary || '')}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {String(issue.key || '')}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleViewDetails(issue)}
                                    sx={{
                                        backgroundColor: theme.palette.secondary.light,
                                        color: theme.palette.background.alt,
                                        "&:hover": {
                                            backgroundColor: theme.palette.background.alt,
                                            color: theme.palette.secondary.light,
                                        },
                                    }}
                                >
                                    View Details
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => handleRemove(issue)}
                                    disabled={!isEditing}
                                >
                                    Remove
                                </Button>
                            </Box>
                        </Box>
                    </React.Fragment>
                ))
            )}
            <DropZone
                onDragEnter={(e) => handleDragEnter(e, sustainabilityBacklog.length, 'sustainability')}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'sustainability')}
                isDropTarget={dropTargetIndex === sustainabilityBacklog.length && dropTargetList === 'sustainability'}
            />
        </Paper>
    );
};

export default SustainabilityList;
