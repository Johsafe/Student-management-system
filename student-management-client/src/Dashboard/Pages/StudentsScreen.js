import React, { useEffect, useRef, useState } from "react";
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
import { Box, TextField } from "@mui/material";
import DeleteStudentModalScreen from "./DeleteStudentModalScreen";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import ReactPaginate from "react-paginate";

export default function AllStudentsScreen() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

  //get paginated courses
  // http://localhost:8000/system/student/pagination?page=0&limit=4
  useEffect(() => {
    currentPage.current = 1;
    paginatedStudents();
  }, []);

  //paginate
  function handlePageClick(e) {
    currentPage.current = e.selected + 1;
    paginatedStudents();
  }
  // function changeLimit() {
  //   currentPage.current = 1;
  //   paginatedStudents();
  // }

  function paginatedStudents() {
    fetch(
      `${base_url}student/pagination?page=${currentPage.current}&limit=${limit}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setPageCount(data.rowsPerPage);
        setData(data.data);
      });
  }

  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  //get Students
  async function getStudents() {
    try {
      const response = await fetch(`${base_url}student/students`);
      const getstudents = await response.json();
      setStudents(getstudents);
      setLoading(true);
      // console.log(getstudents);
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
        // setStudents(result);
        setData(result)
        
      }
    } else {
      // getStudents();
      paginatedStudents()
    }
  }

  var i = 1;
  return (
    <div>
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
          <Container>
            <Helmet>
              <title>StudentsScreen</title>
            </Helmet>
            <div style={{ margin: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
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
              <div>
                <Paper
                  sx={{ overflow: "hidden", borderTop: "4px solid #42a5f5" }}
                >
                  <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
                  >
                    <Toolbar>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <SearchIcon
                            color="inherit"
                            sx={{ display: "block" }}
                          />
                        </Grid>
                        <Grid item xs>
                          <TextField
                            fullWidth
                            placeholder="Search by firstname ,lastname ,"
                            InputProps={{
                              disableUnderline: true,
                              sx: { fontSize: "default" },
                            }}
                            variant="standard"
                            onChange={searchHandler}
                          />
                        </Grid>
                      </Grid>
                    </Toolbar>
                  </AppBar>
                  <Typography
                    sx={{ my: 2, mx: 2 }}
                    color="text.secondary"
                    align="center"
                  >
                    {loading ? (
                      <div className="dashboard">
                        <div>
                          <table class="table table-hover">
                            <thead>
                              <tr>
                                <th scope="col">S/N</th>
                                <th scope="col">Firstname</th>
                                <th scope="col">Lastname</th>
                                <th scope="col">Admission</th>
                                <th scope="col">Group</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data.map((student) => (
                                <tr key={student._id}>
                                  <th scope="row">{i++}</th>
                                  <td>{student.firstname} </td>
                                  <td>{student.lastname}</td>
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
                                          <Link
                                            to={`/${student._id}/viewstudent`}
                                          >
                                            <VisibilityIcon />
                                          </Link>
                                        </Button>
                                        <DeleteStudentModalScreen
                                          student={student}
                                        />
                                      </ButtonGroup>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <ReactPaginate
                          breakLabel="..."
                          nextLabel="next >"
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={5}
                          pageCount={pageCount}
                          previousLabel="< previous"
                          renderOnZeroPageCount={null}
                          marginPagesDisplayed={2}
                          containerClassName="pagination justify-content-center"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item"
                          previousLinkClassName="page-link"
                          nextClassName="page-item"
                          nextLinkClassName="page-link"
                          activeClassName="active"
                          forcePage={currentPage.current - 1}
                        />
                      </div>
                    ) : (
                      <LoadingBox />
                    )}
                  </Typography>
                </Paper>
              </div>
            </div>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </div>
    </div>
  );
}
