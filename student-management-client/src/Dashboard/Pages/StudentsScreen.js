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
import { toast } from 'react-toastify';
import { getError } from '../../Utils/GetError';
import LoadingBox from '../../Utils/LoadingBox';
import { motion } from 'framer-motion';

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
export default function StudentsScreen() {
  //get Students
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  async function getStudents() {
    try {
      const response = await fetch(
        'http://localhost:8000/system/student/students'
      );
      const getstudents = await response.json();
      setStudents(getstudents);
      setLoading(true);
      // console.log(getstudents);
    } catch (err) {
      //   console.error(err.message);
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getStudents();
  }, []);

  //delete course
  async function deleteStudent(id) {
    try {
      await fetch(`http://localhost:8000/system/student/${id}`, {
        method: 'DELETE',
      });
      setStudents(students.filter((students) => students._id !== id));
      toast.success('student deleted successfully');
    } catch (err) {
      toast.error(getError(err));
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div style={{ display: 'flex' }}>
        <SideBarDetails />
        <Container>
          <Helmet>
            <title>StudentsScreen</title>
          </Helmet>
          <div style={{ margin: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h1>Registered Students</h1>
              <div>
                <Link to="/addstudent" className="link">
                  {' '}
                  <Button variant="contained" size="medium">
                    Add Student
                  </Button>
                </Link>
              </div>
            </div>

            {loading ? (
              <div className="dashboard">
                <div>
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Admission</th>
                        <th scope="col">Group</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student._id}>
                          <th scope="row">#</th>
                          <td>{student.lastname}</td>
                          <td>{student.firstname}</td>
                          <td>{student.admission}</td>
                          <td>#</td>
                          <td>{student.gender}</td>
                          <td>
                            <div>
                              <ButtonGroup
                                variant="text"
                                aria-label="text button group"
                                style={{ display: 'flex' }}
                              >
                                {/* <Button>One</Button> */}
                                <Button>
                                  <Link to={`/edit/${student._id}`}>
                                    <EditIcon />
                                  </Link>
                                </Button>
                                <Button
                                  onClick={() => deleteStudent(student._id)}
                                >
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
            ) : (
              <LoadingBox />
            )}
          </div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </div>
    </motion.div>
  );
}
