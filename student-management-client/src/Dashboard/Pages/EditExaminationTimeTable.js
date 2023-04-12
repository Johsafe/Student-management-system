import Card from '@mui/material/Card';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import SideBarDetails from '../Layout/SideBarDetails';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

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
export default function EditTimeTableScreen() {
  const [title, setTitle] = useState('');
  const [academicyear, setAcademicyear] = useState('');
  const [month, setMonth] = useState('');
  const [department, setDepartment] = useState('');
  const [examdate, setExamdate] = useState('');
  const [starttime, setStarttime] = useState('');
  const [stoptime, setStoptime] = useState('');
  const [group, setGroup] = useState('');
  const [coursetitle, setCoursetitle] = useState('');
  const [room, setRoom] = useState('');
  const [noofexaminas, setNoofexaminas] = useState('');
  const [invigilator, setInvigilator] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(
      title,
      academicyear,
      month,
      department,
      examdate,
      starttime,
      stoptime,
      room,
      noofexaminas,
      invigilator,
      group
    );
  };
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <SideBarDetails />
        <Container>
          <Helmet>
            <title>Edit TimeTable</title>
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
              <Link to="/examination" className="link">
                {' '}
                
                <Button variant="contained" size="medium" color="error">
                  Go to Created Timetable
                </Button>
              </Link>
              <div>
                <h1>Edit TimeTable</h1>
              </div>
            </div>

            <Card>
              <form style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <div>
                    <div class="mb-2">
                      <label for="timetabletitle" class="form-label">
                        TimeTable Title
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="timetabletitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div class="mb-2">
                      <label for="department" class="form-label">
                        School Department
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '5rem' }}>
                      <div class="mb-2">
                        <label for="academicyear" class="form-label">
                          Academic Year
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="academicyear"
                          value={academicyear}
                          onChange={(e) => setAcademicyear(e.target.value)}
                        />
                      </div>

                      <div class="mb-2">
                        <label for="month" class="form-label">
                          Month of the Exam
                        </label>
                        <input
                          type="month"
                          class="form-control"
                          id="month"
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* <Divider  color="initial" sx={{height:'0.2rem',margin:'1rem'}} /> */}
                  <div>
                    <div style={{ display: 'flex', gap: '2.1rem' }}>
                      <div class="mb-2">
                        <label for="code" class="form-label">
                          Exam Date
                        </label>
                        <input
                          type="date"
                          class="form-control"
                          id="examdate"
                          value={examdate}
                          onChange={(e) => setExamdate(e.target.value)}
                        />
                      </div>

                      <div class="mb-2">
                        <label for="time" class="form-label">
                          Start Time
                        </label>
                        <input
                          type="time"
                          class="form-control"
                          id="starttime"
                          value={starttime}
                          onChange={(e) => setStarttime(e.target.value)}
                        />
                      </div>
                      <div class="mb-2">
                        <label for="time" class="form-label">
                          Stop Time
                        </label>
                        <input
                          type="time"
                          class="form-control"
                          id="stoptime"
                          value={stoptime}
                          onChange={(e) => setStoptime(e.target.value)}
                        />
                      </div>
                    </div>
                    <div lass="mb-2">
                      <label for="group" class="form-label">
                        Class Group
                      </label>
                      <select
                        class="form-select"
                        aria-label=" select example"
                        onChange={(e) => setGroup(e.target.value)}
                      >
                        <option selected>--Select class Group--</option>
                        <option value="CSC">CSC</option>
                        <option value="ASC">ASC</option>
                        <option value="BSC">BSC</option>
                      </select>
                    </div>
                    <div class="mb-2">
                      <label for="title" class="form-label">
                        Course Title
                      </label>
                      <select class="form-select" aria-label=" select example">
                        <option selected>--Select course code--</option>
                        <option value="1">C0M 221</option>
                        <option value="2">CHE 415</option>
                        <option value="3">BOT 210</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                      <div class="mb-2">
                        <label for="room" class="form-label">
                          Room/Venue
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="room"
                          value={room}
                          onChange={(e) => setRoom(e.target.value)}
                        />
                      </div>
                      <div class="mb-2">
                        <label for="number" class="form-label">
                          No. of Examina
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="noofexaminas"
                          value={noofexaminas}
                          onChange={(e) => setNoofexaminas(e.target.value)}
                        />
                      </div>
                    </div>
                    <div class="mb-2">
                      <label for="year" class="form-label">
                        Invigilator
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="invigilator"
                        value={invigilator}
                        onChange={(e) => setInvigilator(e.target.value)}
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
              </form>
            </Card>
          </div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </div>
    </div>
  );
}
