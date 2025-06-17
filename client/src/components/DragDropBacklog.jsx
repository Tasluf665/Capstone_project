import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  styled,
} from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: '8px',
  cursor: 'move',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

// Create a styled component that doesn't pass the isOver prop to the DOM
const DropZone = styled(Paper, {
  shouldForwardProp: prop => prop !== 'isOver'
})(({ theme, isOver }) => ({
  padding: theme.spacing(2),
  minHeight: '400px',
  backgroundColor: isOver ? theme.palette.action.hover : theme.palette.background.default,
  border: `2px dashed ${isOver ? theme.palette.primary.main : theme.palette.divider}`,
}));

const DraggableCard = ({ issue, moveCard, zone }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id: issue.id, sourceZone: zone },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <StyledCard>
        <CardContent>
          <Typography variant="h6">{issue.fields?.summary || 'No Title'}</Typography>
          <Typography variant="body2" color="text.secondary">
            {issue.fields?.description || 'No description available'}
          </Typography>
        </CardContent>
      </StyledCard>
    </div>
  );
};

const DropZoneComponent = ({ title, issues, moveCard, zone }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => moveCard(item.id, item.sourceZone, zone),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <DropZone ref={drop} isOver={isOver}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {Array.isArray(issues) && issues.map((issue) => (
        <DraggableCard 
          key={issue.id} 
          issue={issue} 
          moveCard={moveCard}
          zone={zone}
        />
      ))}
    </DropZone>
  );
};

const DragDropBacklog = ({ backlog }) => {
  console.log('DragDropBacklog received backlog:', backlog);
  
  const [backlogItems, setBacklogItems] = useState(() => {
    console.log('Initializing backlog items...');
    if (!Array.isArray(backlog)) {
      console.warn('Backlog is not an array:', backlog);
      return { general: [], sustainability: [] };
    }

    const general = backlog.filter(issue => 
      issue && 
      issue.fields && 
      !issue.fields.labels?.includes('sustainability')
    ) || [];

    const sustainability = backlog.filter(issue => 
      issue && 
      issue.fields && 
      issue.fields.labels?.includes('sustainability')
    ) || [];

    console.log('General items:', general.length);
    console.log('Sustainability items:', sustainability.length);
    return { general, sustainability };
  });

  // Update backlogItems when backlog prop changes
  React.useEffect(() => {
    if (!Array.isArray(backlog)) {
      console.warn('Backlog update is not an array:', backlog);
      setBacklogItems({ general: [], sustainability: [] });
      return;
    }

    const general = backlog.filter(issue => 
      issue && 
      issue.fields && 
      !issue.fields.labels?.includes('sustainability')
    ) || [];

    const sustainability = backlog.filter(issue => 
      issue && 
      issue.fields && 
      issue.fields.labels?.includes('sustainability')
    ) || [];

    setBacklogItems({ general, sustainability });
  }, [backlog]);

  const moveCard = (cardId, sourceZone, targetZone) => {
    if (sourceZone === targetZone) return;

    setBacklogItems(prev => {
      // Ensure both arrays exist
      if (!Array.isArray(prev[sourceZone]) || !Array.isArray(prev[targetZone])) {
        console.error('Invalid zone arrays:', { sourceZone, targetZone, prev });
        return prev;
      }

      const card = prev[sourceZone].find(issue => issue.id === cardId);
      if (!card) {
        console.warn('Card not found:', cardId);
        return prev;
      }

      return {
        ...prev,
        [sourceZone]: prev[sourceZone].filter(issue => issue.id !== cardId),
        [targetZone]: [...prev[targetZone], card]
      };
    });
  };

  // If backlog is not an array, show an error message
  if (!Array.isArray(backlog)) {
    return (
      <Box p={3}>
        <Typography color="error">
          Error: Invalid backlog data received
        </Typography>
      </Box>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <DropZoneComponent
            title="General Backlog"
            issues={backlogItems.general || []}
            moveCard={moveCard}
            zone="general"
          />
        </Grid>
        <Grid item xs={6}>
          <DropZoneComponent
            title="Sustainability Backlog"
            issues={backlogItems.sustainability || []}
            moveCard={moveCard}
            zone="sustainability"
          />
        </Grid>
      </Grid>
    </DndProvider>
  );
};

export default DragDropBacklog; 