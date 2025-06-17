// Default data for sustainability metrics
export const sustainabilityData = {
    carbonReduction: "2.5 tons",
    treesSaved: 150,
    energySaved: "45,000 kWh",
    waterConserved: "120,000 L",
    greenCodeImpact: "85%",
    projects: [
        {
            _id: 1,
            projectName: "Green Code Optimization",
            createdAt: "2024-03-01",
            impactScore: "High",
            status: "Active",
        },
        {
            _id: 2,
            projectName: "Energy-Efficient Algorithms",
            createdAt: "2024-03-15",
            impactScore: "Medium",
            status: "Completed",
        },
        {
            _id: 3,
            projectName: "Sustainable Data Centers",
            createdAt: "2024-04-01",
            impactScore: "High",
            status: "In Progress",
        },
    ],
};

// Chart data for monthly impact
export const monthlyImpactData = [
    {
        id: "Carbon Reduction",
        data: [
            { x: "Jan", y: 1.2 },
            { x: "Feb", y: 1.5 },
            { x: "Mar", y: 1.8 },
            { x: "Apr", y: 2.0 },
            { x: "May", y: 2.2 },
            { x: "Jun", y: 2.5 },
        ],
    },
    {
        id: "Energy Saved",
        data: [
            { x: "Jan", y: 30000 },
            { x: "Feb", y: 35000 },
            { x: "Mar", y: 38000 },
            { x: "Apr", y: 40000 },
            { x: "May", y: 42000 },
            { x: "Jun", y: 45000 },
        ],
    },
];

// Chart data for impact distribution
export const impactDistributionData = [
    {
        id: "Medium Priority",
        label: "Medium Priority",
        value: 5,
        color: "#f39c12",
    },
    {
        id: "Low Priority",
        label: "Low Priority",
        value: 1,
        color: "#3498db",
    }
];

// Chart data for resource usage
export const resourceUsageData = [
    {
        category: "2 Story Points",
        before: 1,
        after: 1,
    },
    {
        category: "5 Story Points",
        before: 1,
        after: 1,
    },
    {
        category: "No Story Points",
        before: 4,
        after: 4,
    }
];


