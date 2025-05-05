const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to get sustainability-filtered backlog data
router.get('/', async (req, res) => {
    if (!req.user) {
        return res.status(401).send('Not authenticated');
    }

    const user = req.user;

    try {
        // Get the cloud ID to access the correct JIRA site
        const cloudIdResponse = await axios.get('https://api.atlassian.com/oauth/token/accessible-resources', {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                'Accept': 'application/json'
            }
        });

        if (!cloudIdResponse.data || !cloudIdResponse.data[0]) {
            console.error('No accessible resources found');
            return res.status(404).json({ error: 'No Jira site found' });
        }

        const cloudId = cloudIdResponse.data[0].id;
        console.log('Cloud ID:', cloudId);

        // Construct the URL for accessing the product backlog
        const apiUrl = `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/search`;

        // Fetch the sustainability backlog from JIRA
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                'Accept': 'application/json'
            },
            params: {
                jql: 'project = "SCRUM" AND (summary ~ "sustainability" OR description ~ "sustainability" OR labels = "sustainability") ORDER BY priority DESC',
                fields: 'summary,priority,issuetype,customfield_10016,description,updated,labels'
            }
        });

        if (!response.data || !response.data.issues) {
            console.error('Invalid response format from Jira:', response.data);
            return res.status(500).json({ error: 'Invalid response from Jira' });
        }

        res.json({
            cloudId,
            issues: response.data.issues
        });
    } catch (err) {
        console.error('Error fetching backlog:', err.response ? {
            status: err.response.status,
            data: err.response.data,
            headers: err.response.headers
        } : err.message);
        res.status(500).json({ 
            error: 'Error fetching backlog',
            details: err.response ? err.response.data : err.message
        });
    }
});

// Route to get all backlog data (unfiltered)
router.get('/all', async (req, res) => {
    if (!req.user) {
        return res.status(401).send('Not authenticated');
    }

    const user = req.user;

    try {
        const cloudIdResponse = await axios.get('https://api.atlassian.com/oauth/token/accessible-resources', {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                'Accept': 'application/json'
            }
        });

        if (!cloudIdResponse.data || !cloudIdResponse.data[0]) {
            console.error('No accessible resources found');
            return res.status(404).json({ error: 'No Jira site found' });
        }

        const cloudId = cloudIdResponse.data[0].id;
        const apiUrl = `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/search`;

        // Fetch all backlog items without any filters
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${user.accessToken}`,
                'Accept': 'application/json'
            },
            params: {
                jql: 'ORDER BY priority DESC',
                fields: 'summary,priority,issuetype,customfield_10016,description,updated,labels'
            }
        });

        if (!response.data || !response.data.issues) {
            console.error('Invalid response format from Jira:', response.data);
            return res.status(500).json({ error: 'Invalid response from Jira' });
        }

        res.json({
            cloudId,
            issues: response.data.issues
        });
    } catch (err) {
        console.error('Error fetching all backlog:', err.response ? {
            status: err.response.status,
            data: err.response.data,
            headers: err.response.headers
        } : err.message);
        res.status(500).json({ 
            error: 'Error fetching all backlog',
            details: err.response ? err.response.data : err.message
        });
    }
});

module.exports = router;
