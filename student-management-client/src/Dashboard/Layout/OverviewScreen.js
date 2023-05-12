import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

import SideBarDetails from './SideBarDetails';
import { motion } from 'framer-motion';
import { Avatar, Button, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PaidIcon from '@mui/icons-material/Paid';
import LocalMallIcon from '@mui/icons-material/LocalMall';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

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

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 250,
  color: theme.palette.text.primary,
}));

const mdTheme = createTheme();

function DashboardContent() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <Divider />
        <List component="nav">
          {/* mainListItems */}
          <SideBarDetails />
          <Divider sx={{ my: 1 }} />
          {/* secondaryListItems */}
        </List>
        {/* </Drawer> */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container sx={{ mt: 2, mb: 2 }}>
            <div style={{ display: 'flex' }}>
              {/* Total Courses */}
              <div class="col-xl-3 col-lg-5">
                <div
                  style={{
                    background: 'linear-gradient(to right, #373b44, #4286f4)',
                    color: '#fff',
                    backgroundColor: ' #fff',
                    borderRadius: ' 10px',
                    border: 'none',
                    position: ' relative',
                    marginBottom: '30px',
                    overflow: 'hidden',
                  }}
                >
                  <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large">
                      <PaidIcon
                        style={{
                          textAalign: ' center',
                          color: ' #000',
                          position: 'absolute',
                          right: '-1px',
                          fontSize: '90px',
                          top: '25px',
                          opacity: '0.1',
                        }}
                      />
                    </div>
                    <div class="mb-2">
                      <h5
                        class="card-title mb-0"
                        style={{ fontWeight: 'bolder' }}
                      >
                        Total Courses
                      </h5>
                    </div>

                    <div class="col-8">
                      <h2 class="d-flex align-items-center mb-0">10</h2>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Classes Groups*/}
              <div class="col-xl-3 col-lg-6">
                <div
                  style={{
                    background: 'linear-gradient(to right, #a86008, #ffba56)',
                    color: '#fff',
                    backgroundColor: ' #fff',
                    borderRadius: ' 10px',
                    border: 'none',
                    position: ' relative',
                    marginBottom: '30px',
                    overflow: 'hidden',
                  }}
                >
                  <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large">
                      <ShoppingBasketIcon
                        style={{
                          textAalign: ' center',
                          color: ' #000',
                          position: 'absolute',
                          right: '-1px',
                          fontSize: '90px',
                          top: '25px',
                          opacity: '0.1',
                        }}
                      />
                    </div>
                    <div class="mb-2">
                      <h5
                        class="card-title mb-0"
                        style={{ fontWeight: 'bolder' }}
                      >
                        Total Groups
                      </h5>
                    </div>

                    <div class="col-8">
                      <h2 class="d-flex align-items-center mb-0">13</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-3 col-lg-6">
                <div
                  style={{
                    background: 'linear-gradient(to right,#0a504a, #38ef7d)',
                    color: '#fff',
                    backgroundColor: ' #fff',
                    borderRadius: ' 10px',
                    border: 'none',
                    position: ' relative',
                    marginBottom: '30px',
                    overflow: 'hidden',
                  }}
                >
                  <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large">
                      <LocalMallIcon
                        style={{
                          textAalign: ' center',
                          color: ' #000',
                          position: 'absolute',
                          right: '-1px',
                          fontSize: '90px',
                          top: '25px',
                          opacity: '0.1',
                        }}
                      />
                    </div>
                    <div class="mb-2">
                      <h5
                        class="card-title mb-0"
                        style={{ fontWeight: 'bolder' }}
                      >
                        Total Students
                      </h5>
                    </div>

                    <div class="col-8">
                      <h2 class="d-flex align-items-center mb-0">312</h2>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-3 col-lg-6">
                <div
                  style={{
                    background: 'linear-gradient(to right,#493240, #f09)',
                    color: '#fff',
                    backgroundColor: ' #fff',
                    borderRadius: ' 10px',
                    border: 'none',
                    position: ' relative',
                    marginBottom: '30px',
                    overflow: 'hidden',
                  }}
                >
                  <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large">
                      <ProductionQuantityLimitsIcon
                        style={{
                          textAalign: ' center',
                          color: ' #000',
                          position: 'absolute',
                          right: '-1px',
                          fontSize: '90px',
                          top: '25px',
                          opacity: '0.1',
                        }}
                      />
                    </div>
                    <div class="mb-2">
                      <h5
                        class="card-title mb-0"
                        style={{ fontWeight: 'bolder' }}
                      >
                        Total Rooms
                      </h5>
                    </div>

                    <div class="col-8">
                      <h2 class="d-flex align-items-center mb-0">10</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Grid container spacing={3}>
              {/* Rooms */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  Examination Rooms
                </Paper>
              </Grid>
              {/* Coures Chart */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  Courses Chart
                </Paper>
              </Grid>
              {/* Examination TimeTables */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <b> Examination TimeTables </b>
                  <div className="dashboard">
                    <div>
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Academic Year</th>
                            <th scope="col">Exam Month</th>
                            <th scope="col">DepartMent</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>#</td>
                            <td>END OF SEMISTER </td>
                            <td>2022/2023</td>
                            <td>APRIL 2023</td>
                            <td>SSAES</td>
                            <td>
                              <div>
                                <ButtonGroup
                                  variant="text"
                                  aria-label="text button group"
                                  style={{ display: 'flex' }}
                                >
                                  {/* <Button>One</Button> */}
                                  <Button>
                                    <Link to="/examination/edit">
                                      <EditIcon />
                                    </Link>
                                  </Button>
                                  <Button>
                                    <DeleteIcon style={{ color: 'red' }} />
                                  </Button>
                                  <Button>
                                    <Link to="/examination/view">
                                      <VisibilityIcon />
                                    </Link>
                                  </Button>
                                </ButtonGroup>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td>#</td>
                            <td>END OF SEMISTER </td>
                            <td>2022/2023</td>
                            <td>APRIL 2023</td>
                            <td>SSTE</td>
                            <td>
                              <div>
                                <ButtonGroup
                                  variant="text"
                                  aria-label="text button group"
                                  style={{ display: 'flex' }}
                                >
                                  {/* <Button>One</Button> */}
                                  <Button>
                                    <Link to="/examination/edit">
                                      <EditIcon />
                                    </Link>
                                  </Button>
                                  <Button>
                                    <DeleteIcon style={{ color: 'red' }} />
                                  </Button>
                                  <Button>
                                    <Link to="/examination/view">
                                      <VisibilityIcon />
                                    </Link>
                                  </Button>
                                </ButtonGroup>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td>#</td>
                            <td>END OF SEMISTER </td>
                            <td>2022/2023</td>
                            <td>APRIL 2023</td>
                            <td>INFOCOMS</td>
                            <td>
                              <div>
                                <ButtonGroup
                                  variant="text"
                                  aria-label="text button group"
                                  style={{ display: 'flex' }}
                                >
                                  {/* <Button>One</Button> */}
                                  <Button>
                                    <Link to="/examination/edit">
                                      <EditIcon />
                                    </Link>
                                  </Button>
                                  <Button>
                                    <DeleteIcon style={{ color: 'red' }} />
                                  </Button>
                                  <Button>
                                    <Link to="/examination/view">
                                      <VisibilityIcon />
                                    </Link>
                                  </Button>
                                </ButtonGroup>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function OverviewScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <DashboardContent />
    </motion.div>
  );
}
