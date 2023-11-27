import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonGroup from "@mui/material/ButtonGroup";
import SideBarDetails from "../Layout/SideBarDetails";
import Container from "@mui/material/Container";
import Copyright from "../../Utils/Copyright";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../../Utils/Header";
import { base_url } from "../../Utils/baseUrl";
import EditDepartmentScreen from "./EditDepartmentScreen";

export default function DepartmentScreen() {
  //get department
  const Token = JSON.parse(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState([]);

  //register a department
  const [abbr, setAbbr] = useState("");
  const [title, setTitle] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        abbr,
        title,
      };
      const result = await fetch(`${base_url}department/department`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${Token.token}`,
        },
        body: JSON.stringify(body),
      });
      await result.json();
      window.location = "/department";
      toast.success("Department Registered Successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  //get departments
  async function getDepartment() {
    try {
      const response = await fetch(`${base_url}department/departments`);
      const getdept = await response.json();
      setDepartment(getdept);
      setLoading(true);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getDepartment();
  }, []);

  //delete deparments
  async function deleteDepts(id) {
    try {
      await fetch(`${base_url}department/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${Token.token}`,
        },
      });
      setDepartment(department.filter((department) => department._id !== id));
      toast.success("department deleted successfully");
      console.log(id);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  var i = 1;

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
        <Container sx={{ mt: 0 }}>
          <Helmet>
            <title>Department</title>
          </Helmet>
          <div style={{ margin: "2rem" }}>
            <h1>Department</h1>

            <Card
              style={{
                display: "flex",
                padding: "1rem",
                borderTop: "4px solid #42a5f5",
              }}
            >
              <div style={{ width: "50%" }}>
                <form>
                  <div style={{ padding: "2rem" }}>
                    <div class="mb-2">
                      <label for="abbr" class="form-label">
                        Abbr
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="abbr"
                        value={abbr}
                        onChange={(e) => setAbbr(e.target.value)}
                      />
                    </div>

                    <div class="mb-2">
                      <label for="title" class="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <Button
                      variant="contained"
                      size="medium"
                      sx={{ width: "100%" }}
                      onClick={onSubmitForm}
                    >
                      <Link className="link">Add Department</Link>
                    </Button>
                  </div>
                </form>
              </div>

              <div style={{ width: "60%" }}>
                {/* <div> */}
                {/* {loading ? ( */}
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">S/N</th>
                      <th scope="col">Abbr.</th>
                      <th scope="col">Title</th>
                      {/* <th scope="col">Action</th> */}
                      <th colSpan={2} className="text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {department.length > 0 ? (
                      department.map((depts) => (
                        <tr>
                          <th scope="row">{i++}</th>
                          <td>{depts.abbr}</td>
                          <td>{depts.title}</td>
                          <td>
                            <div>
                              <ButtonGroup
                                variant="text"
                                aria-label="text button group"
                                style={{ display: "flex" }}
                              >
                                <EditDepartmentScreen department={depts} />
                                <Button onClick={() => deleteDepts(depts._id)}>
                                  <DeleteIcon style={{ color: "red" }} />
                                </Button>
                              </ButtonGroup>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7}>
                          No Departments Found.Please Add New Departments
                        </td>
                      </tr>
                    )}

                    {/* ))} */}
                  </tbody>
                </table>
                {/* // ) : ( // <LoadingBox />
              // )} */}
              </div>
            </Card>
          </div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </div>
  );
}
