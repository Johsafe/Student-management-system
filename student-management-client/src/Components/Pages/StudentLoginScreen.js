import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HeaderBar from '../Layout/HeaderBar';
import { toast } from 'react-toastify';
import { getError } from '../../Utils/GetError';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Copyright from '../../Utils/Copyright';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Helmet } from 'react-helmet-async';

const theme = createTheme();

export default function StudentLoginScreen() {
  const [admission, setAdmission] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [toggle, setToggle] = React.useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleVisibility = () => {
    setToggle(!toggle);
  };

  const loginForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:8000/system/student/login',
        {
          admission,
          password,
        }
      );
      localStorage.setItem('Details', JSON.stringify(data));
      navigate('/profile');
      toast.success('Student Logged Successfully');
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <HeaderBar />
      <Container component="main" maxWidth="xs">
        <Helmet>
          <title>Student Page</title>
        </Helmet>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <div>
            <h6>Auth [ pass : student@123]</h6>
          </div>

          <form onSubmit={loginForm}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="admission"
              label="Admission"
              name="email"
              autoFocus
              value={admission}
              onChange={(e) => setAdmission(e.target.value)}
            />

            <div className="password-eye">
              <TextField
                margin="normal"
                className="form-field "
                fullWidth
                name="password"
                label="Password"
                type={toggle ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              {toggle ? (
                <i id="eye" className="fas fa-eye" onClick={toggleVisibility}>
                  <VisibilityOffOutlinedIcon />
                </i>
              ) : (
                <i
                  className="fas fa-eye-slash"
                  id="eye"
                  onClick={toggleVisibility}
                >
                  <VisibilityOutlinedIcon />
                </i>
              )}
            </div>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </form>
        </Box>
        <Container
          maxWidth="md"
          component="footer"
          sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            mt: 2,
            py: [1, 4],
          }}
        >
          <Copyright />
        </Container>
      </Container>
    </ThemeProvider>
  );
}
