import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Chip,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { Add as AddIcon, Upload as UploadIcon } from '@mui/icons-material';

const ImportDialog = ({
    open,
    onClose,
    dialogMode,
    setDialogMode,
    importMode,
    setImportMode,
    backlog,
    sustainabilityBacklog,
    handleAddToSustainability,
    handleFileImport,
    manualIssue,
    setManualIssue,
    handleManualImport,
    selectedIssue,
}) => {
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
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
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
                        <Button onClick={onClose} variant="contained" color="primary">
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
                                                    borderRadius: 1,
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
                        <Button onClick={onClose} variant="contained" color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </>
            ) : null}
        </Dialog>
    );
};

export default ImportDialog;