import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import ProjectDashborad from './ProjectDashborad';
import Dashboard from './Dashboard';

function DashboardIndex() {
  const { projectKey } = useParams();

  if (projectKey) {
    return <ProjectDashborad projectKey={projectKey} />;
  } else {
    return <Dashboard />;
  }
}

export default DashboardIndex;
