import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBarDetails from "../Layout/SideBarDetails";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { getError } from "../../Utils/GetError";
import { toast } from "react-toastify";
import Copyright from "../../Utils/Copyright";
import { base_url } from "../../Utils/baseUrl";

export default function EditCoursesScreen() {
  //get course Details
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState('');
  const [department, setDepartment] = useState('');
  const [semister, setSemister] = useState("");
  const [year, setYear] = useState("");
  const params = useParams();

  async function getACourse() {
    console.warn(params);
    try {
      const response = await fetch(`${base_url}course/${params.id}`);
      const getacourse = await response.json();
      setCourse(getacourse);
      setCode(getacourse.code);
      setTitle(getacourse.title);
      setGroup(getacourse.group.abbr);
      setDepartment(getacourse.department.abbr);
      setSemister(getacourse.semister);
      setYear(getacourse.year);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getACourse();
  }, []);

  //edit course
  const handleSubmitCourse = async (e) => {
    e.preventDefault();
    try {
      let updatecourse = await fetch(`${base_url}course/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ code, title, semister, year }),
        headers: {
          "Content-Type": "Application/json",
          // authorization: `Bearer ${Info.token}`,
        },
      });
      await updatecourse.json();
      toast.success("course updated successfully");
      navigate("/course");
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

  //get groups
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
  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBarDetails />
        <Container>
          <Helmet>
            <title>Edit Course</title>
          </Helmet>
          <div style={{ padding: "3rem" }}>
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
                <Link to="/course" className="link">
                  Go to Course
                </Link>
              </Button>
              <div>
                <h1>Edit New Course</h1>
              </div>
            </div>

            <Card sx={{ borderTop: "4px solid #42a5f5" }}>
              <form>
                <div style={{ padding: "2rem" }}>
                  <div>
                    <div class="mb-2">
                      <label for="code" class="form-label">
                        Course Code
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </div>
                    <div class="mb-2">
                      <label for="title" class="form-label">
                        Course Title
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}

                      />
                    </div>

                    <div lass="mb-2">
                      <label for="department" class="form-label">
                        Department
                      </label>
                      <select
                        class="form-select"
                        aria-label="select example"
                        onChange={(e) => setDepartment(e.target.value)}
                        value={department._id}
                        defaultValue={department}
                      >
                        <option>--Select Department--</option>
                        {departments.map((department) => (
                          <>
                            {/* <option value={}>{department.abbr}</option> */}
                            <option key={department._id} value={department._id}>
                              {department.abbr}
                            </option>
                          </>
                        ))}
                      </select>
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
                            {/* <option value={}>{group.abbr}</option> */}
                            <option key={group._id} value={group._id}>
                              {group.abbr}
                            </option>
                          </>
                        ))}
                      </select>
                    </div>
                    <div class="mb-2">
                      <label for="semister" class="form-label">
                        Semister
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="semister"
                        value={semister}
                        onChange={(e) => setSemister(e.target.value)}
                      />
                    </div>
                    <div class="mb-2">
                      <label for="year" class="form-label">
                        Year
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </div>
                    <Button
                      variant="contained"
                      size="medium"
                      sx={{ width: "100%" }}
                      onClick={handleSubmitCourse}
                    >
                      <Link className="link">Edit Course</Link>
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </div>
    </div>
  );
}
