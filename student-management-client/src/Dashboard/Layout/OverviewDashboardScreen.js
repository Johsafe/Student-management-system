import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SideBarDetails from "./SideBarDetails";
import Copyright from "../../Utils/Copyright";
import { Helmet } from "react-helmet-async";
import Header from "../../Utils/Header";
import RoomCard from "./RoomCard";
import ClassGroupCard from "./ClassGroupCard";
import StudentCard from "./Studentscard";
import CoursesCard from "./Coursescard";

const mdTheme = createTheme();
function DashboardContent() {
 

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <SideBarDetails />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Header />
          <Container sx={{ mt: 0 }}>
            <div className="main">
              <h1>Dashboard</h1>
            </div>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item lg={4} md={6} sm={6} xs={12}>
                    <StudentCard />
                  </Grid>
                  <Grid item lg={4} md={6} sm={6} xs={12}>
                    <CoursesCard />
                  </Grid>
                  <Grid item lg={4} md={12} sm={8} xs={12}>
                    <Grid container spacing={3}>
                      <Grid item sm={4} xs={12} md={6} lg={12}>
                        <ClassGroupCard />
                      </Grid>
                      <Grid item sm={4} xs={12} md={6} lg={12}>
                        <RoomCard />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{mt:1}}>
              {/* Rooms */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                    borderTop: "4px solid #42a5f5",
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
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                    borderTop: "4px solid #42a5f5",
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
                    display: "flex",
                    flexDirection: "column",
                    borderTop: "4px solid #42a5f5",
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
