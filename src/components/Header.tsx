import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Updated menu list with "Boookings"
  const navPages = ['Dashboard', 'Properties', 'Expenses', 'Summary', 'Bookings', 'Logout'];


  // Resolve route paths including nested one for summary
  const getPath = (page: string) =>
    page.toLowerCase() === 'summary'
      ? '/dashboard/summary'
      : `/${page.toLowerCase()}`;

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#0B2447' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Airbnb Expense Manager
        </Typography>

        {/* Desktop Buttons */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {navPages.map((page) => (
            <Button
              key={page}
              color="inherit"
              component={Link}
              to={getPath(page)}
              sx={{
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                },
              }}
            >
              {page}
            </Button>
          ))}
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {navPages.map((page) => (
              <MenuItem
                key={page}
                onClick={handleMenuClose}
                component={Link}
                to={getPath(page)}
              >
                {page}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
