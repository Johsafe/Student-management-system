import Card from '@mui/material/Card';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import SideBarDetails from '../Layout/SideBarDetails';
import Container from '@mui/material/Container';
import Copyright from '../../Utils/Copyright';
import { toast } from 'react-toastify';
import { getError } from '../../Utils/GetError';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import Header from '../../Utils/Header';
import { base_url } from '../../Utils/baseUrl';

export default function ExamDatesScreen() {
  //get examdates
  const [loading, setLoading] = useState(false);
  const [examdates, setExamdates] = useState([]);

  //register a examdates
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');
  const [day, setDay] = useState('');
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        month,
        date,
        day
      };
      const result = await fetch(
        `${base_url}examdates/examdates`,
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const addexamdates = await result.json();
      // console.log(abbr, title);
      // console.log(addexamdates);
      navigate('/examdates')
      toast.success('examdates Registered Successfully');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  //get examdatess
  async function getexamdates() {
    try {
      const response = await fetch(
        `${base_url}examdates/examdates`
      );
      const getdept = await response.json();
      setExamdates(getdept);
      console.warn(getdept);
      setLoading(true);
      console.log(getdept);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getexamdates();
  }, []);

  //delete course
  async function delExamdate(id) {
    try {
      await fetch(`${base_url}examdates/${id}`, {
        method: 'DELETE',
      });
      setExamdates(examdates.filter((examdates) => examdates._id !== id));
      toast.success('examdates deleted successfully');
      console.log(id);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  var i = 1

  return (
    <div style={{ display: 'flex' }}>
      <SideBarDetails />
      <Box
          component="main"
          sx={{
            // backgroundColor: '#eceff1',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Header />
      <Container sx={{ mt: 0 }}>
        <Helmet>
          <title>examdates</title>
        </Helmet>
        <div>
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
                <h1>Examdates</h1>
              </div>
            </div>

        </div>
        <Card
          style={{
            display: 'flex',
            padding: '2rem',
            borderTop: '4px solid #42a5f5',
          }}
        >
          <div style={{ width: '50%' }}>
            <form>
              <div style={{ padding: '2rem' }}>
              <div class="mb-2">
                        <label for="month" class="form-label">
                          Month of the Exam
                        </label>
                        <input
                        style={{width:'400px'}}
                          type="month"
                          class="form-control"
                          id="month"
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                        />
                      </div>
                     
                      <div class="mb-2">
                        <label for="date" class="form-label">
                          Exam Day Date
                        </label>
                        <input
                         style={{width:'400px'}}
                          type="date"
                          class="form-control"
                          id="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>

                      <div class="mb-2">
                        <label for="day" class="form-label">
                          Exam Day
                        </label>
                         <select
                        class="form-select"
                        aria-label=" select department"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                      >
                        <option selected>--Select Exam Day--</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                      </select>
                      </div>

                <Button
                  variant="contained"
                  size="medium"
                  sx={{ width: '100%' }}
                  onClick={onSubmitForm}
                >
                 <Link className="link">
                  Add ExamDates
                  </Link>
                </Button>
              </div>
            </form>
          </div>

          <div style={{ width: '60%' }}>
            {/* <div> */}
            {/* {loading ? ( */}
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Day</th>
                  <th scope="col">Month</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {examdates.map((examsdate) => (
                  <tr>
                    <th scope="row">{i++}</th>
                    <td>{examsdate.day}</td>
                    <td>{examsdate.month}</td>
                    <td>{examsdate.date}</td>
                    <td>
                      <div>
                        <ButtonGroup
                          variant="text"
                          aria-label="text button group"
                          style={{ display: 'flex' }}
                        >
                          <Button
                            //    onClick={handleShow}
                            data-toggle="modal"
                          >
                            <Link to={`/update/${examsdate._id}`}>
                              <EditIcon />
                            </Link>
                          </Button>
                          <Button onClick={() => delExamdate(examsdate._id)}>
                            <DeleteIcon style={{ color: 'red' }} />
                          </Button>
                        </ButtonGroup>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* ))} */}
              </tbody>
            </table>
            {/* // ) : ( // <LoadingBox />
              // )} */}
          </div>
        </Card>

        <Copyright sx={{ pt: 4 }} />
      </Container>
      </Box>
    </div>
  );
}
