import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import ButtonGroup from "@mui/material/ButtonGroup";
import SideBarDetails from "../Layout/SideBarDetails";
import Container from "@mui/material/Container";
import LoadingBox from "../../Utils/LoadingBox";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import Copyright from "../../Utils/Copyright";
import { base_url } from "../../Utils/baseUrl";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteCourseModalScreen from "./DeleteCourseModalScreen";
import ReactPaginate from "react-paginate";

export default function CourseScreen() {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

  //get paginated courses
  // http://localhost:8000/system/course/pagination?page=0&limit=4
  useEffect(() => {
    currentPage.current = 1;
    getPaginatedCourses();
  }, []);

  //paginate
  function handlePageClick(e) {
    // console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedCourses();
  }
  // function changeLimit() {
  //   currentPage.current = 1;
  //   getPaginatedCourses();
  // }

  function getPaginatedCourses() {
    fetch(
      `${base_url}course/pagination?page=${currentPage.current}&limit=${limit}`,
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
    setLoading(true);
  }

  //get Courses

  // const [courses, setCourses] = useState([]);
  // async function getCourses() {
  //   try {
  //     const response = await fetch(`${base_url}course/courses`);
  //     const getcourses = await response.json();
  //     setCourses(getcourses);
  //     setLoading(true);
  //   } catch (err) {
  //     toast.error(getError(err));
  //   }
  // }

  // useEffect(() => {
  //   getCourses();
  // }, []);

  //search student
  async function searchHandler(event) {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`${base_url}course/search/${key}`);
      result = await result.json();
      if (result) {
        setData(result);
      }
    } else {
      getPaginatedCourses();
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
              <title>Units</title>
            </Helmet>
            <div style={{ margin: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h1>My Units</h1>
                <div>
                  {" "}
                  <Button
                    sx={{ width: "200px" }}
                    variant="contained"
                    size="medium"
                  >
                    <Link to="/add" className="link">
                      Add Course
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
                            placeholder="Search by course title ,"
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
                                <th scope="col">Code</th>
                                <th scope="col">Title</th>
                                <th scope="col">Department</th>
                                <th scope="col">Semeter</th>
                                <th scope="col">year</th>
                                <th scope="col">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data &&
                                data.map((course) => (
                                  <tr key={course.id}>
                                    <th scope="row">{i++}</th>
                                    <td>{course.code}</td>
                                    <td>{course.title}</td>
                                    <td>{course.department.abbr}</td>
                                    <td>{course.semister}</td>
                                    <td>{course.year}</td>
                                    <td>
                                      <div>
                                        <ButtonGroup
                                          variant="text"
                                          aria-label="text button group"
                                          style={{ display: "flex" }}
                                        >
                                          <Button>
                                            <Link to={`/${course._id}/edit`}>
                                              <EditIcon />
                                            </Link>
                                          </Button>
                                          <Button>
                                            <Link
                                              to={`/${course._id}/viewcourse`}
                                            >
                                              <VisibilityIcon />
                                            </Link>
                                          </Button>
                                          <DeleteCourseModalScreen
                                            course={course}
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
                        {/* <input
                          placeholder="Limit"
                          onChange={(e) => setLimit(e.target.value)}
                        />
                        <button onClick={changeLimit}>Set Limit</button> */}
                      </div>
                    ) : (
                      <LoadingBox />
                    )}
                  </Typography>
                </Paper>
              </div>
            </div>
            <Copyright />
          </Container>
        </Box>
      </div>
    </div>
  );
}
