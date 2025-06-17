const express = require('express');
const router = express.Router();

// Mock data for the dashboard
const mockDashboardData = {
  totalProjects: 12,
  carbonReduction: "2,500 kg",
  monthlyImpact: "85%",
  yearlyImpact: "92%",
  projects: [
    {
      _id: "1",
      projectName: "Solar Panel Installation",
      createdAt: "2024-03-01",
      impactScore: "High",
      status: "In Progress"
    },
    {
      _id: "2",
      projectName: "Waste Management System",
      createdAt: "2024-03-05",
      impactScore: "Medium",
      status: "Planning"
    },
    {
      _id: "3",
      projectName: "Energy Efficiency Audit",
      createdAt: "2024-03-10",
      impactScore: "High",
      status: "Completed"
    }
  ],
  impactByCategory: {
    "Energy": 35,
    "Waste": 25,
    "Water": 20,
    "Transport": 20
  }
};

// Route to get dashboard data
router.get('/', (req, res) => {
  res.json(mockDashboardData);
});

// Route to download sustainability report
router.get('/download-report', (req, res) => {
  // Create a CSV string with the dashboard data
  const csvData = [
    ['Project Name', 'Created At', 'Impact Score', 'Status'],
    ...mockDashboardData.projects.map(project => [
      project.projectName,
      project.createdAt,
      project.impactScore,
      project.status
    ])
  ].map(row => row.join(',')).join('\n');

  // Set headers for file download
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=sustainability-report.csv');
  
  // Send the CSV data
  res.send(csvData);
});

module.exports = router; 