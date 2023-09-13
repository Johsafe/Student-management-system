import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import profile from "../../Static/profile.png";
import Copyright from "../../Utils/Copyright";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import StudentUnitRegitration from "../StudentPages/StudentUnitRegitration ";
import { getError } from "../../Utils/GetError";
import { toast } from "react-toastify";
import { base_url } from "../../Utils/baseUrl";
import DeleteIcon from "@mui/icons-material/Delete";

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ViewStudentScreen() {
  const params = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState([]);

  //get student
  async function getStudent() {
    try {
      const response = await fetch(
        `${base_url}student/student/${params.studentId}`
      );
      const getstudent = await response.json();
      setStudent(getstudent);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getStudent();
  }, []);

  //delete student
  async function deleteStudent(id) {
    try {
      await fetch(`${base_url}student/group/${params.id}/students/${id}`, {
        method: "DELETE",
      });
      toast.success("student deleted successfully");
      navigate("/studentreg");
    } catch (err) {
      toast.error(getError(err));
    }
  }
  //suspend student
  async function suspendStudent(id) {
    try {
      await fetch(`${base_url}student/suspend/${id}`, {
        method: "PUT",
      });
      toast.success("student is suspended");
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
              display: "flex",
              flexDirection: "column",
              width: "800px",
              justifyContent: "center",
            }}
          >
            <b>
              <h3>General Information</h3>
            </b>
            <div
              style={{
                display: "flex",
                gap: "3rem",
                padding: "1rem",
              }}
            >
              <div>
                <b>Firstname:</b> <p>{student.firstname}</p>
                <b>Admission:</b>
                <p>{student.admission}</p>
                <b>Class:</b>
                {/* <p>{student.group.title}</p> */}
                <p></p>
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
        </Grid>
      </div>
    );
  }

  //general info
  function OtherInfo() {
    return (
      <div>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              width: "800px",
              marginTop: "2rem",
            }}
          >
            <b>
              <h3>Other Information</h3>
            </b>
            <div
              style={{
                display: "flex",
                gap: "3rem",
                padding: "1rem",
              }}
            >
              {/* <div>
                <b>Mother's Names:</b> <p></p>
                <b>Father's Names:</b>
                <p></p>
              </div>
              <div>
                <b>Mother's Contact:</b> <p></p>
                <b>Father's Contact:</b>
                <p></p>
              </div> */}
            </div>
          </Paper>
        </Grid>
      </div>
    );
  }
  return (
    <div>
      {" "}
      <div>
        <Container sx={{ pt: 4 }}>
          <Helmet>
            <title>Student Profile</title>
          </Helmet>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #42a5f5",
            }}
          >
            {" "}
            <Button variant="contained" size="medium" color="error">
              <Link to="/studentreg" className="link">
                Go to Students
              </Link>
            </Button>
            <div>
              <h1>Student Profile</h1>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <div>
              <Card
                sx={{
                  width: 250,
                      height: 420,
                      borderTop: "4px solid #42a5f5",
                }}
              >
                <div>
                  <img
                    src={"http://localhost:8000/" + student.studentPhoto}
                    style={{
                      width: "100%", height: "320px" 
                    }}
                    alt={profile}
                  />
                <Divider />
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "0.5rem",
                    marginTop: "1rem",
                  }}
                >
                  <h4>
                    <b>
                      {student.firstname}
                      <t /> {student.lastname}
                    </b>
                  </h4>
                  <h4>
                    <b>{student.admission}</b>
                  </h4>
                </div>
                </div>
              </Card>
              <div>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ width: "100%", marginTop: "0.5rem" }}
                >
                  <Link to={`/${student._id}/editstudent`} className="link">
                    Update Student
                  </Link>
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  size="medium"
                  sx={{ width: "100%", marginTop: "0.5rem" }}
                  onClick={() => deleteStudent(student._id)}
                  startIcon={<DeleteIcon />}
                >
                  <Link className="link">Delete Student</Link>
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="medium"
                  sx={{ width: "100%", marginTop: "0.5rem" }}
                  onClick={() => suspendStudent(student._id)}
                >
                  <Link className="link">Suspend Student</Link>
                </Button>
              </div>
            </div>
            <div>
              <Box sx={{ width: "100%", textAlign: "center" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={value} onChange={handleChange}>
                    <Tab label="Information" {...a11yProps(0)} />
                    <Tab label="Other Information" {...a11yProps(1)} />
                    <Tab label="Unit Registration" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <GeneralInfo />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <OtherInfo />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <StudentUnitRegitration />
                </TabPanel>
              </Box>
            </div>
          </div>
          <Container
            maxWidth="md"
            component="footer"
            sx={{
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              mt: 2,
              py: [1, 4],
            }}
          >
            <Copyright />
          </Container>
        </Container>
      </div>
    </div>
  );
}
