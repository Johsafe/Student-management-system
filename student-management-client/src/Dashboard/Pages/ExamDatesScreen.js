import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Copyright from "../../Utils/Copyright";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import { Link } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import { base_url } from "../../Utils/baseUrl";
import moment from "moment";

export default function ExamDatesScreen() {
  //get examdates
  const [examdates, setExamdates] = useState([]);

  //register a examdates
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        month,
        week,
        date,
        day,
      };
      const result = await fetch(`${base_url}examdates/examdates`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      await result.json();
      window.location = "/create";
      toast.success("examdates Registered Successfully");


    } catch (err) {
      toast.error(getError(err));
    }
  };

  //get examdatess
  async function getexamdates() {
    try {
      const response = await fetch(`${base_url}examdates/examdates`);
      const getdept = await response.json();
      setExamdates(getdept);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getexamdates();
  }, []);

  //delete course
  async function delExamdate(id) {
    try {
      await fetch(`${base_url}examdates/${id}`, {
        method: "DELETE",
      });
      setExamdates(examdates.filter((examdates) => examdates._id !== id));
      toast.success("examdates deleted successfully");
      console.log(id);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  var i = 1;

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
        <Container>
          <Helmet>
            <title>examdates</title>
          </Helmet>
          <Card
            style={{
              display: "flex",
              padding: "1rem",
              borderTop: "4px solid #42a5f5",
            }}
          >
            <div >
              <h1>Examdates</h1>
              <Divider />
              <form>
                <div style={{ padding: "2rem" }}>
                  <div class="mb-2">
                    <label for="month" class="form-label">
                      Month of the Exam
                    </label>
                    <input
                      style={{ width: "300px" }}
                      type="month"
                      class="form-control"
                      id="month"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                    />
                  </div>
                  <div class="mb-2">
                    <label for="code" class="form-label">
                      Exam Week
                    </label>
                    <select
                      class="form-select"
                      aria-label=" select department"
                      value={week}
                      onChange={(e) => setWeek(e.target.value)}
                    >
                      <option selected>--Select examdate--</option>
                      <option value="Week-1">week 1</option>
                      <option value="Week-2">Week 2</option>
                      <option value="Week-3">Week 3</option>
                    </select>
                  </div>


                  <div class="mb-2">
                    <label for="date" class="form-label">
                      Exam Day Date
                    </label>
                    <input
                      style={{ width: "300px" }}
                      type="date"
                      class="form-control"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div class="mb-2">
                    <label for="day" class="form-label">
                      Exam Day
                    </label>
                    <select
                      class="form-select"
                      aria-label=" select department"
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                    >
                      <option selected>--Select Exam Day--</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                    </select>
                  </div>

                  <Button
                    variant="contained"
                    size="medium"
                    sx={{ width: "100%" }}
                    onClick={onSubmitForm}
                  >
                    <Link className="link">Add ExamDates</Link>
                  </Button>
                </div>
              </form>
            </div>

            <div style={{ width: "60%" }}>
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">S/N</th>
                    <th scope="col">Month</th>
                    <th scope="col">Week</th>
                    <th scope="col">Day</th>                    
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {examdates.map((examsdate) => (
                    <tr>
                      <th scope="row">{i++}</th>
                      <td>{moment(examsdate.month).format("MMMM-YYYY")}</td>
                      <td>{examsdate.week}</td>
                      <td>{examsdate.day}</td>                      
                      <td>{moment(examsdate.date).format("ll")}</td>
                      <td>
                        <div>
                          <ButtonGroup
                            variant="text"
                            aria-label="text button group"
                            style={{ display: "flex" }}
                          >
                            <Button
                              //    onClick={handleShow}
                              data-toggle="modal"
                            >
                              <Link to={`/update/${examsdate._id}`}>
                                <EditIcon />
                              </Link>
                            </Button>
                            <Button onClick={() => delExamdate(examsdate._id)}>
                              <DeleteIcon style={{ color: "red" }} />
                            </Button>
                          </ButtonGroup>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </div>
  );
}
