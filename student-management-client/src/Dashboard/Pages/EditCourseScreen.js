import Card from '@mui/material/Card';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import SideBarDetails from '../Layout/SideBarDetails';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { getError } from '../../Utils/GetError';
import { toast } from 'react-toastify';

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
export default function EditCoursesScreen() {
  //get course Details
  const [course, setCourse] = useState([]);
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [group, setGroup] = useState('');
  const [semister, setSemister] = useState('');
  const [year, setYear] = useState('');
  const params = useParams();

  async function getACourse() {
    console.warn(params);
    try {
      const response = await fetch(
        `http://localhost:8000/system/course/${params.id}`
      );
      const getacourse = await response.json();
      setCourse(getacourse);
      setCode(getacourse.code);
      setTitle(getacourse.title);
      setGroup(getacourse.group.abbr);
      setSemister(getacourse.semister);
      setYear(getacourse.year);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getACourse();
  }, []);

  //edit course
  const handleSubmitCourse = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:8000/system/course/courses';

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
            <title>Edit Course</title>
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
              <Link to="/course" className="link">
                {' '}
                <Button variant="contained" size="medium" color="error">
                  Go to Course
                </Button>
              </Link>
              <div>
                <h1>Edit New Course</h1>
              </div>
            </div>

            <Card>
              <form>
                <div style={{ padding: '2rem' }}>
                  <div>
                    <div class="mb-2">
                      <label for="code" class="form-label">
                        Course Code
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </div>
                    <div class="mb-2">
                      <label for="title" class="form-label">
                        Course Title
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    {/* <div lass="mb-2">
                      <label for="group" class="form-label">
                        Class Group
                      </label>
                      <select
                        class="form-select"
                        aria-label="select example"
                        onChange={(e) => setGroup(e.target.value)}
                        value={group}
                      >
                        <option selected>--Select class Group--</option>

                        <>
                          <option>group</option>
                        </>
                      </select>
                    </div> */}
                    <div class="mb-2">
                      <label for="semister" class="form-label">
                        Semister
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="semister"
                        value={semister}
                        onChange={(e) => setSemister(e.target.value)}
                      />
                    </div>
                    <div class="mb-2">
                      <label for="year" class="form-label">
                        Year
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </div>
                    <Button
                      variant="contained"
                      size="medium"
                      sx={{ width: '100%' }}
                      onClick={handleSubmitCourse}
                    >
                      Submit
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
