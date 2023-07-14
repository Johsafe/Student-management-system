import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import profile from '../../Static/profile.png';
import Copyright from '../../Utils/Copyright';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import StudentUnitRegitration from '../StudentPages/StudentUnitRegitration ';
import { getError } from '../../Utils/GetError';
import { toast } from 'react-toastify';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ViewStudentScreen() {
  const params = useParams();
  const [student, setStudent] = useState([]);
  async function getGroups() {
    try {
      const response = await fetch(
        `http://localhost:8000/system/student/student/${params.studentId}`
      );
      const getstudent = await response.json();
      setStudent(getstudent);
      console.log(getstudent);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getGroups();
  }, []);

  //delete student
  const navigate = useNavigate();
  async function deleteStudent(id) {
    try {
      await fetch(
        `http://localhost:8000/system/student/group/${params.id}/students/${id}`,
        {
          method: 'DELETE',
        }
      );
      toast.success('student deleted successfully');
      navigate('/studentreg');
    } catch (err) {
      toast.error(getError(err));
    }
  }
  //mui tabs
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //general info
  function GeneralInfo() {
    return (
      <div>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              width: '800px',
              textAlign: 'center',
            }}
          >
            <b>
              <h3>General Information</h3>
            </b>
            <div
              style={{
                display: 'flex',
                gap: '3rem',
                padding: '1rem',
              }}
            >
              <div>
                <b>Firstname:</b> <p>{student.firstname}</p>
                <b>Admission:</b>
                <p>{student.admission}</p>
                <b>Class:</b>
                <p>{student.group}</p>
                <b>PresentAddress:</b>
                <p>{student.presentAddress}</p>
                <b>Gender:</b> <p>{student.gender}</p>
              </div>
              <div>
                <b>Lastname:</b> <p>{student.lastname}</p>
                <b>Email:</b>
                <p>{student.email}</p>
                <b> DOB:</b>
                <p>{student.DOB}</p>
                <b> Phone:</b>
                <p>{student.phone}</p>
              </div>
            </div>
          </Paper>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              marginTop: '2rem',
            }}
          >
            <b>
              <h3>Other Information</h3>
            </b>
            <div
              style={{
                display: 'flex',
                gap: '3rem',
                padding: '1rem',
              }}
            >
              <div>
                <b>Mother's Names:</b> <p></p>
                <b>Father's Names:</b>
                <p></p>
              </div>
              <div>
                <b>Mother's Contact:</b> <p></p>
                <b>Father's Contact:</b>
                <p></p>
              </div>
            </div>
          </Paper>
        </Grid>
      </div>
    );
  }

  return (
    <div>
      {' '}
      <div>
        <Container sx={{ pt: 4 }}>
          <Helmet>
            <title>Student Profile</title>
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
              <Link to="/studentreg" className="link">
                {' '}
                <Button variant="contained" size="medium" color="error">
                  Go to Students
                </Button>
              </Link>
              <div>
                <h1>Student Profile</h1>
              </div>
            </div>
            <Divider sx={{ backgroundColor: 'blue' }} />
          </div>
          <div style={{ display: 'flex', gap: '1rem', margin: '2rem' }}>
            <div>
              <Card
                sx={{
                  p: 2,
                  height: 350,
                  width: 250,
                  borderTop: '4px solid #42a5f5',
                }}
              >
                <div>
                  <img
                    className="media"
                    src={'http://localhost:8000/' + student.studentPhoto}
                    style={{ borderRadius: '50%', width: '100%' }}
                  />
                  <div style={{ textAlign: 'center' }}>
                    <h4>
                      <b>
                        {student.firstname}
                        <t /> {student.lastname}
                      </b>
                    </h4>
                    <b>{student.group}</b>
                  </div>
                </div>
              </Card>
              <div>
                <Link
                  to={`/${student._id}/editstudent`}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{ width: '100%', marginTop: '0.5rem' }}
                  >
                    Update Student
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="error"
                  size="medium"
                  sx={{ width: '100%', marginTop: '0.5rem' }}
                  onClick={() => deleteStudent(student._id)}
                >
                  <Link style={{ textDecoration: 'none', color: 'white' }}>
                    Delete Student
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange}>
                    <Tab label="Information" {...a11yProps(0)} />
                    <Tab label="Unit Registration" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <GeneralInfo />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <StudentUnitRegitration />
                </TabPanel>
              </Box>
            </div>
          </div>
          <Copyright sx={{ pt: 2 }} />
        </Container>
      </div>
    </div>
  );
}
