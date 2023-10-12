import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import SideBarDetails from "../Layout/SideBarDetails";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExamDatesScreen from "./ExamDatesScreen";
import CreateTimetableTitle from "./CreateTimetableTitle";
import { base_url } from "../../Utils/baseUrl";
import { getError } from "../../Utils/GetError";
import { toast } from "react-toastify";
import moment from "moment";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";

//tabs
function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
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

export default function CreateTimeTableScreen() {
  //basic tabs
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // get exam title
  const [examtitles, setExamtitles] = useState([]);

  //get examdatess
  async function getexamtitle() {
    try {
      const response = await fetch(`${base_url}timetable/examtitles`);
      const gettitle = await response.json();
      setExamtitles(gettitle);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  //get examdates
  const [examdates, setExamdates] = useState([]);
  async function getexamdates() {
    try {
      const response = await fetch(`${base_url}examdates/examdates`);
      const getdept = await response.json();
      setExamdates(getdept);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  //get exam periods
  const [periods, setPeriods] = useState([]);
  async function getperiod() {
    try {
      const response = await fetch(`${base_url}period/periods`);
      const getperiods = await response.json();
      setPeriods(getperiods);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  //get exam groups
  const [groups, setGroups] = useState([]);
  async function getGroups() {
    try {
      const response = await fetch(`${base_url}classgroup/group`);
      const getgroups = await response.json();
      setGroups(getgroups);
    } catch (err) {
      console.error(err.message);
      toast.error(getError(err));
    }
  }
  //get exam courses
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

  //get exam venue
  const [rooms, setRooms] = useState([]);
  async function getrooms() {
    try {
      const response = await fetch(`${base_url}room/rooms`);
      const getroom = await response.json();
      setRooms(getroom);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getexamtitle();
    getexamdates();
    getperiod();
    getGroups();
    getCourses();
    getrooms();
  }, []);

  //create examtimetable
  const [name, setName] = useState("");
  const [examdate, setExamdate] = useState("");
  const [timeOfday, setTimeOfday] = useState("");
  const [period, setPeriod] = useState("");
  const [group, setGroup] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [venue, setVenue] = useState("");
  const [noofexaminas, setNoofexaminas] = useState("");
  const [invigilator, setInvigilator] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      name,
      examdate,
      timeOfday,
      period,
      group,
      course,
      year,
      venue,
      noofexaminas,
      invigilator
    );

    try {
      const body = {
        name,
        examdate,
        timeOfday,
        period,
        group,
        course,
        year,
        venue,
        noofexaminas,
        invigilator,
      };
      const result = await fetch(`${base_url}timetable/create`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      await result.json();
      toast.success("timetable created successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  function TableContent() {
    return (
      <div>
        <Card sx={{ borderTop: "4px solid #42a5f5" }}>
          <form style={{ padding: "2rem" }}>
            <div style={{ display: "flex", gap: "2rem" }}>
              {/* part B of examtimetable */}
              <div>
                <div lass="mb-2">
                  <label for="title" class="form-label">
                    Exam Title
                  </label>
                  <select
                    class="form-select"
                    aria-label=" select example"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  >
                    <option selected>--Select ExamTitle--</option>
                    {examtitles.map((examtitle) => (
                      <>
                        <option key={examtitle._id} value={examtitle._id}>
                          {examtitle.title}--{examtitle.department.abbr}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
                <div style={{ display: "flex", gap: "2.1rem" }}>
                  <div class="mb-2">
                    <label for="code" class="form-label">
                      Exam Date
                    </label>
                    <select
                      class="form-select"
                      aria-label=" select department"
                      value={examdate}
                      onChange={(e) => setExamdate(e.target.value)}
                    >
                      <option selected>--Select examdate--</option>
                      {examdates.map((examdate) => (
                        <>
                          <option key={examdate._id} value={examdate._id}>
                            {examdate.day}--{moment(examdate.date).format("LL")}
                          </option>
                        </>
                      ))}
                    </select>
                  </div>

                  <div class="mb-2">
                    <label for="time" class="form-label">
                      Exam Period
                    </label>
                    <select
                      class="form-select"
                      aria-label="select example"
                      onChange={(e) => setPeriod(e.target.value)}
                      value={period._id}
                    >
                      <option selected>--Select exam period--</option>
                      {periods.map((period) => (
                        <>
                          <option key={period._id} value={period._id}>
                            {period.session}--{period.starttime}
                          </option>
                        </>
                      ))}
                    </select>
                  </div>
                </div>
                <div lass="mb-2">
                  <label for="group" class="form-label">
                    Class Group
                  </label>
                  <select
                    class="form-select"
                    aria-label="select example"
                    onChange={(e) => setGroup(e.target.value)}
                    value={group._id}
                  >
                    <option selected>--Select class Group--</option>
                    {groups.map((group) => (
                      <>
                        <option key={group._id} value={group._id}>
                          {group.abbr}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
                <div lass="mb-2">
                  <label for="group" class="form-label">
                    Courses
                  </label>
                  <select
                    class="form-select"
                    aria-label="select example"
                    onChange={(e) => setCourse(e.target.value)}
                    value={course._id}
                  >
                    <option selected>--Select course--</option>
                    {courses.map((course) => (
                      <>
                        <option key={course._id} value={course._id}>
                          {course.code}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
                <div style={{ display: "flex", gap: "2rem" }}>
                  <div class="mb-2">
                    <label for="room" class="form-label">
                      Room/Venue
                    </label>
                    <select
                      class="form-select"
                      aria-label="select example"
                      onChange={(e) => setVenue(e.target.value)}
                      value={venue._id}
                    >
                      <option selected>----Select venue----</option>
                      {rooms.map((room) => (
                        <>
                          <option key={room._id} value={room._id}>
                            {room.title}
                          </option>
                        </>
                      ))}
                    </select>
                  </div>
                  <div class="mb-2">
                    <label for="number" class="form-label">
                      No. of Examina
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="noofexaminas"
                      value={noofexaminas}
                      onChange={(e) => setNoofexaminas(e.target.value)}
                    />
                  </div>
                </div>
                <div class="mb-2">
                  <label for="timeOfDay" class="form-label">
                    Time Of Day
                  </label>
                  <input
                    type="string"
                    class="form-control"
                    id="timeOfday"
                    value={timeOfday}
                    onChange={(e) => setTimeOfday(e.target.value)}
                  />
                </div>
                <div class="mb-2">
                  <label for="year" class="form-label">
                    Year
                  </label>
                  <input
                    type="string"
                    class="form-control"
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
                <div class="mb-2">
                  <label for="year" class="form-label">
                    Invigilator
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="invigilator"
                    value={invigilator}
                    onChange={(e) => setInvigilator(e.target.value)}
                  />
                </div>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ width: "100%" }}
                  onClick={handleSubmit}
                >
                  <Link className="link">Create ExamTimeTable</Link>
                </Button>
              </div>
            </div>
          </form>
        </Card>
        ;
      </div>
    );
  }
  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBarDetails />
        <Container>
          <Helmet>
            <title>Create TimeTable</title>
          </Helmet>
          <div style={{ padding: "2rem" }}>
            <div
              style={{
                display: "flex",
                gap: "5rem",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {" "}
              <Button variant="contained" size="medium" color="error">
                <Link to="/examination" className="link">
                  Go to Created Examination
                </Link>
              </Button>
              <div>
                <h1>Create TimeTable</h1>
              </div>
            </div>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Create ExamTitles" {...a11yProps(0)} />
                  <Tab label="Create ExamDates" {...a11yProps(1)} />
                  <Tab label="Create TimeTable-Contents" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <CreateTimetableTitle />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <ExamDatesScreen />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                <TableContent />
              </CustomTabPanel>
            </Box>
          </div>
        </Container>
      </div>
    </div>
  );
}
