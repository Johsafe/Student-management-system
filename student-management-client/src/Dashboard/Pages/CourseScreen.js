import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ButtonGroup from '@mui/material/ButtonGroup';
import SideBarDetails from '../Layout/SideBarDetails';
import Container from '@mui/material/Container';
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
export default function CourseScreen() {
  //get Courses
  const [courses, setCourses] = useState([]);
  async function getCourses() {
    try {
      const response = await fetch(
        'http://localhost:8000/system/course/courses'
      );
      const getcourses = await response.json();
      setCourses(getcourses);
      // console.log(getcourses);
    } catch (err) {
      console.error(err.message);
      // toast.error(getError(err));
    }
  }

  useEffect(() => {
    getCourses();
  }, []);

  //delete course
  async function deleteCourse(id) {
    try {
      await fetch(`http://localhost:8000/system/course/${id}`, {
        method: 'DELETE',
      });
      setCourses(courses.filter((courses) => courses._id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <SideBarDetails />
        <Container>
          <Helmet>
            <title>Courses</title>
          </Helmet>
          <div style={{ margin: '3rem' }}>
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
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <th scope="row">#</th>
                        <td>{course.code}</td>
                        <td>{course.title}</td>
                        <td>{course.group.abbr}</td>
                        <td>{course.semister}</td>
                        <td>{course.year}</td>
                        <td>
                          <div>
                            <ButtonGroup
                              variant="text"
                              aria-label="text button group"
                              style={{ display: 'flex' }}
                            >
                              {/* <Button>One</Button> */}
                              <Button>
                                <Link to={`/${course._id}/edit`}>
                                  <EditIcon />
                                </Link>
                              </Button>
                              <Button onClick={() => deleteCourse(course._id)}>
                                <DeleteIcon style={{ color: 'red' }} />
                              </Button>
                            </ButtonGroup>
                          </div>
                        </td>
                      </tr>
                    ))}
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
