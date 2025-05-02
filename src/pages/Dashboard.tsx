import React from 'react';
import { Typography, Box } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        mt: 2,
      }}
    >
      <Typography variant="h4">(Coming Soon)</Typography>
    </Box>
  );
};

export default Dashboard;
