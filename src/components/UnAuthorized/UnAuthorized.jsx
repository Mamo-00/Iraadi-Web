import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const UnAuthorized = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Typography variant="h1" component="div" gutterBottom>
        403
      </Typography>
      <Typography variant="h4" gutterBottom>
        Oops! You're not authorized to view this page.
      </Typography>
      <Typography variant="body1">
        You do not have the necessary permissions to view this page. Please contact the site administrator if you believe this is an error.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/" sx={{ mt: 3 }}>
        Go to Home Page
      </Button>
    </Box>
  );
};

export default UnAuthorized;
