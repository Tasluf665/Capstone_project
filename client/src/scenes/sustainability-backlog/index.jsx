import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Container,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  CircularProgress,
  Paper,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  LinearProgress,
  Badge,
  Avatar,
  Tooltip,
  TextField,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import {
  Nature as NatureIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  AccountCircle as AccountCircleIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Add as AddIcon,
  Upload as UploadIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme, isDragging }) => ({
  height: '100%',
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

const DropIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  height: '2px',
  backgroundColor: theme.palette.primary.main,
  opacity: 0,
  transition: 'opacity 0.2s',
  pointerEvents: 'none',
}));

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

const SustainabilityAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#2E7D32', // Green color for sustainability theme
  marginBottom: theme.spacing(4),
}));

function SustainabilityBacklog() {
  const [backlog, setBacklog] = useState([]);
  const [sustainabilityBacklog, setSustainabilityBacklog] = useState(() => {
    const saved = localStorage.getItem('sustainabilityBacklog');
    return saved ? JSON.parse(saved) : [];
  });
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  console.log('Authenticated:', authenticated);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropTargetIndex, setDropTargetIndex] = useState(null);
  const [dropTargetList, setDropTargetList] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('details');
  const [importMode, setImportMode] = useState('backlog');
  const [manualIssue, setManualIssue] = useState({
    summary: '',
    description: '',
    priority: 'Medium',
    storyPoints: '',
  });

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"}/auth/check-auth`, { withCredentials: true });
        setAuthenticated(response.data.authenticated);
      } catch (err) {
        console.error('Error checking authentication:', err);
        setAuthenticated(false);
        setApiError(true);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    if (authenticated && backlog.length === 0) {
      const fetchBacklog = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"}/api/backlog`,
            { withCredentials: true }
          );

          if (!response.data || !response.data.issues) {
            throw new Error('Invalid response format from server');
          }

          const issues = response.data.issues;
          setBacklog(issues);
          setError(null);
          setApiError(false);
        } catch (err) {
          console.error('Error fetching backlog:', err.response?.data || err.message);
          setError(err.response?.data?.error || err.response?.data?.details || 'Error fetching backlog');
          setApiError(true);
        }
      };

      fetchBacklog();
    }
  }, [authenticated, backlog.length]);

  useEffect(() => {
    localStorage.setItem('sustainabilityBacklog', JSON.stringify(sustainabilityBacklog));
  }, [sustainabilityBacklog]);

  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"}/auth/atlassian`;
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"}/auth/logout`, { withCredentials: true });
      setAuthenticated(false);
      setBacklog([]);
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Highest':
        return 'error';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'info';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleAccept = () => {
    setIsEditing(false);
  };

  const handleDragStart = (e, item, sourceList) => {
    if (!isEditing) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', JSON.stringify({ item, sourceList }));
    setDraggedItem(item);
  };

  const handleDragEnter = (e, index, list) => {
    if (!isEditing) return;
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const dropIndex = e.clientY < rect.top + rect.height / 2 ? index : index + 1;
    setDropTargetIndex(dropIndex);
    setDropTargetList(list);
  };

  const handleDragLeave = (e) => {
    if (!isEditing) return;
    e.preventDefault();
    setDropTargetIndex(null);
    setDropTargetList(null);
  };

  const handleDragOver = (e) => {
    if (!isEditing) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetList) => {
    if (!isEditing) return;
    e.preventDefault();

    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      const { item, sourceList } = data;
      const dropIndex = dropTargetIndex !== null ? dropTargetIndex : targetList === 'backlog' ? backlog.length : sustainabilityBacklog.length;

      if (sourceList === targetList) {
        const list = sourceList === 'backlog' ? backlog : sustainabilityBacklog;
        const newList = [...list];
        const currentIndex = newList.findIndex(i => i.id === item.id);
        newList.splice(currentIndex, 1);
        newList.splice(dropIndex, 0, item);

        if (sourceList === 'backlog') {
          setBacklog(newList);
        } else {
          setSustainabilityBacklog(newList);
        }
      } else {
        if (sourceList === 'backlog' && targetList === 'sustainability') {
          const newBacklog = backlog.filter(i => i.id !== item.id);
          const newSustainability = [...sustainabilityBacklog];
          newSustainability.splice(dropIndex, 0, item);
          setBacklog(newBacklog);
          setSustainabilityBacklog(newSustainability);
        } else if (sourceList === 'sustainability' && targetList === 'backlog') {
          const newSustainability = sustainabilityBacklog.filter(i => i.id !== item.id);
          const newBacklog = [...backlog];
          newBacklog.splice(dropIndex, 0, item);
          setSustainabilityBacklog(newSustainability);
          setBacklog(newBacklog);
        }
      }
    } catch (err) {
      console.error('Error handling drop:', err);
    }

    setDraggedItem(null);
    setDropTargetIndex(null);
    setDropTargetList(null);
  };

  const handleViewDetails = (issue) => {
    setSelectedIssue(issue);
    setDialogMode('details');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedIssue(null);
    setDialogMode('details');
  };

  const handleAddToSustainability = (issue) => {
    if (!sustainabilityBacklog.some(item => item.id === issue.id)) {
      const newSustainabilityBacklog = [...sustainabilityBacklog, issue];
      setSustainabilityBacklog(newSustainabilityBacklog);
    }
  };

  const handleManualImport = () => {
    if (!manualIssue.summary) return;

    const fields = {
      summary: String(manualIssue.summary),
      description: String(manualIssue.description || ''),
      priority: {
        name: String(manualIssue.priority)
      },
      customfield_10016: manualIssue.storyPoints ? parseInt(manualIssue.storyPoints) : null,
      updated: new Date().toISOString()
    };

    const newIssue = {
      id: `manual-${Date.now()}`,
      key: `MAN-${Date.now()}`,
      fields
    };

    setBacklog(prev => [...prev, newIssue]);
    setManualIssue({
      summary: '',
      description: '',
      priority: 'Medium',
      storyPoints: '',
    });
    setDialogMode('import');
  };

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target.result;
        let issues = [];

        if (file.name.endsWith('.json')) {
          const parsedContent = JSON.parse(content);
          if (Array.isArray(parsedContent)) {
            issues = parsedContent.map(item => ({
              id: `imported-${Date.now()}-${item.id || Math.random()}`,
              key: String(item.key || `IMPORT-${Date.now()}`),
              fields: {
                summary: String(item.summary || ''),
                description: String(item.description || ''),
                priority: {
                  name: String(item.priority || 'Medium')
                },
                customfield_10016: item.storyPoints ? parseInt(item.storyPoints) : null,
                updated: new Date().toISOString()
              }
            }));
          } else {
            const fields = {
              summary: String(parsedContent.summary || ''),
              description: String(parsedContent.description || ''),
              priority: {
                name: String(parsedContent.priority || 'Medium')
              },
              customfield_10016: parsedContent.storyPoints ? parseInt(parsedContent.storyPoints) : null,
              updated: new Date().toISOString()
            };

            issues = [{
              id: `imported-${Date.now()}-${parsedContent.id || Math.random()}`,
              key: String(parsedContent.key || `IMPORT-${Date.now()}`),
              fields
            }];
          }
        } else if (file.name.endsWith('.csv')) {
          const lines = content.split('\n');
          const headers = lines[0].split(',').map(h => h.trim());
          issues = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim());
            const fields = {
              summary: String(values[1] || ''),
              description: String(values[2] || ''),
              priority: {
                name: String(values[3] || 'Medium')
              },
              customfield_10016: values[4] ? parseInt(values[4]) : null,
              updated: new Date().toISOString()
            };

            return {
              id: `imported-${Date.now()}-${values[0] || Math.random()}`,
              key: String(values[0] || `IMPORT-${Date.now()}`),
              fields
            };
          });
        }

        if (issues.length > 0) {
          setBacklog(prev => [...prev, ...issues]);
          setError(null);
        } else {
          setError('No valid issues found in the file.');
        }
      } catch (err) {
        console.error('Error parsing file:', err);
        setError('Error parsing file: ' + err.message);
      }
    };

    if (file.name.endsWith('.json') || file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else {
      setError('Unsupported file format. Please use JSON or CSV.');
    }
  };

  const handleRemoveFromSustainability = (issue) => {
    const newSustainabilityBacklog = sustainabilityBacklog.filter(i => i.id !== issue.id);
    setSustainabilityBacklog(newSustainabilityBacklog);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!authenticated) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column" gap={2}>
        <Typography variant="h5" color="text.secondary">
          Please log in to view the sustainability backlog
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          startIcon={<LoginIcon />}
        >
          Login
        </Button>
      </Box>
    );
  }

  if (apiError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column" gap={2}>
        <Typography variant="h5" color="error">
          Unable to connect to the server
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please check your connection and try again
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <SustainabilityAppBar position="static">
        <Toolbar>
          <NatureIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sustainability Backlog
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={handleMenu}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <DashboardIcon sx={{ mr: 1 }} /> Sustainability Metrics
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <AssessmentIcon sx={{ mr: 1 }} /> Environmental Impact
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <TrendingUpIcon sx={{ mr: 1 }} /> Green Initiatives
              </MenuItem>
              <Divider />
              {authenticated ? (
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1 }} /> Logout
                </MenuItem>
              ) : (
                <MenuItem onClick={handleLogin}>
                  <LoginIcon sx={{ mr: 1 }} /> Login
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </SustainabilityAppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" component="h1">
              Elisa Sustainability Initiatives
            </Typography>
            {isEditing ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleAccept}
                disabled={!isEditing}
                sx={{ minWidth: '120px' }}
              >
                Save Changes
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleEdit}
                disabled={false}
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
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{ p: 2, minHeight: '60vh' }}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'backlog')}
              >
                <Typography variant="h6" gutterBottom>
                  All Sustainability Initiatives
                </Typography>
                {backlog.map((issue, index) => (
                  <React.Fragment key={`backlog-${issue.id}-fragment`}>
                    <DropZone
                      draggable={false}
                      onDragEnter={(e) => handleDragEnter(e, index, 'backlog')}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'backlog')}
                      isDropTarget={dropTargetIndex === index && dropTargetList === 'backlog'}
                    />
                    <Box
                      key={`backlog-${issue.id}-box`}
                      draggable={isEditing}
                      onDragStart={(e) => handleDragStart(e, issue, 'backlog')}
                      onDragEnter={(e) => handleDragEnter(e, index, 'backlog')}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, 'backlog')}
                      mb={2}
                      sx={{
                        position: 'relative',
                        cursor: isEditing ? 'grab' : 'default',
                        '&:active': {
                          cursor: isEditing ? 'grabbing' : 'default',
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          height: '2px',
                          backgroundColor: 'primary.main',
                          opacity: 0,
                          transition: 'opacity 0.2s',
                        },
                        '&[data-is-drop-target="true"]::before': {
                          opacity: 1,
                        },
                      }}
                    >
                      <StyledCard isDragging={draggedItem?.id === issue.id}>
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
                    </Box>
                  </React.Fragment>
                ))}
                <DropZone
                  key="backlog-end-zone"
                  draggable={false}
                  onDragEnter={(e) => handleDragEnter(e, backlog.length, 'backlog')}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, 'backlog')}
                  isDropTarget={dropTargetIndex === backlog.length && dropTargetList === 'backlog'}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{ p: 2, minHeight: '60vh' }}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'sustainability')}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Active Sustainability Projects
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setDialogMode('import');
                      setOpenDialog(true);
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
                      color: 'text.secondary'
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
                  sustainabilityBacklog.map((issue) => (
                    <Box
                      key={issue.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                        p: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1
                      }}
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
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleRemoveFromSustainability(issue)}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  ))
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {dialogMode === 'details' && selectedIssue ? (
          <>
            <DialogTitle>
              {String(selectedIssue.fields?.summary || '')}
              <Typography variant="subtitle2" color="text.secondary">
                {String(selectedIssue.key || '')}
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" paragraph>
                  {String(selectedIssue.fields?.description || 'No description available')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  <Chip
                    label={`Priority: ${String(selectedIssue.fields?.priority?.name || 'Medium')}`}
                    color={getPriorityColor(selectedIssue.fields?.priority?.name)}
                    size="small"
                  />
                  {selectedIssue.fields?.customfield_10016 && (
                    <Chip
                      label={`Impact Score: ${String(selectedIssue.fields.customfield_10016)}`}
                      color="primary"
                      size="small"
                    />
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Last updated: {new Date(selectedIssue.fields?.updated || new Date()).toLocaleDateString()}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} variant="contained" color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        ) : dialogMode === 'import' ? (
          <>
            <DialogTitle>Add New Sustainability Initiative</DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Button
                    variant={importMode === 'backlog' ? 'contained' : 'outlined'}
                    onClick={() => setImportMode('backlog')}
                    startIcon={<AddIcon />}
                  >
                    From Backlog
                  </Button>
                  <Button
                    variant={importMode === 'file' ? 'contained' : 'outlined'}
                    onClick={() => setImportMode('file')}
                    startIcon={<UploadIcon />}
                  >
                    Import File
                  </Button>
                  <Button
                    variant={importMode === 'manual' ? 'contained' : 'outlined'}
                    onClick={() => setImportMode('manual')}
                    startIcon={<AddIcon />}
                  >
                    Manual Entry
                  </Button>
                </Box>

                {importMode === 'backlog' ? (
                  <Box>
                    <Typography variant="body1" paragraph>
                      Select sustainability initiatives to add to active projects:
                    </Typography>
                    {backlog.map((issue) => {
                      const isAlreadyAdded = sustainabilityBacklog.some(item => item.id === issue.id);
                      return (
                        <Box
                          key={issue.id}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            p: 1,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1
                          }}
                        >
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1">{String(issue.fields?.summary || '')}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {String(issue.key || '')}
                            </Typography>
                          </Box>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleAddToSustainability(issue)}
                            sx={{ minWidth: '80px' }}
                            disabled={isAlreadyAdded}
                          >
                            {isAlreadyAdded ? 'Added' : 'Add'}
                          </Button>
                        </Box>
                      );
                    })}
                  </Box>
                ) : importMode === 'file' ? (
                  <Box>
                    <Typography variant="body1" paragraph>
                      Upload a JSON or CSV file with sustainability initiatives:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      JSON format: Array of objects with fields: summary, description, priority, storyPoints<br />
                      CSV format: key,summary,description,priority,storyPoints
                    </Typography>
                    <input
                      type="file"
                      accept=".json,.csv"
                      onChange={handleFileImport}
                      style={{ display: 'none' }}
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<UploadIcon />}
                      >
                        Upload File
                      </Button>
                    </label>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="body1" paragraph>
                      Manually add a sustainability initiative:
                    </Typography>
                    <TextField
                      fullWidth
                      label="Summary"
                      value={manualIssue.summary}
                      onChange={(e) => setManualIssue({ ...manualIssue, summary: e.target.value })}
                      margin="normal"
                      required
                    />
                    <TextField
                      fullWidth
                      label="Description"
                      value={manualIssue.description}
                      onChange={(e) => setManualIssue({ ...manualIssue, description: e.target.value })}
                      margin="normal"
                      multiline
                      rows={4}
                    />
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Priority</InputLabel>
                      <Select
                        value={manualIssue.priority}
                        onChange={(e) => setManualIssue({ ...manualIssue, priority: e.target.value })}
                        label="Priority"
                      >
                        <MenuItem value="Highest">Highest</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Story Points"
                      value={manualIssue.storyPoints}
                      onChange={(e) => setManualIssue({ ...manualIssue, storyPoints: e.target.value })}
                      margin="normal"
                      type="number"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleManualImport}
                      disabled={!manualIssue.summary}
                      sx={{ mt: 2 }}
                    >
                      Add Initiative
                    </Button>
                  </Box>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} variant="contained" color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        ) : null}
      </Dialog>
    </Box>
  );
}

export default SustainabilityBacklog; 