import React from "react";
import {
  Box,
  Typography,
  useTheme,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  CheckCircle,
  Error,
  Warning,
  Info,
  Link as LinkIcon,
} from "@mui/icons-material";

const Accessibility = () => {
  const theme = useTheme();

  const auditResults = {
    overall: {
      score: 85,
      status: "Good",
      color: theme.palette.success.main,
    },
    issues: [
      {
        type: "Critical",
        count: 2,
        items: [
          "Some images missing alt text",
          "Color contrast issues in dark mode",
        ],
      },
      {
        type: "Serious",
        count: 3,
        items: [
          "Missing ARIA labels on interactive elements",
          "Keyboard navigation improvements needed",
          "Form labels need better association",
        ],
      },
      {
        type: "Moderate",
        count: 4,
        items: [
          "Heading structure could be improved",
          "Some links need more descriptive text",
          "Focus indicators could be more visible",
          "Table headers need proper markup",
        ],
      },
    ],
    recommendations: [
      "Add alt text to all images",
      "Improve color contrast ratios",
      "Implement proper ARIA labels",
      "Enhance keyboard navigation",
      "Add skip navigation links",
      "Ensure proper heading hierarchy",
      "Make focus indicators more visible",
      "Add proper form labels",
    ],
  };

  const pastAudits = [
    {
      date: "2025-05-16",
      score: 93,
      status: "Excellent",
      issues: 5,
      improvements: "Improved performance, accessibility, and best practices. Fixed color contrast and alt text issues.",
    },
    {
      date: "2025-05-01",
      score: 88,
      status: "Good",
      issues: 8,
      improvements: "Enhanced keyboard navigation and added ARIA labels.",
    },
    {
      date: "2025-04-15",
      score: 80,
      status: "Fair",
      issues: 12,
      improvements: "Initial accessibility implementation and basic audit fixes.",
    },
  ];

  return (
    <Box m="2rem auto" maxWidth={700}>
      <Typography variant="h3" gutterBottom>
        Accessibility Statement
      </Typography>
      <Typography variant="body1" paragraph>
        We are committed to ensuring that our application is accessible to all users, regardless of their abilities or disabilities. We strive to adhere to the highest standards of accessibility and inclusivity, making our platform usable for everyone.
      </Typography>
      <Typography variant="body1" paragraph>
        Our team continuously works to improve the accessibility of our application by following best practices and guidelines. We regularly review our platform to identify and address any barriers that may prevent users from fully engaging with our content.
      </Typography>
      <Typography variant="body1" paragraph>
        If you encounter any issues or have suggestions on how we can improve accessibility, please reach out to us at{' '}
        <Link
          href="mailto:Tasluf.Morshed@student.lut.fi"
          underline="hover"
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.dark,
            fontWeight: 'bold',
            textDecoration: 'underline',
          }}
        >
          Tasluf.Morshed@student.lut.fi
        </Link>.
        Your feedback is invaluable in helping us create a more accessible and welcoming environment for all.
      </Typography>

      {/* Overall Score */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: theme.palette.background.alt,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Overall Accessibility Score
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: auditResults.overall.color,
              fontWeight: "bold",
            }}
          >
            {auditResults.overall.score}%
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: auditResults.overall.color,
            }}
          >
            {auditResults.overall.status}
          </Typography>
        </Box>
      </Paper>

      {/* Issues Grid */}
      <Grid container spacing={3} mb={4}>
        {auditResults.issues.map((issue) => (
          <Grid item xs={12} md={4} key={issue.type}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: "100%",
                backgroundColor: theme.palette.background.alt,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h5"
                color={
                  issue.type === "Critical"
                    ? theme.palette.error.main
                    : issue.type === "Serious"
                    ? theme.palette.warning.main
                    : theme.palette.info.main
                }
                gutterBottom
              >
                {issue.type} Issues ({issue.count})
              </Typography>
              <List>
                {issue.items.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      {issue.type === "Critical" ? (
                        <Error color="error" />
                      ) : issue.type === "Serious" ? (
                        <Warning color="warning" />
                      ) : (
                        <Info color="info" />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Recommendations */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          backgroundColor: theme.palette.background.alt,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Recommendations
        </Typography>
        <List>
          {auditResults.recommendations.map((recommendation, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText primary={recommendation} />
              </ListItem>
              {index < auditResults.recommendations.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Contact Information */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: theme.palette.background.alt,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Need Help?
        </Typography>
        <Typography variant="body1" color={theme.palette.secondary[200]}>
          For any accessibility concerns or suggestions, please contact our
          accessibility team at{" "}
          <LinkIcon
            component="a"
            href="mailto:accessibility@example.com"
            sx={{
              color: theme.palette.primary.main,
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            accessibility@example.com
          </LinkIcon>
        </Typography>
      </Box>

      {/* Latest Audit Report Section */}
      <Box mt={4}>
        <Typography variant="h4" gutterBottom color={theme.palette.primary.main}>
          Latest Audit Report
        </Typography>
        <Typography variant="body1" paragraph color={theme.palette.secondary[200]}>
          We regularly conduct accessibility audits to ensure our platform meets the highest standards. Below is a record of our most recent audits and improvements made.
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 2, backgroundColor: theme.palette.background.alt }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Issues Found</TableCell>
                <TableCell>Improvements Made</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pastAudits.map((audit, index) => (
                <TableRow key={index}>
                  <TableCell>{audit.date}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {audit.score}%
                      {audit.score >= 90 ? (
                        <CheckCircle color="success" fontSize="small" />
                      ) : (
                        <Error color="warning" fontSize="small" />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>{audit.status}</TableCell>
                  <TableCell>{audit.issues}</TableCell>
                  <TableCell>{audit.improvements}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Accessibility; 