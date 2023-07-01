import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { toast } from 'react-toastify';
import { getError } from '../../Utils/GetError';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import Copyright from '../../Utils/Copyright';
import { Card } from '@mui/material';

export default function AddStudentScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [admission, setAdmission] = useState('');
  const [group, setGroup] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');

  const registerStudent = async (e) => {
    e.preventDefault();
    try {
      const body = {
        firstname,
        lastname,
        admission,
        group,
        gender,
        password,
      };
      const result = await fetch(
        `http://localhost:8000/system/student/group/${params.id}/student`,
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const addstudents = await result.json();
      console.log(firstname, lastname, admission, group, gender, password);
      navigate(`/groups/${params.id}/students`);
      console.log(addstudents);
      toast.success('Student Registered Successfully');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  //get groups
  const [groups, setGroups] = useState([]);
  async function getGroups() {
    try {
      const response = await fetch(
        'http://localhost:8000/system/classgroup/group'
      );
      const getgroups = await response.json();
      setGroups(getgroups);
      // console.log(getgroups);
    } catch (err) {
      console.error(err.message);
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div>
      <div>
        <Container>
          <Helmet>
            <title>StudentsScreen</title>
          </Helmet>
          <div style={{ padding: '2rem' }}>
            <div
              style={{
                display: 'flex',
                gap: '5rem',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Link to="/studentreg" className="link">
                {' '}
                <Button variant="contained" size="medium" color="error">
                  Go to Students
                </Button>
              </Link>

              <div>
                <h1>Register New Student</h1>
              </div>
            </div>

            <Card sx={{ borderTop: '4px solid #42a5f5' }}>
              <form>
                <div style={{ padding: '1.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '4rem' }}>
                      <div>
                        <label for="code" class="form-label">
                          Student First Name
                        </label>
                        <input
                          style={{ width: '460px' }}
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
                          style={{ width: '480px' }}
                          type="text"
                          class="form-control"
                          id="lastname"
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                        />
                      </div>
                    </div>

                    <div lass="mb-2">
                      <label for="group" class="form-label">
                        Student Class Group
                      </label>
                      <select
                        class="form-select"
                        aria-label="select example"
                        onChange={(e) => setGroup(e.target.value)}
                        value={group._id}
                      >
                        <option selected>--Select class Group--</option>
                        {groups.map((group) => (
                          <>
                            {/* <option value={}>{group.abbr}</option> */}
                            <option key={group._id} value={group._id}>
                              {group.abbr}
                            </option>
                          </>
                        ))}
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
                      onClick={registerStudent}
                    >
                      Register Student
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </div>
          <Copyright />
        </Container>
      </div>
    </div>
  );
}
