import React from 'react';
import { Card, CardContent, Typography, Button, Chip, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme, isDragging }) => ({
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s',
    cursor: 'grab',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[8],
    },
    ...(isDragging && {
        opacity: 0.5,
        cursor: 'grabbing',
    }),
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
}));

const IssueCard = ({ issue, isDragging, isEditing, handleDragStart, handleViewDetails }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Highest': return 'error';
            case 'High': return 'warning';
            case 'Medium': return 'info';
            case 'Low': return 'success';
            default: return 'default';
        }
    };

    return (
        <StyledCard
            isDragging={isDragging}
            draggable={isEditing}
            onDragStart={(e) => handleDragStart(e, issue)}
        >
            <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                    {String(issue.fields?.summary || '')}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    {String(issue.fields?.description || 'No description available')}
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Chip
                        label={`Priority: ${String(issue.fields?.priority?.name || 'Medium')}`}
                        color={getPriorityColor(issue.fields?.priority?.name)}
                        size="small"
                        sx={{ mr: 1 }}
                    />
                    {issue.fields?.customfield_10016 && (
                        <Chip
                            label={`Story Points: ${String(issue.fields.customfield_10016)}`}
                            color="primary"
                            size="small"
                        />
                    )}
                </Box>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleViewDetails(issue)}
                    sx={{ mt: 1 }}
                >
                    View Details
                </Button>
            </CardContent>
        </StyledCard>
    );
};

export default IssueCard;