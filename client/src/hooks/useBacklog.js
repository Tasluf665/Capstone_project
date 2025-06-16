import { useState, useEffect } from 'react';
import axios from 'axios';

const useBacklog = (authenticated, projectKey) => {
    const [userProjects, setUserProjects] = useState([]);
    const [jiraProjects, setJiraProjects] = useState([]);
    const [backlog, setBacklog] = useState([]);
    const [errorStates, setErrorStates] = useState({
        userProjects: null,
        selectedProject: null,
        jiraProjects: null,
        backlog: null
    });
    const [loadingStates, setLoadingStates] = useState({
        userProjects: false,
        selectedProject: false,
        jiraProjects: false,
        backlog: false
    });
    const [selectedProject, setSelectedProject] = useState(null);

    // Helper function to update loading state
    const setLoadingState = (key, value) => {
        setLoadingStates(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Helper function to update error state
    const setErrorState = (key, value) => {
        setErrorStates(prev => ({
            ...prev,
            [key]: value
        }));
    };

    useEffect(() => {
        if (authenticated) {
            const fetchAllProjects = async () => {
                setLoadingState('userProjects', true);
                setErrorState('userProjects', null);
                try {
                    const response = await axios.get(
                        `${process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"}/api/project/`,
                        { withCredentials: true }
                    );
                    setUserProjects(response.data);
                } catch (err) {
                    setErrorState('userProjects', err.response?.data?.error || 'Error fetching projects');
                } finally {
                    setLoadingState('userProjects', false);
                }
            };
            fetchAllProjects();
        }
    }, [authenticated]);

    useEffect(() => {
        if (authenticated && projectKey) {
            const fetchProject = async () => {
                setLoadingState('selectedProject', true);
                setErrorState('selectedProject', null);
                try {
                    const response = await axios.get(
                        `${process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"}/api/project/key/${projectKey}`,
                        { withCredentials: true }
                    );
                    setSelectedProject(response.data);
                } catch (err) {
                    setErrorState('selectedProject', err.response?.data?.error || 'Error fetching project');
                } finally {
                    setLoadingState('selectedProject', false);
                }
            };
            fetchProject();
        }
    }, [authenticated, projectKey]);

    useEffect(() => {
        if (authenticated) {
            const fetchProjects = async () => {
                setLoadingState('jiraProjects', true);
                setErrorState('jiraProjects', null);
                try {
                    const response = await axios.get(
                        `${process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"}/api/backlog/projects`,
                        { withCredentials: true }
                    );
                    setJiraProjects(response.data.projects);
                } catch (err) {
                    setErrorState('jiraProjects', err.response?.data?.error || 'Error fetching projects');
                } finally {
                    setLoadingState('jiraProjects', false);
                }
            };
            fetchProjects();
        }
    }, [authenticated]);

    useEffect(() => {
        if (authenticated && projectKey) {
            const fetchBacklog = async () => {
                setLoadingState('backlog', true);
                setErrorState('backlog', null);
                try {
                    const response = await axios.get(
                        `${process.env.REACT_APP_BACKEND_URL || "http://localhost:3001"}/api/backlog?project=${projectKey}`,
                        { withCredentials: true }
                    );
                    if (!response.data?.issues) throw new Error('Invalid response format');
                    console.log("response.data", response.data);
                    setBacklog(response.data.issues);
                } catch (err) {
                    setErrorState('backlog', err.response?.data?.error || 'Error fetching backlog');
                } finally {
                    setLoadingState('backlog', false);
                }
            };
            fetchBacklog();
        }
    }, [authenticated, projectKey]);

    // Compute overall loading state
    const loading = Object.values(loadingStates).some(state => state === true);

    // Compute overall error state
    const error = Object.values(errorStates).find(state => state !== null) || null;

    return {
        jiraProjects,
        userProjects,
        backlog,
        setBacklog,
        error,
        errorStates,
        loading,
        loadingStates,
        selectedProject
    };
};

export default useBacklog;