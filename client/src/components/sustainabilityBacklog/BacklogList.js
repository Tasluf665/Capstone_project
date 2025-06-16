import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import IssueCard from './IssueCard';

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

const BacklogList = ({
    backlog,
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
}) => {
    return (
        <Paper
            sx={{ p: 2, minHeight: '60vh', flex: 1 }}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'backlog')}
        >
            <Typography variant="h6" gutterBottom>
                All Sustainability Initiatives
            </Typography>
            {backlog.map((issue, index) => (
                <React.Fragment key={`backlog-${issue.id}-fragment`}>
                    <DropZone
                        onDragEnter={(e) => handleDragEnter(e, index, 'backlog')}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, 'backlog')}
                        isDropTarget={dropTargetIndex === index && dropTargetList === 'backlog'}
                    />
                    <IssueCard
                        issue={issue}
                        isDragging={draggedItem?.id === issue.id}
                        isEditing={isEditing}
                        handleDragStart={(e) => handleDragStart(e, issue, 'backlog')}
                        handleViewDetails={handleViewDetails}
                    />
                </React.Fragment>
            ))}
            <DropZone
                onDragEnter={(e) => handleDragEnter(e, backlog.length, 'backlog')}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'backlog')}
                isDropTarget={dropTargetIndex === backlog.length && dropTargetList === 'backlog'}
            />
        </Paper>
    );
};

export default BacklogList;