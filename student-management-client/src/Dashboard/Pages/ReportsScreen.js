import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SideBarDetails from '../Layout/SideBarDetails';
import { Helmet } from 'react-helmet-async';
import Copyright from '../../Utils/Copyright';
import { Card } from '@mui/material';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Header from '../../Utils/Header';

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];
const reports = [
  'Attendance Report',
  'Grades Report',
  'Class Report',
  'Registration Report',
  'Departmental Report',
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ReportsScreen() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Helmet>
        <title>Reports</title>
      </Helmet>
      <SideBarDetails />
      <Box
        sx={{
          // backgroundColor: '#eceff1',
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Header />

        <Container sx={{ mt: 0 }}>
          <div style={{ margin: '3rem' }}>
            <h1>Reports</h1>
            <Card
              sx={{
                borderTop: '4px solid #42a5f5',
                padding: '2rem',
                height: '22rem',
              }}
            >
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {reports.map((report) => (
                  <Grid item xs={2} sm={4} md={4} key={report}>
                    <Item><p>{report}</p></Item>
                  </Grid>
                ))}
              </Grid>
              {/* <SpeedDial
                  ariaLabel="SpeedDial"
                  // sx={{ position: 'absolute', bottom: 2, right:4}}
                  icon={<SpeedDialIcon />}
                >
                  {actions.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                    />
                  ))}
                </SpeedDial> */}
            </Card>
          </div>
          <Copyright sx={{ pt: 1 }} />
        </Container>
      </Box>
    </Box>
  );
}
