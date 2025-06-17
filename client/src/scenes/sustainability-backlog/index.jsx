
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ProjectListPage from './ProjectListPage';
import ProjectSelectionPage from './ProjectSelectionPage';
import SustainabilityBacklog from './SustainabilityBacklog';

function SustainabilityBacklogIndex() {
  const { projectKey } = useParams();

  if (projectKey) {
    return <SustainabilityBacklog projectKey={projectKey} />;
  } else if (window.location.pathname === '/sustainability-backlog/create-new') {
    return <ProjectSelectionPage />;
  } else {
    return <ProjectListPage />;
  }
}

export default SustainabilityBacklogIndex;
