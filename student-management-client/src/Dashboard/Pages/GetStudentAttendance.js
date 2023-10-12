import React, { useEffect, useState } from "react";
import Copyright from "../../Utils/Copyright";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import SideBarDetails from "../Layout/SideBarDetails";
import bg2 from "../../Static/bg2.png";
import MenuItem from "@mui/material/MenuItem";
import Header from "../../Utils/Header";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import { Link, useParams } from "react-router-dom";
import { base_url } from "../../Utils/baseUrl";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MessageBox from "../../Utils/MessageBox";

// const classgroup = [
//   {
//     value: "Bachelor of Graphics",
//     label: "GRP",
//   },
//   {
//     value: "Bachelor of Computer Science",
//     label: "COMP",
//   },
//   {
//     value: "Bachelor of Statistics",
//     label: "STATS",
//   },
//   {
//     value: "Info Science",
//     label: "Info Science",
//   },
// ];

export default function GetStudentAttendance() {
  const [courses, setCourses] = useState([]);
  async function getCourses() {
    try {
      const response = await fetch(`${base_url}course/courses`);
      const getcourses = await response.json();
      setCourses(getcourses);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getCourses();
  }, []);
  const [studentList, setStudentList] = useState([]);

  const [attendanceData, setAttendanceData] = useState({});
  const handleAttendanceChange = (studentId, attendance) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [studentId]: attendance,
    }));
  };
  // search from on submit
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <SideBarDetails />
      <Box
        component="main"
        sx={{
          // backgroundColor: '#eceff1',
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Header />
        <Container component="main">
          <Helmet>
            <title>Attendance</title>
          </Helmet>
          <div style={{ margin: "2rem" }}>
            <h1>Mark Attendance</h1>
            <Card
              style={{
                padding: "2rem",
                borderTop: "4px solid #42a5f5",
              }}
            >
              <div>
                <div>
                  <form
                  // onSubmit={formSubmit}
                  >
                    <Stack
                      spacing={3}
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <TextField
                        id="select-course"
                        sx={{ width: "200px" }}
                        select
                        label="Select course"
                        // defaultValue="Info Science"
                        helperText="Choose Course"
                        variant="standard"
                        // onChange={(e) => setGroup(e.target.value)}
                        // value={group._id}
                      >
                        {courses.map((course) => (
                          <MenuItem key={course._id} value={course._id}>
                            {course.code}-{course.title}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        id="select-session"
                        sx={{ width: "200px" }}
                        select
                        label="Select session"
                        // defaultValue="Info Science"
                        helperText="choose Session"
                        variant="standard"
                        // onChange={(e) => setGroup(e.target.value)}
                        // value={group._id}
                      >
                        {/* {classgroup.map((group) => (
                          <MenuItem key={group._id} value={group._id}>
                            {group.abbr}
                          </MenuItem>
                        ))} */}
                      </TextField>

                      <TextField
                        required
                        id="date"
                        label="date"
                        name="date"
                        autoFocus
                        variant="standard"
                        helperText="Please input date"
                      />
                      <Button variant="contained">
                        <Link className="link">Submit</Link>
                      </Button>
                    </Stack>
                  </form>
                  <Divider />
                  <Divider sx={{ m: 0.5 }} />
                </div>
                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8rem",
                  }}
                >
                  <div>
                    {/* <p>School</p> */}
                    <div style={{ display: "flex", gap: "1rem" }}>
                      {" "}
                      <b>Department</b>
                      <t />:<p>INFOCOMS</p>
                    </div>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      {" "}
                      <b>Year of Study</b>:<p>3</p>
                    </div>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      {" "}
                      <b>Academic Year</b>:<p>2023/2024</p>
                    </div>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <b>Date of Lecture</b>:<p>10-10-2023</p>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <b>Course Code</b>:<p>GPC 101</p>
                    </div>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <b>Course Title</b>:<p>Graphics</p>
                    </div>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      {" "}
                      <b>Topic Covered</b>:<p>Intro to graphics design</p>
                    </div>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <b>Name of Lecture</b>:<p>Johsafe</p>
                    </div>
                  </div>
                  {/* <p>Lectures Phone No.</p> */}
                </div>
                {/* <MessageBox variant="success">Please Select Filters</MessageBox> */}
                <Divider sx={{ m: 1 }} />
                <div>
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Admisson No.</th>
                        <th scope="col">lastname</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mark Attendance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tbody>
                        {courses.students &&
                          courses.students.map((student) => (
                            <tr key={student._id}>
                              <th scope="row">#</th>
                              {/* <th scope="row">{i++}</th> */}
                              <td>{student.admission} </td>
                              <td>{student.lastname}</td>
                              <td>{student.firstname} </td>
                              <td>{student.email} </td>
                            </tr>
                          ))}
                      </tbody>
                      <tr>
                        <td>#</td>
                        <td>CSC/001/2023</td>
                        <td>Mwamuye</td>
                        <td>Joseph</td>
                        <td>Joseph@gmail.com</td>

                        <td>
                          <FormControl>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                            >
                              <FormControlLabel
                                value="present"
                                control={<Radio />}
                                color="success"
                                size="small"
                                label="Present"
                                // checked={attendanceData[student._id] === 'absent'}
                                // onChange={() =>
                                //   handleAttendanceChange(student._id, 'present')
                                // }
                              />
                              <FormControlLabel
                                value="absent"
                                control={<Radio size="small" />}
                                color="danger"
                                label="Absent"
                                // checked={attendanceData[student._id] === 'absent'}
                                // onChange={() =>
                                //   handleAttendanceChange(student._id, 'absent')
                                // }
                              />
                              <FormControlLabel
                                value="excused"
                                control={<Radio sx={{ fontSize: "20px" }} />}
                                color="secondary"
                                label="Excused"
                                // checked={attendanceData[student._id] === 'excused'}
                                //           onChange={() =>
                                //   handleAttendanceChange(student._id, 'excused')
                                // }
                              />
                            </RadioGroup>
                          </FormControl>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </div>
  );
}
