import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  useTheme,
} from '@mui/material';
import { Timer } from '@mui/icons-material';

const FocusMode = ({ isOpen, onClose, onFocusModeChange }) => {
  const theme = useTheme();
  const [isActive, setIsActive] = useState(false);

  const handleStart = () => {
    setIsActive(true);
    onFocusModeChange(true);
  };

  const handleStop = () => {
    setIsActive(false);
    onFocusModeChange(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.background.alt,
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h4" fontWeight="bold" color={theme.palette.primary.main}>
          Focus Mode
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ my: 3 }}>
          <Typography variant="body1" color={theme.palette.secondary[200]}>
            Focus mode will:
          </Typography>
          <ul style={{ color: theme.palette.secondary[200] }}>
            <li>Show only Dashboard and Sustainability Dashboard</li>
            <li>Hide navigation sidebar</li>
            <li>Hide unnecessary UI elements</li>
            <li>Minimize distractions</li>
          </ul>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ mr: 1 }}
        >
          Close
        </Button>
        {!isActive ? (
          <Button
            onClick={handleStart}
            variant="contained"
            startIcon={<Timer />}
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Enable Focus Mode
          </Button>
        ) : (
          <Button
            onClick={handleStop}
            variant="contained"
            color="error"
          >
            Disable Focus Mode
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default FocusMode; 