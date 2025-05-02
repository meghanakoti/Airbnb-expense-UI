import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#0B2447', color: 'white', textAlign: 'center', py: 2, mt: 4 }}>
      <Typography variant="body2">
        © 2025 Airbnb Expense Management System
      </Typography>
    </Box>
  );
};

export default Footer;