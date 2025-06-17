import React from "react";
import { Box, Typography, Link, useTheme } from "@mui/material";

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: 3,
        px: 2,
        mt: 6,
        bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.grey[100],
        borderTop: `1px solid ${theme.palette.divider}`,
        textAlign: 'center',
        boxShadow: theme.palette.mode === 'dark' ? '0 -2px 8px rgba(0,0,0,0.2)' : '0 -2px 8px rgba(0,0,0,0.05)',
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          color: theme.palette.text.primary,
          fontWeight: 600,
          mb: 1,
        }}
      >
        Accessibility Statement
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          maxWidth: 700,
          mx: 'auto',
          lineHeight: 1.7,
        }}
      >
        We are committed to making our application accessible and inclusive for everyone. If you encounter any barriers or have suggestions, please reach out to us at{' '}
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
        <br />
        <Link
          href="/accessibility"
          underline="hover"
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.dark,
            fontWeight: 'bold',
            textDecoration: 'underline',
          }}
        >
          Read More
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer; 