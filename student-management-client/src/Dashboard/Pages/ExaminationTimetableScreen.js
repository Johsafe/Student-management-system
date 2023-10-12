import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ButtonGroup from "@mui/material/ButtonGroup";
import SideBarDetails from "../Layout/SideBarDetails";
import Container from "@mui/material/Container";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LoadingBox from "../../Utils/LoadingBox";
import Copyright from "../../Utils/Copyright";
import { base_url } from "../../Utils/baseUrl";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import moment from "moment";

export default function ExaminationTimetableScreen() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);
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

  useEffect(() => {
    getexamtitle();
  }, []);

  //delete course
  async function delExamtitle(id) {
    try {
      await fetch(`${base_url}timetable/${id}`, {
        method: "DELETE",
      });
      setExamtitles(examtitles.filter((examtitles) => examtitles._id !== id));
      toast.success("examtitle deleted successfully");
      console.log(id);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  var i = 1;
  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBarDetails />
        <Container>
          <Helmet>
            <title>EXAMINATION TIMETABLE</title>
          </Helmet>
          <div style={{ margin: "3rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "4px solid #42a5f5",
              }}
            >
              <h1>EXAM TIMETABLE</h1>
              <div>
                {" "}
                <Button variant="contained" size="medium">
                  <Link to="/create" className="link">
                    Create New Timetable
                  </Link>
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="dashboard">
                <div>
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Academic Year</th>
                        <th scope="col">Exam Month</th>
                        <th scope="col">DepartMent</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {examtitles.map((examtitle) => (
                        <tr>
                          <td>{i++}</td>
                          <td>{examtitle.title} </td>
                          <td>{examtitle.academicYear}</td>
                          <td>{moment(examtitle.month).format("MMMM-YYYY")}</td>
                          <td>{examtitle.department.abbr}</td>
                          <td>
                            <div>
                              <ButtonGroup
                                variant="text"
                                aria-label="text button group"
                                style={{ display: "flex" }}
                              >
                                <Button>
                                  <Link to="/examination/edit">
                                    <EditIcon />
                                  </Link>
                                </Button>
                                <Button
                                  onClick={() => delExamtitle(examtitle._id)}
                                >
                                  <DeleteIcon style={{ color: "red" }} />
                                </Button>
                                <Button>
                                  <Link to="/examination/view">
                                    <VisibilityIcon />
                                  </Link>
                                </Button>
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
