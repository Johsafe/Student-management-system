import {
  Button,
  Card,
  Container,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import profile from '../../Static/profile.png';
import Copyright from '../../Utils/Copyright';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AdminUnitRegitration from './AdminUnitRegitration';
import ClassStudentsScreen from './ClassStudentsScreen';

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

export default function ViewGroupProfileScreen() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //general info
  function GeneralInfo() {
    return (
      <div>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            width: '800px',
          }}
        >
          <b>
            <h3>General Information</h3>
          </b>
        </Paper>
      </div>
    );
  }

  return (
    <div>
      {' '}
      <div>
        <Container sx={{ pt: 4 }}>
          <Helmet>
            <title>Class Profile</title>
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
              <Link to="/groups" className="link">
                {' '}
                <Button variant="contained" size="medium" color="error">
                  Go to Classes
                </Button>
              </Link>
              <div>
                <h1>Class Profile</h1>
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
                    src={profile}
                    style={{
                      width: '100%',
                    }}
                  />
                  <div style={{ textAlign: 'center' }}>
                    <h4>
                      <b>Bachelor of Computer Science</b>
                    </h4>
                    <b> 40 Students </b>
                  </div>
                </div>
              </Card>
              <div>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ width: '100%', marginTop: '0.5rem' }}
                >
                  <Link
                    to="/:id/classedit"
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    Update Class
                  </Link>
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="medium"
                  sx={{ width: '100%', marginTop: '0.5rem' }}
                >
                  <Link style={{ textDecoration: 'none', color: 'white' }}>
                    Delete Class
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
                    <Tab label="Students" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <GeneralInfo />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <AdminUnitRegitration />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <ClassStudentsScreen />
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
