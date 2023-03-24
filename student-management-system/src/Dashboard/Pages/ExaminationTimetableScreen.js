import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ButtonGroup from '@mui/material/ButtonGroup';
import SideBarDetails from '../Layout/SideBarDetails';
import Container from '@mui/material/Container';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Typography } from '@mui/material';

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

export default function ExaminationTimetableScreen() {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <SideBarDetails />
        <Container>
          <Helmet>
            <title>EXAMINATION TIMETABLE</title>
          </Helmet>
          <div style={{ margin: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h1>EXAMINATION TIMETABLE</h1>
              <div>
                <Link to="/create" className="link">
                  {' '}
                  <Button variant="contained" size="medium">
                    CREATE NEW TIMETABLE
                  </Button>
                </Link>
              </div>
            </div>

            <div className="dashboard">
              <div>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Academic Year</th>
                      <th scope="col">Exam Month</th>
                      <th scope="col">DepartMent</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#</td>
                      <td>END OF SEMISTER </td>
                      <td>2022/2023</td>
                      <td>APRIL 2023</td>
                      <td>SSAES</td>
                      <td>
                        <div>
                          <ButtonGroup
                            variant="text"
                            aria-label="text button group"
                            style={{ display: 'flex' }}
                          >
                            {/* <Button>One</Button> */}
                            <Button>
                              <Link to="/examination/edit">
                                <EditIcon />
                              </Link>
                            </Button>
                            <Button>
                              <DeleteIcon style={{ color: 'red' }} />
                            </Button>
                            <Button>
                            <Link to="/examination/view">
                              <VisibilityIcon />
                            </Link>
                          </Button>
                          </ButtonGroup>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </div>
    </div>
  );
}
