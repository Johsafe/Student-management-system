import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import { Helmet } from "react-helmet-async";
import { Card, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import Copyright from "../../Utils/Copyright";
import { base_url } from "../../Utils/baseUrl";

export default function EditStudentScreen() {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("Details"));
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = React.useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [DOB, setDOB] = useState("");
  const [presentAddress, setPresentAddress] = useState("");
  const [studentPhoto, setStudentPhoto] = useState([]);

  const editStudent = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("studentPhoto", studentPhoto);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("phone", phone);
    formData.append("DOB", DOB);
    formData.append("presentAddress", presentAddress);
    try {
      let result = await fetch(
        `${base_url}student/myprofile/${user._id}/update`,
        {
          method: "PUT",
          body: formData,
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      toast.success("student editted successfully");
      navigate("/profile");
    } catch (err) {
      toast.error(getError(err));
    }
  };
  //get student details
  async function getAstudent() {
    try {
      const response = await fetch(`${base_url}student/student/${user._id}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
      const astudent = await response.json();
      setFirstname(astudent.firstname);
      setLastname(astudent.lastname);
      setEmail(astudent.email);
      setGender(astudent.gender);
      setPhone(astudent.phone);
      setDOB(astudent.DOB);
      setPresentAddress(astudent.presentAddress);
      setStudentPhoto(astudent.studentPhoto);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getAstudent();
  }, []);

  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <Container>
          <Helmet>
            <title>Edit Student Profile</title>
          </Helmet>
          <div
            style={{
              display: "flex",
              gap: "5rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <div>
              <Link
                className="link"
                sx={{ textDecoration: "none", color: "white" }}
                to="/profile"
              >
                <Button variant="contained" size="medium" color="error">
                  Back to Profile
                </Button>
              </Link>
            </div>
            <div>
              <h1>Edit Student Profile</h1>
            </div>
          </div>

          <div>
            <div style={{ padding: "1rem" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                  <Card
                    sx={{
                      width: 250,
                      height: 420,
                      borderTop: "4px solid #42a5f5",
                    }}
                  >
                     <div>
                      <img
                        className="media"
                        alt={firstname}
                        src={studentPhoto}
                        style={{
                          width: "100%",                          
                          height: "320px"
                        }}
                      />
                    </div>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                      <div>
                        <h5>
                          <b>{user.admission} </b>
                        </h5>
                        {/* <h5>
                          <b>{user.group.abbr}</b>
                        </h5> */}
                      </div>
                    </div>
                  </Card>
                  <div style={{ marginTop: "1rem" }}>
                    <Button
                      variant="contained"
                      size="medium"
                      sx={{ width: "100%" }}
                      type="submit"
                      value="send"
                      onClick={editStudent}
                    >
                      {/* <Link className="link"> */}
                      Edit Profile
                      {/* </Link>    */}
                    </Button>
                  </div>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      borderTop: "4px solid #42a5f5",
                    }}
                  >
                    <b>
                      <h3>General Information</h3>
                    </b>
                    <div
                      style={{
                        display: "flex",
                        gap: "3rem",
                        padding: "1rem",
                      }}
                    >
                      <div
                        style={{
                          width: "22rem",
                        }}
                      >
                        <div>
                          <div>
                            <label for="firstname" class="form-label">
                              <b>Student First Name </b>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="firstname"
                              value={firstname}
                              onChange={(e) => setFirstname(e.target.value)}
                            />
                          </div>
                          <div class="mb-2">
                            <label for="email" class="form-label">
                              <b> Student Email </b>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>

                          <div class="mb-2">
                            <label for="presentAddress" class="form-label">
                              <b> Student presentAddress </b>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="presentAddress"
                              value={presentAddress}
                              onChange={(e) =>
                                setPresentAddress(e.target.value)
                              }
                            />
                          </div>
                          <div class="mb-2">
                            <label for="gender" class="form-label">
                              <b> Student Gender </b>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="gender"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          width: "22rem",
                        }}
                      >
                        <div>
                          <div>
                            <label for="lastname" class="form-label">
                              <b> Student Last Name </b>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="lastname"
                              value={lastname}
                              onChange={(e) => setLastname(e.target.value)}
                            />
                          </div>

                          <div class="mb-2">
                            <label for="DOB" class="form-label">
                              <b> Student Date of Birth </b>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="DOB"
                              value={DOB}
                              onChange={(e) => setDOB(e.target.value)}
                            />
                          </div>
                          <div class="mb-2">
                            <label for="phone" class="form-label">
                              <b> Student Phone Number </b>
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              id="phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                          <div>
                            <div class="mb-2">
                              <label for="photo">
                                <b>Student Profile Image </b>
                              </label>

                              <input
                                type="file"
                                class="form-control"
                                id="photo"
                                name="photo"
                                accept="image/*"
                                defaultValue={studentPhoto}
                                onChange={(e) =>
                                  setStudentPhoto(e.target.files[0])
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Paper>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "2rem",
                    }}
                  >
                    <b>
                      <h3>Other Information</h3>
                    </b>
                    <div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quas reprehenderit nobis beatae necessitatibus amet
                      officiis obcaecati tempore. Deleniti odit distinctio
                      dolorum itaque ex labore quos quae consequuntur quisquam,
                      pariatur quas.
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>

          <Copyright sx={{ pt: 4 }} />
        </Container>
      </div>
    </div>
  );
}
