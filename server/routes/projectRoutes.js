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

// Route to download sustainability backlog report as JSON
router.get('/:projectKey/download-report', async (req, res) => {
    try {
        const { projectKey } = req.params;
        // Find the project
        const project = await Project.findOne({ 'jiraProject.key': projectKey });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const backlog = project.sustainabilityBacklog || [];
        // Deduplicate tasks by id
        const uniqueTasks = [];
        const seenIds = new Set();
        for (const item of backlog) {
            if (!seenIds.has(item.id)) {
                seenIds.add(item.id);
                uniqueTasks.push(item);
            }
        }
        // Total story points
        const totalStoryPoints = uniqueTasks.reduce((total, item) => {
            const storyPoints = item.fields.customfield_10016 || 0;
            return total + storyPoints;
        }, 0);
        // Total unique tasks
        const totalSustainabilityBacklog = uniqueTasks.length;
        // Priority distribution
        const priorityCounts = uniqueTasks.reduce((acc, item) => {
            const priority = item.fields.priority?.name || 'Unknown';
            acc[priority] = (acc[priority] || 0) + 1;
            return acc;
        }, {});
        // Recently updated (last 7 days, EEST)
        const currentDate = new Date(Date.now());
        currentDate.setUTCHours(currentDate.getUTCHours() + 3); // EEST (UTC+3)
        const daysDifference = (date1, date2) => Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));
        const recentlyUpdated = uniqueTasks.filter((item) => {
            const updatedDate = new Date(item.fields.updated);
            return daysDifference(currentDate, updatedDate) <= 7;
        }).length;
        // Average story points per task
        const avgStoryPoints = totalSustainabilityBacklog > 0 ? (totalStoryPoints / totalSustainabilityBacklog).toFixed(1) : 0;
        // Prepare report
        const report = {
            title: 'Project Dashboard Report',
            date: new Date().toLocaleDateString(),
            project: project.projectName,
            metrics: {
                totalStoryPoints,
                totalSustainabilityBacklog,
                recentlyUpdated,
                avgStoryPoints,
                priorityDistribution: priorityCounts,
            },
        };
        // Send as downloadable JSON file
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=project-dashboard-report.json');
        res.send(JSON.stringify(report, null, 2));
    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ message: 'Server error while generating report' });
    }
});

// Route to download a single aggregated report for all projects
router.get('/download-all-reports', async (req, res) => {
    try {
        const projects = await Project.find();
        let totalStoryPoints = 0;
        let totalSustainabilityBacklog = 0;
        let recentlyUpdated = 0;
        let totalAvgStoryPoints = 0;
        let avgStoryPointsCount = 0;
        const priorityDistribution = {};

        const currentDate = new Date(Date.now());
        currentDate.setUTCHours(currentDate.getUTCHours() + 3); // EEST (UTC+3)
        const daysDifference = (date1, date2) => Math.floor((date1 - date2) / (1000 * 60 * 60 * 24));

        projects.forEach(project => {
            const backlog = project.sustainabilityBacklog || [];
            // Deduplicate tasks by id
            const uniqueTasks = [];
            const seenIds = new Set();
            for (const item of backlog) {
                if (!seenIds.has(item.id)) {
                    seenIds.add(item.id);
                    uniqueTasks.push(item);
                }
            }
            // Total story points for this project
            const projectStoryPoints = uniqueTasks.reduce((total, item) => {
                const storyPoints = item.fields.customfield_10016 || 0;
                return total + storyPoints;
            }, 0);
            totalStoryPoints += projectStoryPoints;
            // Total unique tasks for this project
            totalSustainabilityBacklog += uniqueTasks.length;
            // Priority distribution
            uniqueTasks.forEach(item => {
                const priority = item.fields.priority?.name || 'Unknown';
                priorityDistribution[priority] = (priorityDistribution[priority] || 0) + 1;
            });
            // Recently updated (last 7 days, EEST)
            recentlyUpdated += uniqueTasks.filter((item) => {
                const updatedDate = new Date(item.fields.updated);
                return daysDifference(currentDate, updatedDate) <= 7;
            }).length;
            // Average story points for this project
            if (uniqueTasks.length > 0) {
                totalAvgStoryPoints += projectStoryPoints / uniqueTasks.length;
                avgStoryPointsCount++;
            }
        });
        // Calculate overall average story points per task
        const avgStoryPoints = avgStoryPointsCount > 0 ? (totalAvgStoryPoints / avgStoryPointsCount).toFixed(1) : 0;
        // Prepare aggregated report
        const report = {
            title: 'All Projects Dashboard Report',
            date: new Date().toLocaleDateString(),
            metrics: {
                totalStoryPoints,
                totalSustainabilityBacklog,
                recentlyUpdated,
                avgStoryPoints,
                priorityDistribution,
            },
        };
        // Send as downloadable JSON file
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=all-projects-dashboard-report.json');
        res.send(JSON.stringify(report, null, 2));
    } catch (error) {
        console.error('Error generating all projects report:', error);
        res.status(500).json({ message: 'Server error while generating all projects report' });
    }
});

module.exports = router;