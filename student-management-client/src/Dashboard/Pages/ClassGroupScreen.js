import Card from "@mui/material/Card";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import SideBarDetails from "../Layout/SideBarDetails";
import Container from "@mui/material/Container";
import { getError } from "../../Utils/GetError";
import { toast } from "react-toastify";
import Copyright from "../../Utils/Copyright";
import { base_url } from "../../Utils/baseUrl";

export default function ClassGroupScreen() {
  const Token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [abbr, setAbbr] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfStudents, setNumberOfStudents] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [classPhoto, setClassPhoto] = useState([]);

  //create new group
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("classPhoto", classPhoto);
    data.append("abbr", abbr);
    data.append("title", title);
    data.append("description", description);
    data.append("numberOfStudents", numberOfStudents);
    data.append("academicYear", academicYear);
    try {
      const res = await fetch(`${base_url}classgroup/group`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${Token.token}`,
        },
        body: data,
      });
      toast.success("class added successfully");
      navigate("/groups");
    } catch (err) {
      toast.error(getError(err));
    }
  };


  //handle and convert it in base 64
    const handleProductImageUpload = (e) =>{
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    }

    const setFileToBase = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setClassPhoto(reader.result);
        }

    }
  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBarDetails />
        <Container component="main">
          <Helmet>
            <title>Class</title>
          </Helmet>
          <div style={{ margin: "3rem" }}>
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
                <Link to="/groups" className="link">
                  Go to Classes
                </Link>
              </Button>
              <div>
                <h1>Add Class Group</h1>
              </div>
            </div>

            <Card sx={{ borderTop: "4px solid #42a5f5" }}>
              <div>
                <form>
                  <div
                    style={{
                      padding: "1rem",
                      display: "flex",
                      gap: "1rem",
                      height: "500px",
                    }}
                  >
                    <div style={{ width: "50%" }}>
                      {/* {classPhoto ? (
                        <div>
                          <img
                            src={classPhoto}
                            alt='image'
                            sx={{
                              width: "100px",
                              height:'100px',
                              borderRadius: "50%",
                              border: " 1px solid #111",
                            }}
                            
                          />
                        </div>
                      ) : (
                        <p>Product image upload preview will appear here!</p>
                      )} */}

                      <div class="mb-2">
                        <label for="name" class="form-label">
                          Class Abbr.
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
                          Class Title
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div class="mb-2">
                        <label for="numberOfStudents" class="form-label">
                          Class numberOfStudents
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="numberOfStudents"
                          value={numberOfStudents}
                          onChange={(e) => setNumberOfStudents(e.target.value)}
                        />
                      </div>
                      <div class="mb-2">
                        <label for="academicyear" class="form-label">
                          Academic Year
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
                          Class Description
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
                        <label for="photo">ClassGroup Profile Image</label>
                        <input
                          type="file"
                          class="form-control"
                          id="photo"
                          name="photo"
                          accept="image/*"
                          onChange={(e)=>setClassPhoto(e.target.files[0])}
                          // onChange={handleProductImageUpload}
                        />
                      </div>

                      <Button
                        variant="contained"
                        size="medium"
                        sx={{ width: "100%" }}
                        onClick={onSubmitForm}
                      >
                        <Link className="link">Add Class</Link>
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </Card>
          </div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </div>
    </div>
  );
}
