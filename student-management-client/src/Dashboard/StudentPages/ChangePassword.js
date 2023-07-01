import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
export default function ChangePassword() {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <form>
            <TextField
              margin="normal"
              required
              fullWidth
              id="oldPass"
              label="Enter-Old-Password"
              name="oldPass"
              autoFocus
              // value={oldPass}
            />

            {/* <div className="password-eye"> */}
            <TextField
              margin="normal"
              className="form-field "
              fullWidth
              name="newPass"
              label="Enter-New-Password"
              // type={toggle ? 'text' : 'password'}
              // value={newPass}
              required
            />
            {/* {toggle ? (
                <i
                  id="eye"
                  className="fas fa-eye"
                  onClick={toggleVisibility}
                ></i>
              ) : (
                <i
                  className="fas fa-eye-slash"
                  id="eye"
                  onClick={toggleVisibility}
                ></i>
              )}
            </div> */}
            <TextField
              margin="normal"
              className="form-field "
              fullWidth
              name="confirmNewPass"
              label="Enter-Confirm-New-Password"
              // type={toggle ? 'text' : 'password'}
              // value={newPass}
              required
            />
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
            >
              Change Password
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
}
