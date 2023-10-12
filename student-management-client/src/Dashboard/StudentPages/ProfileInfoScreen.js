
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import profile from "../../Static/profile.png";
import Copyright from "../../Utils/Copyright";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import StudentUnitRegitration from "./StudentUnitRegitration ";
import ChangePassword from "./ChangePassword";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
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

const settings = ["Profile", "Account", "Logout"];
export default function ProfileInfoScreen() {
  let user = JSON.parse(localStorage.getItem("Details"));
  const [loading, setLoading] = useState(false);

  const signoutHandler = () => {
    localStorage.removeItem("Details");
    window.location.href = "/studentlogin";
  };
  //get a student
  const [student, setStudent] = useState([]);
  async function getAstudent() {
    try {
      const response = await fetch(
        `${base_url}student/student/${user._id}`
      );
      const astudent = await response.json();
      setStudent(astudent);
      setLoading(true);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getAstudent();
  }, []);
  //mui tabs
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
                <b>PresentAddress:</b>
                <p>{student.presentAddress}</p>
                <b>Gender:</b> <p>{student.gender}</p>
              </div>
              <div>
                <b>Lastname:</b> <p> {student.lastname}</p>
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

  //Other info
  function OtherInfo() {
    return (
      <div>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
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
      {" "}
      <div>
        <div className="nav">
          <div>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </div>
        </div>
        <Container>
          <Helmet>
            <title>Student Profile</title>
          </Helmet>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
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
                    src={student.studentPhoto}
                    style={{
                      width: "100%",
                      height: "320px",
                    }}
                    alt="prof"
                  />
                  <Divider />
                  <div style={{ textAlign: "center" }}>
                    <h3>
                      <b>
                        {student.firstname}<t/> {student.lastname}
                      </b>
                    </h3>
                   <p> Student</p>
                  </div>
                </div>
              </Card>
              <div>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ width: "100%", marginTop: "1rem" }}
                >
                  <Link
                   className="link"
                    to="/myprofile/update"
                  >
                    Update Profile
                  </Link>
                </Button>

                
                  {" "}
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{ width: "100%", marginTop: "1rem" }}
                    color="error"
                  >
                    <Link to="#signout" onClick={signoutHandler} className="link">
                    Log Out
                    </Link>
                  </Button>
                
              </div>
            </div>
            <div>
              <Box sx={{ width: "900px", textAlign: "center" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs value={value} onChange={handleChange}>
                    <Tab label="Information" {...a11yProps(0)} />
                    <Tab label="Other Information" {...a11yProps(1)} />
                    <Tab label="Unit Registration" {...a11yProps(2)} />
                    <Tab label="Change Password" {...a11yProps(3)} />
                    <Tab label="Setting" {...a11yProps(4)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <GeneralInfo />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <OtherInfo />
                </TabPanel>

                <TabPanel value={value} index={2}>
                  <StudentUnitRegitration group={student.group} studentId={student._id} student={student}/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <ChangePassword />
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <div>Settings</div>
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
