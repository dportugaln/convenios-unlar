import React, {  useState } from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Container
} from '@mui/material';
import UnlarImg from '../../assets/images/unlar.jpg'


const DashboardLayout = () => {
  useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar sx={{ background: '#1d5b96' }} position="absolute">
        <Toolbar sx={{
          pr: '24px',
        }}
        >


          <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              PACTO - UNLaR
            </Typography>
          </RouterLink>

        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          background: `url(${UnlarImg}) center/cover fixed no-repeat`,
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}

export default DashboardLayout;