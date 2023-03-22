import Avatar from '@mui/material/Avatar';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ButtonGroup from '@mui/material/ButtonGroup';
import SideBarDetails from '../Layout/SideBarDetails';
import Container from '@mui/material/Container';

export default function CourseScreen() {

  
  return (
    <div>
      <div style={{ display: 'flex' }}>
      <SideBarDetails />
        <Container>
          <Helmet>
            <title>Courses</title>
          </Helmet>
          <div style={{margin:'3rem'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h1>My Courses</h1>
              <div>
                <Link to="/add" className="link">
                  {' '}
                  <Button variant="contained" size="medium">
                    Add Course
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
                      <th scope="col">Code</th>
                      <th scope="col">Title</th>
                      <th scope="col">Class Group</th>
                      <th scope="col">Semeter</th>
                      <th scope="col">year</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Avatar>C</Avatar>
                      </th>
                      <td>COM 321</td>
                      <td>SOFTWARE ENGERRING II</td>
                      <td>CSC</td>
                      <td>2</td>
                      <td>3</td>
                      <td>
                        <div>
                          <ButtonGroup
                            variant="text"
                            aria-label="text button group"
                            style={{ display: 'flex' }}
                          >
                            {/* <Button>One</Button> */}
                            <Button>
                              <Link to="/edit">
                                <EditIcon />
                              </Link>
                            </Button>
                            <Button>
                              <DeleteIcon style={{ color: 'red' }} />
                            </Button>
                          </ButtonGroup>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Avatar>M</Avatar>
                      </th>
                      <td>MAT 120</td>
                      <td>LINEAR ALGEBRA</td>
                      <td>BSC</td>
                      <td>1</td>
                      <td>1</td>
                      <td>
                        <div>
                          <ButtonGroup
                            variant="text"
                            aria-label="text button group"
                            style={{ display: 'flex' }}
                          >
                            {/* <Button>One</Button> */}
                            <Button>
                              <Link to="/edit">
                                <EditIcon />
                              </Link>
                            </Button>
                            <Button>
                              <DeleteIcon style={{ color: 'red' }} />
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
        </Container>
      </div>
    </div>
  );
}
