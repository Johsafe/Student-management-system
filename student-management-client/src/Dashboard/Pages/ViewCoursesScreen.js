import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import { Helmet } from "react-helmet-async";
import { Card, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import Copyright from "../../Utils/Copyright";
import { base_url } from "../../Utils/baseUrl";
import DeleteIcon from "@mui/icons-material/Delete";
import courseprof from "../../Static/courseprof.png";

export default function ViewCourseScreen() {
  const Token = JSON.parse(localStorage.getItem("token"));
  const params = useParams();
  const [courses, setCourses] = useState([]);
  async function getCourses() {
    try {
      const response = await fetch(`${base_url}course/${params.courseId}`);
      const getcourses = await response.json();
      setCourses(getcourses);
      console.log(getcourses);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getCourses();
  }, []);
  //delete course
  async function deleteCourse(id) {
    try {
      await fetch(`${base_url}course/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${Token.token}`,
        },
      });
      setCourses(courses.filter((courses) => courses._id !== id));
      toast.success("course deleted successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  }

  var i = 1;
  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <Container>
          <Helmet>
            <title>View Course Student </title>
          </Helmet>
          <div
            style={{
              display: "flex",
              gap: "5rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <div>
              <Link
                to="/course"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button variant="contained" size="medium" color="error">
                  Back to Courses
                </Button>
              </Link>
            </div>
            <div>
              <h1>Students For The Course</h1>
            </div>
          </div>

          <div>
            <div style={{ padding: "1rem" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                  <Card
                    sx={{
                      borderTop: "4px solid #42a5f5",
                      width: 250,
                      height: 380,
                    }}
                  >
                    <div>
                      <img
                        src={courseprof}
                        style={{
                          width: "100%",
                          marginTop: "3rem",
                        }}
                        alt="courseProfile"
                      />
                      <Divider />
                      <div
                        style={{
                          textAlign: "center",
                          marginBottom: "0.5rem",
                          marginTop: "1rem",
                          padding: "0.3rem",
                        }}
                      >
                        <h4>
                          <b>{courses.code}</b>
                        </h4>
                        <h4>
                          <b>
                            Semister
                            <t />
                            {courses.semister}
                          </b>
                        </h4>
                      </div>
                    </div>
                  </Card>
                  <div>
                    <Button
                      variant="contained"
                      color="error"
                      size="medium"
                      sx={{ width: "100%", marginTop: "0.5rem" }}
                      onClick={() => deleteCourse(courses._id)}
                      startIcon={<DeleteIcon />}
                    >
                      <Link className="link">Delete Course</Link>
                    </Button>
                  </div>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      borderTop: "4px solid #42a5f5",
                      color: "#fff",
                      mb: 2,
                      backgroundColor: "grey.400",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "30rem",
                      }}
                    >
                      <h1>{courses.title}</h1>
                    </div>
                  </Paper>
                  <Paper
                    sx={{
                      p: 2,
                      flexDirection: "column",
                      mb: 2,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "30rem",
                      }}
                    >
                      <h3>Course Outline</h3>
                    </div>
                  </Paper>
                  <Paper
                    sx={{
                      p: 2,
                      overflow: "hidden",
                      flexDirection: "column",
                    }}
                  >
                    <b>
                      <h3>Course Students</h3>
                    </b>
                    <div className="dashboard">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">S/N</th>
                            <th scope="col">Admission</th>
                            <th scope="col">Lastname</th>
                            <th scope="col">Firstname</th>
                            <th scope="col">Email</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Phone</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {courses.students &&
                            courses.students.map((student) => (
                              <tr key={student._id}>
                                <th scope="row">{i++}</th>
                                <td>{student.admission} </td>
                                <td>{student.lastname}</td>
                                <td>{student.firstname} </td>
                                <td>{student.email} </td>
                                <td> {student.gender} </td>
                                <td> {student.phone} </td>
                              </tr>
                            ))} */}
                        </tbody>
                      </table>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>

          <Copyright sx={{ pt: 4 }} />
        </Container>
      </div>
    </div>
  );
}
