import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ProjectSelector = ({ projects, selectedProject, setSelectedProject }) => {
    return (
        <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Project</InputLabel>
            <Select
                value={selectedProject ? selectedProject.key : ''}
                onChange={(e) => {
                    const project = projects.find(p => p.key === e.target.value);
                    setSelectedProject(project);
                }}
                label="Select Project"
            >
                {projects.map((project) => (
                    <MenuItem key={project.key} value={project.key}>
                        {project.name} ({project.key})
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default ProjectSelector;