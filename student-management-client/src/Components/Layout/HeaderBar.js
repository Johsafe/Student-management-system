import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import logo from '../../Static/logo.png';
import { Link } from 'react-router-dom';

function HeaderBar() {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
           <Link to='/'><img src={logo} alt="Exam Hall" style={{ width: '6rem' ,marginLeft:'2rem' }} /></Link> 
          </Typography>

          <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Admin
          </Button>
          <Button href="/studentlogin" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Student
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default function Pricing() {
  return <HeaderBar />;
}
