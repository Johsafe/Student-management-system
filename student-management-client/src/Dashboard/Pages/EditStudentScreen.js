import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';
import { getError } from '../../Utils/GetError';
import { Helmet } from 'react-helmet-async';
import SideBarDetails from '../Layout/SideBarDetails';
import { Card } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

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

export default function EditStudentScreen() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  // const [email, setEmail] = React.useState('');
  const [admission, setAdmission] = useState('');
  const [group, setGroup] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');

  const params = useParams();

  async function getAStudent() {
    console.warn(params);
    try {
      const response = await fetch(
        `http://localhost:8000/system/student/${params.id}`
      );
      const getastudent = await response.json();
      setFirstname(getastudent);
      setLastname(getastudent.code);
      setAdmission(getastudent.title);
      setGroup(getastudent.group.abbr);
      setGender(getastudent.semister);
      setPassword(getastudent.year);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getAStudent();
  }, []);

  //edit student details
  const editStudent = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:8000/system/student/courses';

    try {
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <SideBarDetails />
        <Container>
          <Helmet>
            <title>EditStudent</title>
          </Helmet>
          <div style={{ padding: '3rem' }}>
            <div
              style={{
                display: 'flex',
                gap: '5rem',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Link to="/student" className="link">
                {' '}
                <Button variant="contained" size="medium" color="error">
                  Go to Students
                </Button>
              </Link>

              <div>
                <h1>Edit Student</h1>
              </div>
            </div>

            <Card>
              <form>
                <div style={{ padding: '2rem' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '5rem' }}>
                      <div>
                        <label for="code" class="form-label">
                          Student First Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="firstname"
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                        />
                      </div>
                      <div>
                        <label for="code" class="form-label">
                          Student Last Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="lastname"
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* <div class="mb-2">
                  <label for="title" class="form-label">
                    Student Email
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div> */}

                    <div lass="mb-2">
                      <label for="group" class="form-label">
                        Student Class Group
                      </label>
                      <select
                        class="form-select"
                        aria-label="select example"
                        onChange={(e) => setGroup(e.target.value)}
                        value={group}
                      >
                        <option selected>--Select class Group--</option>

                        <option>group</option>
                      </select>
                    </div>
                    <div class="mb-2">
                      <label for="semister" class="form-label">
                        Student Admission
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="admission"
                        value={admission}
                        onChange={(e) => setAdmission(e.target.value)}
                      />
                    </div>
                    <div class="mb-2">
                      <label for="year" class="form-label">
                        Student Gender
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      />
                    </div>
                    <div class="mb-2">
                      <label for="year" class="form-label">
                        Student Pasword
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <Button
                      variant="contained"
                      size="medium"
                      sx={{ width: '100%' }}
                      onClick={editStudent}
                    >
                      Edit Student
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </div>
    </div>
  );
}