export const projectTableData = [
    {
        "id": "10002",
        "key": "SCRUM-3",
        "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10002",
        "fields": {
            "summary": "Weekly continuous research for sustainability metrics related to energy efficiency after feedback.",
            "customfield_10016": 2,
            "issuetype": {
                "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
                "id": "10001",
                "description": "A small, distinct piece of work.",
                "iconUrl": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
                "name": "Task",
                "subtask": false,
                "avatarId": 10318,
                "entityId": "e2a04137-5afe-4a0b-975d-f8d340aed7b5",
                "hierarchyLevel": 0
            },
            "description": {
                "type": "doc",
                "version": 1,
                "content": [
                    {
                        "type": "paragraph",
                        "content": [
                            {
                                "type": "text",
                                "text": "Every week, read and gather at least one research paper and add it to the list created in SharePoint. "
                            }
                        ]
                    }
                ]
            },
            "priority": {
                "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/priority/4",
                "iconUrl": "https://elisa-dashboard.atlassian.net/images/icons/priorities/low_new.svg",
                "name": "Low",
                "id": "4"
            },
            "updated": "2025-04-08T08:29:35.510+0300",
            "labels": [
                "Operational"
            ]
        },
        "_id": "6831b12859684ac84c476976",
        "summary": "Weekly continuous research for sustainability metrics related to energy efficiency after feedback.",
        "priority": "Low",
        "storyPoints": 2,
        "updated": "2025-04-08T08:29:35.510+0300",
        "labels": [
            "Operational"
        ]
    },
    {
        "id": "10373",
        "key": "SCRUM-80",
        "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10373",
        "fields": {
            "summary": "Social sustainability section",
            "customfield_10016": null,
            "issuetype": {
                "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
                "id": "10001",
                "description": "A small, distinct piece of work.",
                "iconUrl": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
                "name": "Task",
                "subtask": false,
                "avatarId": 10318,
                "entityId": "e2a04137-5afe-4a0b-975d-f8d340aed7b5",
                "hierarchyLevel": 0
            },
            "description": null,
            "priority": {
                "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/priority/3",
                "iconUrl": "https://elisa-dashboard.atlassian.net/images/icons/priorities/medium_new.svg",
                "name": "Medium",
                "id": "3"
            },
            "updated": "2025-04-17T12:19:44.717+0300",
            "labels": []
        },
        "_id": "68338741b7b60f751c5bf1e1",
        "summary": "Social sustainability section",
        "priority": "Medium",
        "storyPoints": "Not assigned",
        "updated": "2025-04-17T12:19:44.717+0300",
        "labels": []
    },
    {
        "id": "10366",
        "key": "SCRUM-73",
        "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10366",
        "fields": {
            "customfield_10016": null,
            "summary": "Refine the General Backlog Items that can be dragged to complement the sustainability backlog so that the same PBIs are not shown twice",
            "issuetype": {
                "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
                "id": "10001",
                "description": "A small, distinct piece of work.",
                "iconUrl": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
                "name": "Task",
                "subtask": false,
                "avatarId": 10318,
                "entityId": "e2a04137-5afe-4a0b-975d-f8d340aed7b5",
                "hierarchyLevel": 0
            },
            "description": null,
            "priority": {
                "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/priority/3",
                "iconUrl": "https://elisa-dashboard.atlassian.net/images/icons/priorities/medium_new.svg",
                "name": "Medium",
                "id": "3"
            },
            "updated": "2025-05-06T16:07:48.197+0300",
            "labels": []
        },
        "_id": "68338741b7b60f751c5bf1e2",
        "summary": "Refine the General Backlog Items that can be dragged to complement the sustainability backlog so that the same PBIs are not shown twice",
        "priority": "Medium",
        "storyPoints": "Not assigned",
        "updated": "2025-05-06T16:07:48.197+0300",
        "labels": []
    },
    {
        "id": "10364",
        "key": "SCRUM-71",
        "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10364",
        "fields": {
            "summary": "Using filters as dropdowns so that PMs and PD teams can choose if they want to refine a sustainability sprint or by any other criteria",
            "customfield_10016": null,
            "issuetype": {
                "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
                "id": "10001",
                "description": "A small, distinct piece of work.",
                "iconUrl": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
                "name": "Task",
                "subtask": false,
                "avatarId": 10318,
                "entityId": "e2a04137-5afe-4a0b-975d-f8d340aed7b5",
                "hierarchyLevel": 0
            },
            "description": null,
            "priority": {
                "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/priority/3",
                "iconUrl": "https://elisa-dashboard.atlassian.net/images/icons/priorities/medium_new.svg",
                "name": "Medium",
                "id": "3"
            },
            "updated": "2025-04-17T12:10:27.809+0300",
            "labels": []
        },
        "_id": "68338741b7b60f751c5bf1e3",
        "summary": "Using filters as dropdowns so that PMs and PD teams can choose if they want to refine a sustainability sprint or by any other criteria",
        "priority": "Medium",
        "storyPoints": "Not assigned",
        "updated": "2025-04-17T12:10:27.809+0300",
        "labels": []
    },
    {
        "id": "10365",
        "key": "SCRUM-72",
        "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10365",
        "fields": {
            "summary": "Displaying the saved sustainability backlogs from previous analysis",
            "customfield_10016": 5,
            "issuetype": {
                "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
                "id": "10001",
                "description": "A small, distinct piece of work.",
                "iconUrl": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium",
                "name": "Task",
                "subtask": false,
                "avatarId": 10318,
                "entityId": "e2a04137-5afe-4a0b-975d-f8d340aed7b5",
                "hierarchyLevel": 0
            },
            "description": null,
            "priority": {
                "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/priority/3",
                "iconUrl": "https://elisa-dashboard.atlassian.net/images/icons/priorities/medium_new.svg",
                "name": "Medium",
                "id": "3"
            },
            "updated": "2025-05-24T14:50:14.888+0300",
            "labels": []
        },
        "_id": "68338758b7b60f751c5bf202",
        "summary": "Displaying the saved sustainability backlogs from previous analysis",
        "priority": "Medium",
        "storyPoints": 5,
        "updated": "2025-05-24T14:50:14.888+0300",
        "labels": []
    }
]