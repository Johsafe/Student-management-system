import React, { useEffect, useState } from 'react';
import { getError } from '../../Utils/GetError';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import LoadingBox from '../../Utils/LoadingBox';
import {
  Button,
  Card,
  Chip,
  Container,
  MenuItem,
  TextField,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import BlockIcon from '@mui/icons-material/Block';

const status = [
  {
    value: 'Absent',
    label: 'Absent',
  },
  {
    value: 'Present',
    label: 'Present',
  },
  {
    value: 'Excused',
    label: 'Excused',
  },
];

function StudentAttendance() {
  const [loading, setLoading] = useState(false);
  const [studentlist, setStudentlist] = useState([]);
  const [present, setPresent] = useState({});
  const [selectedOption, setSelectedOption] = useState(status[0].value);
  //get todays date
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    const getFullTodayDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    setTodayDate(getFullTodayDate());
  }, []);

  const params = useParams();

  async function getClassStudents() {
    try {
      const response = await fetch(
        `http://localhost:8000/system/student/group/${params.groupId}/students`
      );
      const getclassstudents = await response.json();
      setStudentlist(getclassstudents);
      setLoading(true);
      // console.warn(getclassstudents);
    } catch (err) {
      toast.error(getError(err));
    }
  }
  useEffect(() => {
    getClassStudents();
  }, []);

  const onStatusChange = (event) => {
    setSelectedOption(event.target.value);
  };

  var i = 1;

  return (
    <div>
      <Container>
        <Helmet>
          <title>Attendance</title>
        </Helmet>
        <Card
          style={{
            padding: '1rem',
            width: '820px',
          }}
        >
          <div>
            <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>
              Attendance for the date of{' '}
              <span style={{ background: '#ef9a9a', borderRadius: '20px' }}>
                {todayDate}
              </span>{' '}
            </h4>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">SN</th>
                  <th scope="col">Admission</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Firstname</th>
                  <th scope="col">Attendance</th>
                  <th scope="col">Attendance Status</th>
                </tr>
              </thead>
              <tbody>
                {studentlist.map((student) => (
                  <tr key={student._id}>
                    <td>{i++}</td>
                    <td>{student.lastname}</td>
                    <td>{student.firstname} </td>
                    <td>{student.admission}</td>
                    <td>
                      {selectedOption && (
                        <div>
                          {selectedOption === 'Absent' && (
                            <p>
                              <Chip
                                color="error"
                                label="Absent"
                                icon={<ClearIcon />}
                              />
                            </p>
                          )}
                          {selectedOption === 'Present' && (
                            <p>
                              {' '}
                              <Chip
                                // color="#a5d6a7"
                                color="success"
                                label="Present"
                                icon={<CheckIcon />}
                              />
                            </p>
                          )}
                          {selectedOption === 'Excused' && (
                            <p>
                              <Chip
                                color="primary"
                                label="Excused"
                                icon={<BlockIcon />}
                              />
                            </p>
                          )}
                        </div>
                      )}
                    </td>
                    {/* <td>
                      <Chip
                        // color="#a5d6a7"
                        // color="green[200]"
                        label="Present"
                        icon={<CheckIcon />}
                      >
                        present
                      </Chip>

                      <Chip
                        // color="#90caf9"
                        label="Excused"
                        icon={<BlockIcon />}
                      >
                        Excused
                      </Chip>
                      <Chip
                        // color="#ef9a9a"
                        label="Absent"
                        icon={<ClearIcon />}
                      >
                        Absent
                      </Chip>
                    </td> */}
                    <td>
                      <form>
                        <TextField
                          id="status"
                          select
                          label="Status"
                          // defaultValue="Info Science"
                          // helperText="Please select status"
                          variant="standard"
                          // value={selectedOption}
                          // onChange={onStatusChange}
                        >
                          {status.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              variant="contained"
              size="medium"
              sx={{ width: '100%', marginTop: '0.5rem' }}
              disabled={studentlist.length === 0}
            >
              Submit Attendance
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default StudentAttendance;
