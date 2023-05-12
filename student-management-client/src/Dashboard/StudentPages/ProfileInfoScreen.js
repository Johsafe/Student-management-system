import {
  Button,
  Card,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import profile from '../../Static/profile.png';
import Copyright from '../../Utils/Copyright';

export default function ProfileInfoScreen() {
  let user = JSON.parse(localStorage.getItem('Details'));
  const [loading, setLoading] = useState(false);

  const signoutHandler = () => {
    localStorage.removeItem('Details');
    window.location.href = '/studentlogin';
    // localStorage.clear();
  };
  //get a student
  const [student, setStudent] = useState([]);
  async function getAstudent() {
    try {
      const response = await fetch(
        `http://localhost:8000/system/student/students/${user._id}`
      );
      const astudent = await response.json();
      setStudent(astudent);
      setLoading(true);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getAstudent();
  }, []);

  return (
    <div>
      {' '}
      <div>
        {/* {
          localStorage.getItem('Details')?
          <div> </div>: null
        } */}
        <Container>
          <Helmet>
            <title>Student Profile</title>
          </Helmet>
          <div>
            <h1>Student Profile</h1>
          </div>

          <div>
            {/* <Card> */}
            <div style={{ padding: '2rem' }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                  <Card
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      // height: 240,
                    }}
                  >
                    <div>
                      <Card
                        style={{
                          borderRadius: '50%',
                          width: '100%',
                        }}
                      >
                        <img
                          src={
                            'http://localhost:8000/' + student.studentPhoto
                          }
                          style={{
                            width: '100%',
                          }}
                        />
                      </Card>
                      <div style={{ textAlign: 'center' }}>
                        <h3>
                          <b>
                            { student.firstname}{' '}
                            { student.lastname}
                          </b>
                        </h3>
                        <h4>{student.admission}</h4>
                        {/* <h4>{user.group}</h4> */}
                      </div>
                    </div>
                  </Card>
                  <div>
                    <Button
                      variant="contained"
                      size="medium"
                      sx={{ width: '100%', marginTop: '1rem' }}
                    >
                      <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to="/myprofile/update"
                      >
                        Update Profile
                      </Link>
                    </Button>

                    <Button
                      variant="contained"
                      size="medium"
                      sx={{ width: '100%', marginTop: '1rem' }}
                    >
                      <Link
                        style={{ textDecoration: 'none', color: 'white' }}
                        to="/changepassword"
                      >
                        Change Password
                      </Link>
                    </Button>

                    <Button
                      variant=""
                      size="medium"
                      sx={{ width: '100%', marginTop: '1rem' }}
                    >
                      <Link to="#signout" onClick={signoutHandler}>
                        Log Out
                      </Link>
                    </Button>
                  </div>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      // height: 240,
                    }}
                  >
                    <b>
                      <h3>General Information</h3>
                    </b>
                    <div
                      style={{ display: 'flex', gap: '3rem', padding: '1rem' }}
                    >
                      <div>
                        <b>Firstname:</b>{' '}
                        <p>{student.firstname}</p>
                        <b>Admission:</b>
                        <p>{student.admission}</p>
                        <b>Class:</b>
                        <p>{student.group}</p>
                        <b>PresentAddress:</b>
                        <p>{student.presentAddress}</p>
                        <b>Gender:</b> <p>{ student.gender}</p>
                      </div>
                      <div>
                        <b>Lastname:</b>{' '}
                        <p> {student.lastname}</p>
                        <b>Email:</b>
                        <p>{student.email}</p>
                        <b> DOB:</b>
                        <p>{student.DOB}</p>
                        <b> Phone:</b>
                        <p>{student.phone}</p>
                      </div>
                    </div>
                  </Paper>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      // height: 240,
                      marginTop: '2rem',
                    }}
                  >
                    <b>
                      <h3>Other Information</h3>
                    </b>
                    <div>
                      {/* Religion:<p>Muslim</p> */}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quas reprehenderit nobis beatae necessitatibus amet
                      officiis obcaecati tempore. Deleniti odit distinctio
                      dolorum itaque ex labore quos quae consequuntur quisquam,
                      pariatur quas.
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
            {/* </Card> */}
          </div>

          <Copyright sx={{ pt: 4 }} />
        </Container>
      </div>
    </div>
  );
}
