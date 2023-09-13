import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonGroup from "@mui/material/ButtonGroup";
import SideBarDetails from "../Layout/SideBarDetails";
import Container from "@mui/material/Container";
import Copyright from "../../Utils/Copyright";
import Header from "../../Utils/Header";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import { base_url } from "../../Utils/baseUrl";
import EditSessionScreen from "./EditSessionScreen";

export default function SessionScreen() {
  //register a period
  const [session, setSession] = useState("");
  const [starttime, setStarttime] = useState("");
  const [stoptime, setStoptime] = useState("");
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        session,
        starttime,
        stoptime,
      };
      const result = await fetch(`${base_url}period/period`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      await result.json();
      window.location = "/session";
      toast.success("Session Registered Successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  //get periods
  const [period, setPeriod] = useState([]);
  async function getperiod() {
    try {
      const response = await fetch(`${base_url}period/periods`);
      const getperiods = await response.json();
      setPeriod(getperiods);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getperiod();
  }, []);

  //delete course
  async function deletePeriod(id) {
    try {
      await fetch(`${base_url}period/${id}`, {
        method: "DELETE",
      });
      setPeriod(period.filter((period) => period._id !== id));
      toast.success("Session deleted successfully");
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
        <Container component="main">
          <Helmet>
            <title>Sessions</title>
          </Helmet>
          <div style={{ margin: "2rem" }}>
            <h1>Sessions</h1>

            <Card
              style={{
                display: "flex",
                padding: "2rem",
                borderTop: "4px solid #42a5f5",
              }}
            >
              <div style={{ width: "50%" }}>
                <form>
                  <div style={{ padding: "2rem" }}>
                    <div class="mb-2">
                      <label for="session" class="form-label">
                        Session
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="session"
                        value={session}
                        onChange={(e) => setSession(e.target.value)}
                      />
                    </div>
                    <div class="mb-2">
                      <label for="starttime" class="form-label">
                        Start-Time
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="starttime"
                        value={starttime}
                        onChange={(e) => setStarttime(e.target.value)}
                      />
                    </div>

                    <div class="mb-2">
                      <label for="stoptime" class="form-label">
                        Stop-Time
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="stoptime"
                        value={stoptime}
                        onChange={(e) => setStoptime(e.target.value)}
                      />
                    </div>

                    <Button
                      variant="contained"
                      size="medium"
                      sx={{ width: "100%" }}
                      onClick={onSubmitForm}
                    >
                      <Link className="link">Add Session</Link>
                    </Button>
                  </div>
                </form>
              </div>

              <div style={{ width: "60%" }}>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">S/N</th>
                      <th scope="col">Session</th>
                      <th scope="col">Start-Time</th>
                      <th scope="col">Stop-Time</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {period.length > 0 ? (
                      period.map((period) => (
                        <tr>
                          <th scope="row">{i++}</th>
                          <td>{period.session}</td>
                          <td>{period.starttime}</td>
                          <td>{period.stoptime}</td>

                          <td>
                            <div>
                              <ButtonGroup
                                variant="text"
                                aria-label="text button group"
                                style={{ display: "flex" }}
                              >
                                <EditSessionScreen period={period} />
                                <Button
                                  onClick={() => deletePeriod(period._id)}
                                >
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
                          No Sessions Found.Please Add New Sessions
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </div>
  );
}
