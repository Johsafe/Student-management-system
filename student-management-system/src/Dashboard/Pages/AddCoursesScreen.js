import Card from '@mui/material/Card';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SideBarDetails from '../Layout/SideBarDetails';
import Button from '@mui/material/Button';
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
export default function AddCoursesScreen() {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [group, setGroup] = useState('');
  const [semister, setSemister] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('code', code);
    formData.append('title', title);
    formData.append('group', group);
    formData.append('semister', semister);
    formData.append('year', year);
    try {
      console.log(group, code, title, semister, year);

      // console.log(code);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <SideBarDetails />
        <Container>
          <Helmet>
            <title>Add Course</title>
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
                {/* <button className="btn btn-danger">Go to Courses</button> */}
                <Button variant="contained" size="medium" color="error">
                  Go to Course
                </Button>
              </Link>
              <div>
                <h1>Add New Course</h1>
              </div>
            </div>

            <Card>
              <div
                style={{ padding: '2rem' }}
                // id="exampleForm"
                // onSubmit={handleSubmit}
              >
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

                  {/* <div class="mb-2">
                    <label for="category" class="form-label">
                      Category
                    </label>
                    <input type="text" class="form-control" id="category" />
                  </div> */}
                  <div lass="mb-2">
                    <label for="group" class="form-label">
                      Class Group
                    </label>
                    <select
                      class="form-select"
                      aria-label="select example"
                      onChange={(e) => setGroup(e.target.value)}
                    >
                      <option selected>--Select class Group--</option>
                      <option value={group}>CSC</option>
                      <option value={group}>ASC</option>
                      <option value={group}>BSC</option>
                    </select>
                  </div>
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
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </div>
    </div>
  );
}
