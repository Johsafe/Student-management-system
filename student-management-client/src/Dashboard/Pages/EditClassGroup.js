import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "@mui/material/Container";
import { Button, Card, Divider, Grid, Paper } from "@mui/material";
import Copyright from "../../Utils/Copyright";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getError } from "../../Utils/GetError";
import { toast } from "react-toastify";
import { base_url } from "../../Utils/baseUrl";
import profile from "../../Static/profile.png";

export default function EditClassGroupScreen() {
  const navigate = useNavigate();
  const [abbr, setAbbr] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfStudents, setNumberOfStudents] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const params = useParams();

  // get a classgroup
  async function getaClass() {
    try {
      const response = await fetch(
        `${base_url}classgroup/group/${params.groupId}`
      );
      const getaclass = await response.json();
      setAbbr(getaclass.abbr);
      setTitle(getaclass.title);
      setDescription(getaclass.description);
      setNumberOfStudents(getaclass.numberOfStudents);
      setAcademicYear(getaclass.academicYear);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getaClass();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      let updateclass = await fetch(
        `${base_url}classgroup/group/${params.groupId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            abbr,
            title,
            description,
            academicYear,
            numberOfStudents,
          }),
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      await updateclass.json();
      toast.success("class updated successfully");
      navigate(`/groups/${params.groupId}/viewclass`);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Container component="main">
        <Helmet>
          <title>Edit Class Profile</title>
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
          <Button variant="contained" size="medium" color="error">
            <Link to={`/groups/${params.groupId}/viewclass`} className="link">
              Back to Class
            </Link>
          </Button>
          <div>
            <h1>Edit Class Group</h1>
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
                        alt="profile"
                        src={profile}
                        style={{
                          width: "100%",                          
                          height: "320px"
                        }}
                      />
                    </div>
                    
                    
                    <div
                      style={{
                        textAlign: "center",
                        marginBottom: "0.5rem",
                        marginTop: "1rem",
                      }}
                    >
                      <div>
                        <h3>
                          <b>{abbr}</b>
                        </h3>
                      </div>
                      <div>
                        <h4>{academicYear}</h4>
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
                    onClick={onSubmitForm}
                  >
                    Edit Class Profile
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
                  <form>
                    <div
                      style={{
                        padding: "1rem",
                        display: "flex",
                        gap: "3rem",
                        height: "250px",
                      }}
                    >
                      <div style={{ width: "50%" }}>
                        <div class="mb-2">
                          <label for="name" class="form-label">
                            <b>Class Abbr.</b>
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
                            <b> Class Title</b>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>

                        <div class="mb-2">
                          <label for="numberOfStudents" class="form-label">
                            <b> Class numberOfStudents</b>
                          </label>
                          <input
                            type="number"
                            class="form-control"
                            id="numberOfStudents"
                            value={numberOfStudents}
                            onChange={(e) =>
                              setNumberOfStudents(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div style={{ width: "50%" }}>
                        <div class="mb-2">
                          <label for="academicyear" class="form-label">
                            <b> Academic Year </b>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="academicyear"
                            value={academicYear}
                            onChange={(e) => setAcademicYear(e.target.value)}
                          />
                        </div>
                        <div class="mb-2">
                          <label for="description" class="form-label">
                            <b> Class Description </b>
                          </label>
                          <textarea
                            class="form-control"
                            id="description"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </div>

                        <div class="mb-2">
                          <label for="photo">
                            <b>ClassGroup Profile Image </b>
                          </label>
                          <input
                            type="file"
                            class="form-control"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            // defaultValue={student.studentPhoto}
                            // onChange={(e) => setStudentPhoto(e.target.files[0])}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>

        <Copyright sx={{ pt: 4 }} />
      </Container>
    </div>
  );
}
