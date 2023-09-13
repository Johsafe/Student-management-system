import Card from '@mui/material/Card';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import SideBarDetails from '../Layout/SideBarDetails';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Copyright from '../../Utils/Copyright';


export default function CreateTimeTableScreen() {
  const [title, setTitle] = useState('');
  const [examStartdate,setExamStartdate] = useState('');
  const [examStopdate,setExamStopdate] = useState('');
  const [academicyear, setAcademicYear] = useState('');
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
      // academicYear,
      month,
      examStartdate,
      examStopdate,
      examdate,
      // timeOfday,
      group,
      // course,
      // year,
      // venue,
      noofexaminas,
      invigilator
    );
  };
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <SideBarDetails />
        <Container>
          <Helmet>
            <title>Create TimeTable</title>
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
              
                {' '}
                
                <Button variant="contained" size="medium" color="error">
                    <Link to="/examination" className="link">
                  Go to Created Examination
                   </Link>
                </Button>
             
              <div>
                <h1>Create TimeTable</h1>
              </div>
            </div>

            <Card sx={{borderTop: '4px solid #42a5f5'}}>
              <form style={{ padding: '2rem' }}>
                {/* part A of examtible */}
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
                      <select
                        class="form-select"
                        aria-label=" select department"
                        value={department.value}
                        onChange={(e) => setDepartment(e.target.value)}
                      >
                        <option selected>--Select Department--</option>
                        <option value="INFOCOMS">INFOCOMS</option>
                        <option value="AGRIC">AGRIC</option>
                        <option value="SSTE">SSTE</option>
                      </select>
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
                          onChange={(e) => setAcademicYear(e.target.value)}
                        />
                      </div>

                      <div class="mb-2">
                        <label for="month" class="form-label">
                          Month of the Exam
                        </label>
                        <input
                        style={{width:'200px'}}
                          type="month"
                          class="form-control"
                          id="month"
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                        />
                      </div>
                      
                    </div>
                    <div style={{display:'flex', gap: '5rem'}}>
                      <div class="mb-2">
                        <label for="startdate" class="form-label">
                          Exam Start Date
                        </label>
                        <input
                         style={{width:'200px'}}
                          type="date"
                          class="form-control"
                          id="examStartdate"
                          value={examStartdate}
                          onChange={(e) => setExamStartdate(e.target.value)}
                        />
                      </div>
                      <div class="mb-2">
                        <label for="stopdate" class="form-label">
                          Exam Stop Date
                        </label>
                        <input
                        style={{width:'200px'}}
                          type="date"
                          class="form-control"
                          id="examStopdate"
                          value={examStopdate}
                          onChange={(e) => setExamStopdate(e.target.value)}
                        />
                      </div>
                      </div>
                  </div>
                  {/* part B of examtimetable */}
                  <div>
                    <div style={{ display: 'flex', gap: '2.1rem' }}>
                    
                      <div class="mb-2">
                        <label for="code" class="form-label">
                          Exam Date
                        </label>
                         <select
                        class="form-select"
                        aria-label=" select department"
                        value={examdate.value}
                        onChange={(e) => setExamdate(e.target.value)}
                      >
                        <option selected>--Select examdate--</option>
                        <option value="1">week 1</option>
                        <option value="2">Week 2</option>
                        <option value="3">Week 3</option>
                      </select>
                      </div>

                      <div class="mb-2">
                        <label for="time" class="form-label">
                          Exam Period
                        </label>
                        <select
                        class="form-select"
                        aria-label=" select department"
                        // value={period.value}
                        // onChange={(e) => setPeriod(e.target.value)}
                      >
                        <option selected>--Selectexam period--</option>
                        <option value="1">Period 1</option>
                        <option value="2">period 2</option>
                        <option value="3">Period 3</option>
                      </select>
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
                         <select

                        class="form-select"
                        aria-label=" select department"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                      >
                        <option selected>--Select venue/Room--</option>
                        <option value="1">E001</option>
                        <option value="2">W010</option>
                        <option value="3">W004</option>
                      </select>
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
                        <label for="timeOfDay" class="form-label">
                          Time Of Day 
                        </label>
                        <input
                          type="string"
                          class="form-control"
                          id="timeOfday"
                        />
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
                     <Link className="link">
                      Create ExamTimeTable
                    </Link>
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
            <Copyright sx={{ pt: 2 }} />
          </div>
        </Container>
        </div>
    </div>
  );
}
