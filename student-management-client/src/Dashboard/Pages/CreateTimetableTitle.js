import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Copyright from "../../Utils/Copyright";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import { Link } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import { base_url } from "../../Utils/baseUrl";

export default function CreateTimetableTitle() {
  const [title, setTitle] = useState("");
  const [examStartdate, setExamStartdate] = useState("");
  const [examStopdate, setExamStopdate] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [month, setMonth] = useState("");
  const [department, setDepartment] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        title,
        examStartdate,
        examStopdate,
        academicYear,
        month,
        department,
      };
      const result = await fetch(`${base_url}timetable/examtitle`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const ttl = await result.json();
      console.warn(ttl)
      window.location = "/create";
      toast.success("Exam Title Registered Successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  //get departments
  const [departments, setDepartments] = useState([]);
  async function getDepartment() {
    try {
      const response = await fetch(`${base_url}department/departments`);
      const getdept = await response.json();
      setDepartments(getdept);
    } catch (err) {
      toast.error(getError(err));
    }
  }
  useEffect(() => {
    getDepartment();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          // backgroundColor: '#eceff1',
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container sx={{ mt: 0 }}>
          <Helmet>
            <title>ExamTitle</title>
          </Helmet>
          <div>
            <Card
              style={{
                display: "flex",
                padding: "1rem",
                borderTop: "4px solid #42a5f5",
              }}
            >
              <div style={{ width: "50%" }}>
                <h1>ExamTitle</h1>
                <Divider />
                <form>
                  <div>
                    <div class="mb-2">
                      <label for="timetabletitle" class="form-label">
                        TimeTable Title
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="timetabletitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div lass="mb-2">
                      <label for="department" class="form-label">
                      School Department
                      </label>
                      <select
                        class="form-select"
                        aria-label="select example"
                        onChange={(e) => setDepartment(e.target.value)}
                        value={department._id}
                      >
                        <option selected>--Select Department--</option>
                        {departments.map((department) => (
                          <>
                            <option key={department._id} value={department._id}>
                              {department.abbr}
                            </option>
                          </>
                        ))}
                      </select>
                    </div>
                    <div style={{ display: "flex", gap: "5rem" }}>
                      <div class="mb-2">
                        <label for="academicYear" class="form-label">
                          Academic Year
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="academicYear"
                          value={academicYear}
                          onChange={(e) => setAcademicYear(e.target.value)}
                        />
                      </div>

                      <div class="mb-2">
                        <label for="month" class="form-label">
                          Month of the Exam
                        </label>
                        <input
                          style={{ width: "200px" }}
                          type="month"
                          class="form-control"
                          id="month"
                          value={month}
                          onChange={(e) => setMonth(e.target.value)}
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "5rem" }}>
                      <div class="mb-2">
                        <label for="startdate" class="form-label">
                          Exam Start Date
                        </label>
                        <input
                          style={{ width: "200px" }}
                          type="date"
                          class="form-control"
                          id="examStartdate"
                          value={examStartdate}
                          onChange={(e) => setExamStartdate(e.target.value)}
                        />
                      </div>
                      <div class="mb-2">
                        <label for="stopdate" class="form-label">
                          Exam Stop Date
                        </label>
                        <input
                          style={{ width: "200px" }}
                          type="date"
                          class="form-control"
                          id="examStopdate"
                          value={examStopdate}
                          onChange={(e) => setExamStopdate(e.target.value)}
                        />
                      </div>
                      
                    </div>
                    <Button
                      variant="contained"
                      size="medium"
                      sx={{ width: "100%" }}
                      onClick={onSubmitForm}
                    >
                      <Link className="link">Add Exam Title</Link>
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </div>
  );
}
