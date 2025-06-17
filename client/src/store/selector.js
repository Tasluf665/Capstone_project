import {atom} from 'nanostores';

/**{
    "id": "10000",
    "key": "SCRUM",
    "name": "Elisa Visualization Dashboard",
    "tasks": []
} 
    
// tasks structure:
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
}

*/

const initialState = []

export const $sustainabilityBacklog = atom([...initialState]);
export const $currentProjectId = atom(null);

export const setCurrentProjectId = (projectId) => {
    $currentProjectId.set(projectId);
}

/*export const setSustainabilityBacklog = (sustainabilityBacklog) => {
    $sustainabilityBacklog.set({...$sustainabilityBacklog.get(), ...sustainabilityBacklog});
}*/

export const addSustainabilityBacklog = (sustainabilityBacklog) => {
    const currentState = $sustainabilityBacklog.get();
    const exists = currentState.some(item => item.id === sustainabilityBacklog.id);
    if (!exists) {
        $sustainabilityBacklog.set([...currentState, sustainabilityBacklog]);
    }
}

export const addTaskToSustainabilityBacklog = (task, projectID) => {
    const currentState = $sustainabilityBacklog.get();
    const projectIndex = currentState.findIndex(item => item.id === projectID);
    if (projectIndex !== -1) {
        const updatedProject = {
            ...currentState[projectIndex],
            tasks: [...currentState[projectIndex].tasks, task]
        };
        const updatedState = [
            ...currentState.slice(0, projectIndex),
            updatedProject,
            ...currentState.slice(projectIndex + 1)
        ];
        $sustainabilityBacklog.set(updatedState);
    }
}

export const removeTaskFromSustainabilityBacklog = (taskID, projectID) => {
    const currentState = $sustainabilityBacklog.get();
    const projectIndex = currentState.findIndex(item => item.id === projectID);
    if (projectIndex !== -1) {
        const updatedProject = {
            ...currentState[projectIndex],
            tasks: currentState[projectIndex].tasks.filter(task => task.id !== taskID)
        };
        const updatedState = [
            ...currentState.slice(0, projectIndex),
            updatedProject,
            ...currentState.slice(projectIndex + 1)
        ];
        $sustainabilityBacklog.set(updatedState);
    }
}

export const resetSustainabilityBacklog = () => {
    $sustainabilityBacklog.set(initialState);
}