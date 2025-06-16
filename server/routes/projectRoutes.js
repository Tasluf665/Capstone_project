const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// POST route to save project
router.post('/save', async (req, res) => {
    console.log(req.body);
    try {
        const { projectName, jiraProject } = req.body;

        // Validate input
        if (!projectName || !jiraProject || !jiraProject.id || !jiraProject.name || !jiraProject.key) {
            return res.status(400).json({ message: 'Project name and JIRA project details are required' });
        }

        // Create new dashboard
        const project = new Project({
            projectName,
            jiraProject: {
                id: jiraProject.id,
                name: jiraProject.name,
                key: jiraProject.key,
            },
        });

        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (error) {
        console.error('Error saving project:', error);
        res.status(500).json({ message: 'Server error while saving project' });
    }
});

// Optional: GET route to fetch projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Server error while fetching projects' });
    }
});

// New GET route to fetch a project by jiraProject.key
router.get('/key/:projectKey', async (req, res) => {
    try {
        const { projectKey } = req.params;

        // Find the project where jiraProject.key matches the provided projectKey
        const project = await Project.findOne({ 'jiraProject.key': projectKey });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        console.error('Error fetching project by key:', error);
        res.status(500).json({ message: 'Server error while fetching project' });
    }
});

// New PUT route to update sustainabilityBacklog for a project
router.put('/:projectKey/sustainability-backlog', async (req, res) => {
    try {
        const { projectKey } = req.params;
        const { sustainabilityBacklog } = req.body;

        // Validate input
        if (!sustainabilityBacklog || !Array.isArray(sustainabilityBacklog)) {
            return res.status(400).json({ message: 'sustainabilityBacklog must be an array' });
        }

        // Find the project and update its sustainabilityBacklog
        const project = await Project.findOneAndUpdate(
            { 'jiraProject.key': projectKey },
            { sustainabilityBacklog },
            { new: true, runValidators: true }
        );

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        console.error('Error updating sustainability backlog:', error);
        res.status(500).json({ message: 'Server error while updating sustainability backlog' });
    }
});



// New GET route to fetch sustainabilityBacklog for a project
router.get('/:projectKey/sustainability-backlog', async (req, res) => {
    try {
        const { projectKey } = req.params;

        // Find the project
        const project = await Project.findOne({ 'jiraProject.key': projectKey });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json(project.sustainabilityBacklog);
    } catch (error) {
        console.error('Error fetching sustainability backlog:', error);
        res.status(500).json({ message: 'Server error while fetching sustainability backlog' });
    }
});

module.exports = router;