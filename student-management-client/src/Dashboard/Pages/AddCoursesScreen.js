import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import SideBarDetails from "../Layout/SideBarDetails";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { getError } from "../../Utils/GetError";
import { toast } from "react-toastify";
import Copyright from "../../Utils/Copyright";
import { base_url } from "../../Utils/baseUrl";

export default function AddCoursesScreen() {
  const Token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [group, setGroup] = useState("");
  const [department, setDepartment] = useState("");
  const [semister, setSemister] = useState("");
  const [year, setYear] = useState("");

  //add course
  const handleSubmitCourse = async (e) => {
    e.preventDefault();
    try {
      const body = { group, code, title, department, semister, year };
      const courseadd = await fetch(`${base_url}course/create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${Token.token}`,
        },
        body: JSON.stringify(body),
      });
      await courseadd.json();
      toast.success("course added successfully");
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
            <title>Add Course</title>
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
              <Button variant="contained" size="medium" color="error">
                <Link to="/course" className="link">
                  Go to Courses
                </Link>
              </Button>

              <div>
                <h1>Add New Course</h1>
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
                    <div class="mb-2">
                      <label for="semister" class="form-label">
                        Semister
                      </label>
                      <input
                        type="text"
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
                      <Link className="link">Add Course</Link>
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
