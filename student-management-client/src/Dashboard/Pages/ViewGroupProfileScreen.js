import {
  Button,
  Card,
  Container,
  Divider,
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
import AdminUnitRegitration from "./AdminUnitRegitration";
import ClassStudentsScreen from "./ClassStudentsScreen";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import StudentAttendance from "./StudentAttendance";
import DeleteIcon from "@mui/icons-material/Delete";
import { base_url } from "../../Utils/baseUrl";

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
            display: "flex",
            flexDirection: "column",
            width: "800px",
            textAlign: "start",
          }}
        >
          <b>
            <h3>General Information</h3>
          </b>

          <div style={{ fontSize: "17px"}}>
            <p>
              {/* Class Title: <t /> */}
              {groups.title}
            </p>
            <p>
              {/* Total Students: */}
              <t />
              {groups.numberOfStudents} <t /> Students
            </p>
            <p>
              {/* Academic Year: */}
              <t />
              {groups.academicYear}
            </p>
            <p>
              {/* Description: */}
              <t />
              {groups.description}
            </p>
          </div>
        </Paper>
      </div>
    );
  }

  //Get Groups
  const params = useParams();
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  async function getGroups() {
    try {
      const response = await fetch(
        `${base_url}classgroup/group/${params.groupId}`
      );
      const getgroups = await response.json();
      setGroups(getgroups);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getGroups();
  }, []);

  //Delete class
  const deleteGroup = async (id) => {
    try {
      await fetch(`${base_url}classgroup/group/${id}`, {
        method: "DELETE",
      });
      toast.success("group deleted successfully");
      navigate("/groups");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div>
      {" "}
      <div>
        <Container sx={{ pt: 4 }}>
          <Helmet>
            <title>Class Profile</title>
          </Helmet>
          {/* <div> */}
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
              <Link to="/groups" className="link">
                Go to Classes
              </Link>
            </Button>
            <div>
              <h1>Class Profile</h1>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              // flexDirection: 'column',
              marginTop: "1rem",
              gap: "1rem",
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
                    src={"http://localhost:8000/" + groups.classPhoto}
                    style={{
                      width: "100%",
                      height: "320px"
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
                    <div>
                      <h3>
                        <b>{groups.abbr}</b>
                      </h3>
                    </div>
                    <div>
                      <h4>{groups.academicYear}</h4>
                    </div>
                  </div>
                </div>
              </Card>
              <div>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ width: "100%", marginTop: "0.5rem" }}
                >
                  <Link
                    to={`/groups/${groups._id}/classedit`}
                    
                    className="link"
                  >
                    Update Class
                  </Link>
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="medium"
                  sx={{ width: "100%", marginTop: "0.5rem" }}
                  onClick={() => deleteGroup(groups._id)}
                  startIcon={<DeleteIcon />}
                >
                  <Link className="link">Delete Class</Link>
                </Button>
              </div>
            </div>
            <div>
              <Box sx={{ width: "100%", textAlign: "center" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={value} onChange={handleChange}>
                    <Tab label="Information" {...a11yProps(0)} />
                    <Tab label="Class Unit Registred" {...a11yProps(1)} />
                    <Tab label="Students" {...a11yProps(2)} />
                    <Tab label="Student Attendance" {...a11yProps(3)} />
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
                <TabPanel value={value} index={3}>
                  <StudentAttendance />
                </TabPanel>
              </Box>
            </div>
          </div>
          <Container
            maxWidth="md"
            component="footer"
            sx={{
              borderTop: (theme) => `1px solid ${theme.palette.divider}`,
              py: [1, 4],
              mt: 2,
            }}
          >
            <Copyright />
          </Container>
        </Container>
      </div>
    </div>
  );
}
