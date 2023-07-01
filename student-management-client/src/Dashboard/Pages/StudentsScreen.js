import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SideBarDetails from '../Layout/SideBarDetails';
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';
import { getError } from '../../Utils/GetError';
import Copyright from '../../Utils/Copyright';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function AllStudentsScreen() {
  //get Students
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  async function getStudents() {
    try {
      const response = await fetch(
        `http://localhost:8000/system/student/group/${params.id}/students`
      );
      const getstudents = await response.json();
      setStudents(getstudents);
      setLoading(true);
      console.log(getstudents);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getStudents();
  }, []);

  //delete student
  async function deleteStudent(id) {
    try {
      await fetch(
        `http://localhost:8000/system/student/group/${params.id}/students/${id}`,
        {
          method: 'DELETE',
        }
      );
      setStudents(students.filter((students) => students._id !== id));
      toast.success('student deleted successfully');
    } catch (err) {
      toast.error(getError(err));
    }
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <SideBarDetails />
        <Container>
          <Helmet>
            <title>StudentsScreen</title>
          </Helmet>
          <div style={{ margin: '3rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '4px solid #42a5f5',
              }}
            >
              <h1>All Students</h1>
              <div>
                <Link to="/addstudent" className="link">
                  {' '}
                  <Button variant="contained" size="medium">
                    <div style={{ gap: '1rem', display: 'flex' }}>
                      <div>
                        <PersonAddAlt1Icon />{' '}
                      </div>
                      <div>Add Student </div>
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
            {/* {loading ? ( */}
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
                    {/* {students.map((student) => ( */}
                    <tr
                    //  key={student._id}
                    >
                      <th scope="row">#</th>
                      <td>{/* {student.lastname} */} Mwamuye</td>
                      <td>{/* {student.firstname} */} Joseph</td>
                      <td>{/* {student.admission} */} csc/034/675</td>
                      <td>{/* {student.admission} */} BSC CSC</td>
                      <td>{/* {student.gender} */} Male</td>
                      <td>
                        <div>
                          <ButtonGroup
                            variant="text"
                            aria-label="text button group"
                            style={{ display: 'flex' }}
                          >
                            <Button>
                              <Link to="/viewstudent">
                                <VisibilityIcon />
                              </Link>
                            </Button>
                          </ButtonGroup>
                        </div>
                      </td>
                    </tr>
                    {/* ))} */}
                  </tbody>
                </table>
              </div>
            </div>
            {/* // ) : (
          //   <LoadingBox />
          // )} */}
          </div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </div>
    </div>
  );
}
