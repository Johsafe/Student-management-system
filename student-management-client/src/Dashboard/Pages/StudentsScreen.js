import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import SideBarDetails from "../Layout/SideBarDetails";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import Copyright from "../../Utils/Copyright";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LoadingBox from "../../Utils/LoadingBox";
import { base_url } from "../../Utils/baseUrl";
import { TextField } from "@mui/material";
import DeleteStudentModalScreen from "./DeleteStudentModalScreen";

export default function AllStudentsScreen() {
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  //get Students
  async function getStudents() {
    try {
      const response = await fetch(`${base_url}student/students`);
      const getstudents = await response.json();
      setStudents(getstudents);
      setLoading(true);
      console.log(getstudents);
    } catch (err) {
      toast.error(getError(err));
    }
  }
  useEffect(() => {
    getStudents();
  }, []);

  //search student
  async function searchHandler(event) {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`${base_url}student/search/${key}`);
      result = await result.json();
      if (result) {
        setStudents(result);
      }
    } else {
      getStudents();
    }
  }

  var i = 1;
  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBarDetails />
        <Container>
          <Helmet>
            <title>StudentsScreen</title>
          </Helmet>
          <div style={{ margin: "3rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "4px solid #42a5f5",
              }}
            >
              <h1>All Students</h1>
              <div>
                {" "}
                <Button variant="contained" size="medium">
                  <Link to="/addstudent" className="link">
                    Add Student
                  </Link>
                </Button>
              </div>
            </div>
            <Container sx={{ mt: 1, marginLeft: "5px" }}>
              <TextField
                type="search"
                id="search"
                label="Search"
                sx={{ width: 600 }}
                onChange={searchHandler}
              />
            </Container>
            {loading ? (
              <div className="dashboard">
                <div>
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">S/N</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Admission</th>
                        <th scope="col">Group</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student._id}>
                          <th scope="row">{i++}</th>
                          <td>{student.lastname}</td>
                          <td>{student.firstname} </td>
                          <td>{student.admission} </td>
                          <td>{student.group.abbr} </td>
                          <td> {student.gender} </td>
                          <td>
                            <div>
                              <ButtonGroup
                                variant="text"
                                aria-label="text button group"
                                style={{ display: "flex" }}
                              >
                                <Button>
                                  <Link to={`/${student._id}/viewstudent`}>
                                    <VisibilityIcon />
                                  </Link>
                                </Button>
                                <DeleteStudentModalScreen student={student} />
                              </ButtonGroup>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <LoadingBox />
            )}
          </div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </div>
    </div>
  );
}
