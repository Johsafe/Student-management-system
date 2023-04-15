import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pageerror from './../Static/pageerror.png';
import error from './../Static/error.png';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        Johsafe
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function PageError() {
  let navigate = useNavigate();
  return (
    <div>
      <div>
        <div className="Error" style={{ gap: '4rem' }}>
          <div className="ErrorImg">
            <img src={pageerror} alt="Error" />
          </div>

          <div className="ErrorTxt">
            <img style={{ width: '15rem' }} src={error} alt="Error" />
            <h1>Ooops!</h1>
            <h2>Page Not Found</h2>
            <p>Sorry !!! We could not find what you are looking for.</p>

            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                navigate('/');
              }}
            >
              Go To HomePage
            </Button>
          </div>
        </div>
        <Copyright />
      </div>
    </div>
  );
}
