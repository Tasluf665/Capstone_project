import { atom } from "nanostores";

const initialState = {
  projects: [],
  storyPoints: null,
};

/* expected data 
{
  "projects": [
    {
      "projectKey": "SCRUM",
      "projectName": "Elisa Visualization Dashboard",
      "issues": [
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10373",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10373",
          "key": "SCRUM-80",
          "fields": {
            "summary": "Social sustainability section",
            "customfield_10016": null,
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
              "id": "10001",
              "description": "Tasks track small, distinct pieces of work.",
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
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10366",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10366",
          "key": "SCRUM-73",
          "fields": {
            "customfield_10016": null,
            "summary": "Refine the General Backlog Items that can be dragged to complement the sustainability backlog so that the same PBIs are not shown twice",
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
              "id": "10001",
              "description": "Tasks track small, distinct pieces of work.",
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
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10365",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10365",
          "key": "SCRUM-72",
          "fields": {
            "summary": "Displaying the saved sustainability backlogs from previous analysis",
            "customfield_10016": 5,
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
              "id": "10001",
              "description": "Tasks track small, distinct pieces of work.",
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
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10364",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10364",
          "key": "SCRUM-71",
          "fields": {
            "summary": "Using filters as dropdowns so that PMs and PD teams can choose if they want to refine a sustainability sprint or by any other criteria",
            "customfield_10016": null,
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
              "id": "10001",
              "description": "Tasks track small, distinct pieces of work.",
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
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10363",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10363",
          "key": "SCRUM-70",
          "fields": {
            "summary": "Save the sustainability backlog with the refined PBIs in Mongo",
            "customfield_10016": null,
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
              "id": "10001",
              "description": "Tasks track small, distinct pieces of work.",
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
            "updated": "2025-05-19T01:22:43.310+0300",
            "labels": []
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10336",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10336",
          "key": "SCRUM-66",
          "fields": {
            "summary": "Displaying Sustainability Best Practices",
            "customfield_10016": 8,
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
              "id": "10001",
              "description": "Tasks track small, distinct pieces of work.",
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
            "updated": "2025-04-16T12:38:10.127+0300",
            "labels": []
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10335",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10335",
          "key": "SCRUM-65",
          "fields": {
            "customfield_10016": 3,
            "summary": "Updating Sustainability Guidelines",
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
              "id": "10001",
              "description": "Tasks track small, distinct pieces of work.",
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
            "updated": "2025-04-16T12:37:58.978+0300",
            "labels": []
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10334",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10334",
          "key": "SCRUM-64",
          "fields": {
            "customfield_10016": 3,
            "summary": "Accessing Sustainability Guidelines",
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
              "id": "10001",
              "description": "Tasks track small, distinct pieces of work.",
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
            "updated": "2025-04-16T12:37:55.128+0300",
            "labels": []
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10332",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10332",
          "key": "SCRUM-62",
          "fields": {
            "summary": "Generate reports on sustainability efforts to monitor progress and share data with stakeholders.",
            "customfield_10016": 8,
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
              "id": "10001",
              "description": "Tasks track small, distinct pieces of work.",
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
                      "text": "As a product manager, I want to generate detailed reports on sustainability efforts (such as energy efficiency improvements and carbon footprint reduction) so that I can share these reports with internal and external stakeholders to keep everyone informed about progress."
                    }
                  ]
                },
                {
                  "type": "paragraph",
                  "content": [
                    {
                      "type": "text",
                      "text": "DoD",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": ":"
                    }
                  ]
                },
                {
                  "type": "bulletList",
                  "content": [
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "Report templates are available for generating sustainability reports."
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "Reports can be generated for any selected time range (weekly, monthly, quarterly)."
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "Reports can be exported in CSV or PDF formats."
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "Reports include relevant data points such as energy savings, carbon reduction, and product sustainability metrics."
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "priority": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/priority/3",
              "iconUrl": "https://elisa-dashboard.atlassian.net/images/icons/priorities/medium_new.svg",
              "name": "Medium",
              "id": "3"
            },
            "updated": "2025-04-16T12:37:47.349+0300",
            "labels": []
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10301",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10301",
          "key": "SCRUM-57",
          "fields": {
            "summary": "Collecting and displaying the storypoints for the sustainability backlog",
            "customfield_10016": 8,
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
              "id": "10001",
              "description": "Tasks track small, distinct pieces of work.",
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
            "updated": "2025-04-17T12:08:19.459+0300",
            "labels": []
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10300",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10300",
          "key": "SCRUM-56",
          "fields": {
            "summary": "Drag and drop for sustainability product backlog",
            "customfield_10016": 8,
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
              "id": "10001",
              "description": "Tasks track small, distinct pieces of work.",
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
            "updated": "2025-04-17T12:08:16.661+0300",
            "labels": []
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10299",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10299",
          "key": "SCRUM-55",
          "fields": {
            "summary": "JQL Filtering",
            "customfield_10016": 8,
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
              "id": "10001",
              "description": "Tasks track small, distinct pieces of work.",
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
                      "text": "Suggest 4-5 sustainable keywords for JQL filtering. User can add and delete more keywords. "
                    }
                  ]
                }
              ]
            },
            "priority": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/priority/3",
              "iconUrl": "https://elisa-dashboard.atlassian.net/images/icons/priorities/medium_new.svg",
              "name": "Medium",
              "id": "3"
            },
            "updated": "2025-04-17T12:08:14.060+0300",
            "labels": []
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10141",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10141",
          "key": "SCRUM-41",
          "fields": {
            "summary": "Integrating with Existing Tools for Automatic Data Updates",
            "customfield_10016": 13,
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
              "id": "10001",
              "description": "Tasks track small, distinct pieces of work.",
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
                      "text": "As a developer,"
                    },
                    {
                      "type": "hardBreak"
                    },
                    {
                      "type": "text",
                      "text": "I want to integrate the sustainability tracking dashboard with existing tools like Jira"
                    },
                    {
                      "type": "hardBreak"
                    },
                    {
                      "type": "text",
                      "text": "So that the data can be automatically updated across systems and reduce the need for manual input, ensuring data consistency."
                    }
                  ]
                },
                {
                  "type": "paragraph",
                  "content": [
                    {
                      "type": "text",
                      "text": "Acceptance Criteria:"
                    },
                    {
                      "type": "hardBreak"
                    },
                    {
                      "type": "text",
                      "text": "\t•\tThe dashboard integrates seamlessly with existing Elisa tools such as Jira"
                    },
                    {
                      "type": "hardBreak"
                    },
                    {
                      "type": "text",
                      "text": "\t•\tData logged in the sustainability tool is automatically synced with these systems in real-time."
                    },
                    {
                      "type": "hardBreak"
                    },
                    {
                      "type": "text",
                      "text": "\t•\tSingle Sign-On (SSO) is implemented for secure and easy access across tools without multiple logins."
                    }
                  ]
                }
              ]
            },
            "priority": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/priority/3",
              "iconUrl": "https://elisa-dashboard.atlassian.net/images/icons/priorities/medium_new.svg",
              "name": "Medium",
              "id": "3"
            },
            "updated": "2025-04-17T12:08:28.704+0300",
            "labels": []
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10140",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10140",
          "key": "SCRUM-40",
          "fields": {
            "customfield_10016": 13,
            "summary": "Ensuring Accurate Sustainability Data Collection",
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
              "id": "10001",
              "description": "Tasks track small, distinct pieces of work.",
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
                      "text": "As a",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": " business analyst,"
                    },
                    {
                      "type": "hardBreak"
                    },
                    {
                      "type": "text",
                      "text": "I want",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": " the system to capture "
                    },
                    {
                      "type": "text",
                      "text": "relevant sustainability data",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": " like "
                    },
                    {
                      "type": "text",
                      "text": "energy savings",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": " and "
                    },
                    {
                      "type": "text",
                      "text": "CO2 reduction",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": " for each product,"
                    },
                    {
                      "type": "hardBreak"
                    },
                    {
                      "type": "text",
                      "text": "I want to generate accurate reports for management and ensure that the data supports our sustainability goals and compliance requirements."
                    }
                  ]
                },
                {
                  "type": "heading",
                  "attrs": {
                    "level": 4
                  },
                  "content": [
                    {
                      "type": "text",
                      "text": "Acceptance Criteria:",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "bulletList",
                  "content": [
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "The system "
                            },
                            {
                              "type": "text",
                              "text": "captures key metrics",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": ": "
                            },
                            {
                              "type": "text",
                              "text": "energy savings",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": ", "
                            },
                            {
                              "type": "text",
                              "text": "CO2 reduction",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": ", "
                            },
                            {
                              "type": "text",
                              "text": "cost",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": ", and "
                            },
                            {
                              "type": "text",
                              "text": "time spent",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": " for each product."
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "Each metric is tracked and stored in a "
                            },
                            {
                              "type": "text",
                              "text": "centralized database",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": "."
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "priority": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/priority/3",
              "iconUrl": "https://elisa-dashboard.atlassian.net/images/icons/priorities/medium_new.svg",
              "name": "Medium",
              "id": "3"
            },
            "updated": "2025-04-16T12:37:29.711+0300",
            "labels": []
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10138",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10138",
          "key": "SCRUM-38",
          "fields": {
            "customfield_10016": 13,
            "summary": "Carbon Footprint Tracking for Sustainability Efforts",
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
              "id": "10001",
              "description": "Tasks track small, distinct pieces of work.",
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
                      "text": "As a",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": " Corporate and Social Responsibility Team member/Product manager,"
                    },
                    {
                      "type": "hardBreak"
                    },
                    {
                      "type": "text",
                      "text": "I want",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": " to track the "
                    },
                    {
                      "type": "text",
                      "text": "carbon footprint",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": " of each product over time,"
                    },
                    {
                      "type": "hardBreak"
                    },
                    {
                      "type": "text",
                      "text": "So that",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": " I can evaluate the environmental impact of our products and assess whether sustainability efforts are resulting in meaningful reductions in emissions."
                    }
                  ]
                },
                {
                  "type": "heading",
                  "attrs": {
                    "level": 4
                  },
                  "content": [
                    {
                      "type": "text",
                      "text": "Acceptance Criteria:",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "orderedList",
                  "attrs": {
                    "order": 1
                  },
                  "content": [
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "The dashboard shows a user-friendly"
                            },
                            {
                              "type": "text",
                              "text": " graph",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": " representing the "
                            },
                            {
                              "type": "text",
                              "text": "carbon footprint",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": " for each product (Product A, Product B, Product C) over a 12-month period based on the Carbon Footprint registration on Google Cloud."
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "The graph provides "
                            },
                            {
                              "type": "text",
                              "text": "monthly data ",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": "to track the "
                            },
                            {
                              "type": "text",
                              "text": "carbon footprint",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": " trends for each product."
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "Users can easily compare the "
                            },
                            {
                              "type": "text",
                              "text": "carbon footprint",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": " across "
                            },
                            {
                              "type": "text",
                              "text": "different products",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": " and identify peaks or reductions in carbon emissions."
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "mediaSingle",
                  "attrs": {
                    "layout": "align-start"
                  },
                  "content": [
                    {
                      "type": "media",
                      "attrs": {
                        "type": "file",
                        "id": "4c49bfbd-daf7-42fb-95bd-7be12d769bc3",
                        "alt": "image-20250325-091500.png",
                        "collection": "",
                        "height": 820,
                        "width": 1300
                      }
                    }
                  ]
                }
              ]
            },
            "priority": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/priority/3",
              "iconUrl": "https://elisa-dashboard.atlassian.net/images/icons/priorities/medium_new.svg",
              "name": "Medium",
              "id": "3"
            },
            "updated": "2025-04-16T12:37:22.679+0300",
            "labels": []
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10137",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10137",
          "key": "SCRUM-37",
          "fields": {
            "summary": "Time Tracking for Sustainability Efforts",
            "customfield_10016": 8,
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
              "id": "10001",
              "description": "Tasks track small, distinct pieces of work.",
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
                      "text": "As a",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": " product manager,"
                    },
                    {
                      "type": "hardBreak"
                    },
                    {
                      "type": "text",
                      "text": "I want",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": " to track the "
                    },
                    {
                      "type": "text",
                      "text": "time",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": " spent by each team on sustainability efforts for each product,"
                    },
                    {
                      "type": "hardBreak"
                    },
                    {
                      "type": "text",
                      "text": "So that",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": " I can measure team productivity, evaluate effort allocation, and identify areas where additional resources might be needed."
                    }
                  ]
                },
                {
                  "type": "heading",
                  "attrs": {
                    "level": 4
                  },
                  "content": [
                    {
                      "type": "text",
                      "text": "Acceptance Criteria:",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "orderedList",
                  "attrs": {
                    "order": 1
                  },
                  "content": [
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "The dashboard displays a "
                            },
                            {
                              "type": "text",
                              "text": "bar chart",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": " showing the "
                            },
                            {
                              "type": "text",
                              "text": "time",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": " each team (Team A, Team B, Team C) spends on sustainability efforts for each product."
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "The "
                            },
                            {
                              "type": "text",
                              "text": "time data",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": " is visualized for "
                            },
                            {
                              "type": "text",
                              "text": "each product",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": ", allowing comparisons of how much time was allocated to each product per month."
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "Time spent on efforts is "
                            },
                            {
                              "type": "text",
                              "text": "updated in real-time",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": "."
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "Users can filter or select specific periods (e.g., monthly, quarterly) for better analysis."
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "mediaSingle",
                  "attrs": {
                    "layout": "align-start"
                  },
                  "content": [
                    {
                      "type": "media",
                      "attrs": {
                        "type": "file",
                        "id": "7734174e-831e-418b-9cd0-6c0321b42a23",
                        "alt": "image-20250325-091423.png",
                        "collection": "",
                        "height": 820,
                        "width": 1300
                      }
                    }
                  ]
                }
              ]
            },
            "priority": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/priority/3",
              "iconUrl": "https://elisa-dashboard.atlassian.net/images/icons/priorities/medium_new.svg",
              "name": "Medium",
              "id": "3"
            },
            "updated": "2025-04-16T12:37:15.453+0300",
            "labels": []
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10136",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10136",
          "key": "SCRUM-36",
          "fields": {
            "summary": "Story point Tracking for Sustainability Efforts",
            "customfield_10016": 8,
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
              "id": "10001",
              "description": "Tasks track small, distinct pieces of work.",
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
                      "text": "As a",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": " product manager,"
                    },
                    {
                      "type": "hardBreak"
                    },
                    {
                      "type": "text",
                      "text": "I want",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": " to track the "
                    },
                    {
                      "type": "text",
                      "text": "story points",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": " associated with sustainability efforts for each product,"
                    },
                    {
                      "type": "hardBreak"
                    },
                    {
                      "type": "text",
                      "text": "So that",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": " I can monitor and compare the financial investment in sustainability initiatives across different products and teams."
                    }
                  ]
                },
                {
                  "type": "heading",
                  "attrs": {
                    "level": 4
                  },
                  "content": [
                    {
                      "type": "text",
                      "text": "Acceptance Criteria:",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "orderedList",
                  "attrs": {
                    "order": 1
                  },
                  "content": [
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "The dashboard displays a "
                            },
                            {
                              "type": "text",
                              "text": "bar chart",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": " showing each product's cost spent on sustainability efforts (Product A, Product B, Product C)."
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "Data points",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": " show monthly cost breakdowns for each product."
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "Users can compare the "
                            },
                            {
                              "type": "text",
                              "text": "story points",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": " across "
                            },
                            {
                              "type": "text",
                              "text": "different teams",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": " working on the same product."
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "The "
                            },
                            {
                              "type": "text",
                              "text": "story points data",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": " is updated in "
                            },
                            {
                              "type": "text",
                              "text": "real time",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": " as new entries are logged by teams"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "mediaSingle",
                  "attrs": {
                    "layout": "align-start"
                  },
                  "content": [
                    {
                      "type": "media",
                      "attrs": {
                        "type": "file",
                        "id": "c6c66bac-a39e-4f2c-9e90-cf0688141088",
                        "alt": "image-20250325-091405.png",
                        "collection": "",
                        "height": 820,
                        "width": 1300
                      }
                    }
                  ]
                }
              ]
            },
            "priority": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/priority/3",
              "iconUrl": "https://elisa-dashboard.atlassian.net/images/icons/priorities/medium_new.svg",
              "name": "Medium",
              "id": "3"
            },
            "updated": "2025-04-17T12:08:25.858+0300",
            "labels": []
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10135",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10135",
          "key": "SCRUM-35",
          "fields": {
            "summary": "Energy efficiency and sustainability guidelines",
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10004",
              "id": "10004",
              "description": "Epics track collections of related bugs, stories, and tasks.",
              "iconUrl": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium",
              "name": "Epic",
              "subtask": false,
              "avatarId": 10307,
              "entityId": "7fd67bd4-e2e4-457e-b5bc-6e7cad74c06b",
              "hierarchyLevel": 1
            },
            "description": null,
            "priority": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/priority/3",
              "iconUrl": "https://elisa-dashboard.atlassian.net/images/icons/priorities/medium_new.svg",
              "name": "Medium",
              "id": "3"
            },
            "updated": "2025-04-08T10:24:19.120+0300",
            "labels": []
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10134",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10134",
          "key": "SCRUM-34",
          "fields": {
            "summary": "Reporting and analytics",
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10004",
              "id": "10004",
              "description": "Epics track collections of related bugs, stories, and tasks.",
              "iconUrl": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium",
              "name": "Epic",
              "subtask": false,
              "avatarId": 10307,
              "entityId": "7fd67bd4-e2e4-457e-b5bc-6e7cad74c06b",
              "hierarchyLevel": 1
            },
            "description": {
              "type": "doc",
              "version": 1,
              "content": [
                {
                  "type": "bulletList",
                  "content": [
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "As a "
                            },
                            {
                              "type": "text",
                              "text": "business analyst",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": ", I want to generate PDF reports summarizing sustainability metrics so that I can share them with top management."
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "As a "
                            },
                            {
                              "type": "text",
                              "text": "regulatory authority",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": ", I want to access downloadable CSV files of sustainability data to ensure compliance with industry standards."
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "As a "
                            },
                            {
                              "type": "text",
                              "text": "product manager",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": ", I want to export data from the dashboard to analyze the long-term sustainability trends."
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "priority": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/priority/3",
              "iconUrl": "https://elisa-dashboard.atlassian.net/images/icons/priorities/medium_new.svg",
              "name": "Medium",
              "id": "3"
            },
            "updated": "2025-04-08T10:22:30.272+0300",
            "labels": []
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10133",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10133",
          "key": "SCRUM-33",
          "fields": {
            "summary": "Sustainability efforts data collection ",
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10004",
              "id": "10004",
              "description": "Epics track collections of related bugs, stories, and tasks.",
              "iconUrl": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium",
              "name": "Epic",
              "subtask": false,
              "avatarId": 10307,
              "entityId": "7fd67bd4-e2e4-457e-b5bc-6e7cad74c06b",
              "hierarchyLevel": 1
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
                      "text": "Goal",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": ": Implement a system for collecting and tracking sustainability data across product teams."
                    }
                  ]
                },
                {
                  "type": "paragraph",
                  "content": [
                    {
                      "type": "text",
                      "text": "User Stories",
                      "marks": [
                        {
                          "type": "strong"
                        }
                      ]
                    },
                    {
                      "type": "text",
                      "text": ":"
                    }
                  ]
                },
                {
                  "type": "orderedList",
                  "attrs": {
                    "order": 1
                  },
                  "content": [
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "As a "
                            },
                            {
                              "type": "text",
                              "text": "product team member",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": ", I want to log energy efficiency improvements for my product so that I can track our sustainability efforts."
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "As a "
                            },
                            {
                              "type": "text",
                              "text": "business analyst",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": ", I want to ensure the system captures relevant sustainability data like energy savings and CO2 reduction for accurate reporting."
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "As a "
                            },
                            {
                              "type": "text",
                              "text": "developer",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": ", I want to integrate the dashboard with existing tools so that the data can be automatically updated."
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "priority": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/priority/3",
              "iconUrl": "https://elisa-dashboard.atlassian.net/images/icons/priorities/medium_new.svg",
              "name": "Medium",
              "id": "3"
            },
            "updated": "2025-03-25T10:56:23.713+0200",
            "labels": []
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10132",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10132",
          "key": "SCRUM-32",
          "fields": {
            "summary": "Effort data visualization",
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10004",
              "id": "10004",
              "description": "Epics track collections of related bugs, stories, and tasks.",
              "iconUrl": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/2/universal_avatar/view/type/issuetype/avatar/10307?size=medium",
              "name": "Epic",
              "subtask": false,
              "avatarId": 10307,
              "entityId": "7fd67bd4-e2e4-457e-b5bc-6e7cad74c06b",
              "hierarchyLevel": 1
            },
            "description": {
              "type": "doc",
              "version": 1,
              "content": [
                {
                  "type": "bulletList",
                  "content": [
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "As a "
                            },
                            {
                              "type": "text",
                              "text": "product manager",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": ", I want to view real-time sustainability metrics so that I can monitor our team's progress."
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "type": "listItem",
                      "content": [
                        {
                          "type": "paragraph",
                          "content": [
                            {
                              "type": "text",
                              "text": "As a "
                            },
                            {
                              "type": "text",
                              "text": "C-suite executive",
                              "marks": [
                                {
                                  "type": "strong"
                                }
                              ]
                            },
                            {
                              "type": "text",
                              "text": ", I want to have a high-level view of sustainability efforts across teams so that I can make informed strategic decisions."
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "priority": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/priority/3",
              "iconUrl": "https://elisa-dashboard.atlassian.net/images/icons/priorities/medium_new.svg",
              "name": "Medium",
              "id": "3"
            },
            "updated": "2025-04-08T10:23:44.613+0300",
            "labels": []
          }
        },
        {
          "expand": "operations,versionedRepresentations,editmeta,changelog,renderedFields",
          "id": "10002",
          "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issue/10002",
          "key": "SCRUM-3",
          "fields": {
            "summary": "Weekly continuous research for sustainability metrics related to energy efficiency after feedback.",
            "customfield_10016": 2,
            "issuetype": {
              "self": "https://api.atlassian.com/ex/jira/0b5b0a70-71d9-4c9e-b56f-213ec49bf8bd/rest/api/3/issuetype/10001",
              "id": "10001",
              "description": "Tasks track small, distinct pieces of work.",
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
          }
        }
      ],
      "ProjectStoryPoints": 108,
      "activePoints": 7
    },
    {
      "projectKey": "TP",
      "projectName": "Testing Project",
      "issues": [],
      "ProjectStoryPoints": 0,
      "activePoints": 0
    }
  ],
  "storyPoints": 108
}

*/

export const $storyPoints = atom({ ...initialState });

export const setStoryPoints = (storyPoints) => {
  $storyPoints.set({ ...$storyPoints.get(), ...storyPoints });
};

export const increaseActiveStoryPoints = (key, storyPoints) => {
  const { projects, ...rest } = $storyPoints.get();
  $storyPoints.set({
    ...rest,
    projects: projects.map((project) =>
      project.projectKey === key
        ? { ...project, activePoints: project.activePoints + storyPoints }
        : project
    ),
  });
};
