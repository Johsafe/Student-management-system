import React from 'react';
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
import Copyright from '../../Utils/Copyright';
import axios from 'axios';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { Helmet } from 'react-helmet-async';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
const theme = createTheme();

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [toggle, setToggle] = React.useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setToggle(!toggle);
  };

  const loginForm = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:8000/system/authenicate/login',
        {
          email,
          password,
        }
      );
      localStorage.setItem('Info', JSON.stringify(data));
      navigate('/dashboard');
      toast.success('Logged Successfully');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <HeaderBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Helmet>
          <title>Admin Page</title>
        </Helmet>
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
            <h6>Auth [ pass : passwd@123]</h6>
          </div>

          <form>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
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
                <i id="eye" onClick={toggleVisibility}>
                  <VisibilityOffOutlinedIcon />
                </i>
              ) : (
                <i id="eye" onClick={toggleVisibility}>
                  <VisibilityOutlinedIcon />
                </i>
              )}
            </div>
            <Button
              fullWidth
              variant="contained"
              onClick={loginForm}
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
