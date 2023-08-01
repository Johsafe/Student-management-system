import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SideBarDetails from './SideBarDetails';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PaidIcon from '@mui/icons-material/Paid';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Copyright from '../../Utils/Copyright';
import { Helmet } from 'react-helmet-async';
import Header from '../../Utils/Header';

const mdTheme = createTheme();
function DashboardContent() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <SideBarDetails />
        <Box
          component="main"
          sx={{
            // backgroundColor: (theme) =>
            //   theme.palette.mode === 'light'
            //     ? theme.palette.grey[300]
            //     : theme.palette.grey[900],
            // backgroundColor: '#eceff1',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Header />
          <Container sx={{ mt: 0 }}>
            <div className="main">
              <h1>Dashboard</h1>
            </div>

            <div style={{ display: 'flex', gap: '5px' }}>
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
                    borderTop: '4px solid #42a5f5',
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
                    borderTop: '4px solid #42a5f5',
                  }}
                >
                  Courses Chart
                </Paper>
              </Grid>
              {/* Examination TimeTables */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    borderTop: '4px solid #42a5f5',
                  }}
                >
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
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>#</td>
                            <td>END OF SEMISTER </td>
                            <td>2022/2023</td>
                            <td>APRIL 2023</td>
                            <td>SSAES</td>
                          </tr>

                          <tr>
                            <td>#</td>
                            <td>END OF SEMISTER </td>
                            <td>2022/2023</td>
                            <td>APRIL 2023</td>
                            <td>SSTE</td>
                          </tr>

                          <tr>
                            <td>#</td>
                            <td>END OF SEMISTER </td>
                            <td>2022/2023</td>
                            <td>APRIL 2023</td>
                            <td>INFOCOMS</td>
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
    <div>
      <DashboardContent />
    </div>
  );
}
