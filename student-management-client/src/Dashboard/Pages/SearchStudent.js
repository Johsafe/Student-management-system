import React, { useEffect, useState } from "react";
import Copyright from "../../Utils/Copyright";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import SideBarDetails from "../Layout/SideBarDetails";
// import bg2 from "../../Static/bg2.png";
// import MenuItem from "@mui/material/MenuItem";
import Header from "../../Utils/Header";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import { Link } from "react-router-dom";
import { base_url } from "../../Utils/baseUrl";

export default function SearchStudent() {
  const [student, setStudent] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [admission, setAdmission] = useState("");

  //search
  async function GetStudentSearched() {
    try {
      const url = `${base_url}student/search?lastname=${lastname}&firstname=${firstname}&admission=${admission}`;
      // const { getdata } = await axios.get(url);
      const response = await fetch(url);
      const getdata = await response.json();
      setStudent(getdata.student);
      console.log(getdata);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  //Get Groups
  // const [groups, setGroups] = useState([]);
  // async function getGroups() {
  //   try {
  // const response = await fetch(`${base_url}classgroup/group`);
  // const getgroups = await response.json();
  // setGroups(getgroups);
  // console.log(getgroups);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }

  // useEffect(() => {
  //   getGroups();
  // }, []);
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
            <title>Search</title>
          </Helmet>
          <div style={{ margin: "2rem" }}>
            <h1>Search For A Student</h1>
            <Card
              style={{
                padding: "2rem",
                borderTop: "4px solid #42a5f5",
              }}
            >
              <div>
                <form
                // onSubmit={formSubmit}
                >
                  <Stack
                    spacing={3}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <TextField
                      required
                      id="lastname"
                      label="Lastname"
                      name="lastname"
                      autoFocus
                      variant="standard"
                      helperText="Please input student lastname"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />

                    <TextField
                      required
                      id="firstname"
                      label="Firstname"
                      name="firstname"
                      autoFocus
                      variant="standard"
                      helperText="Please input student firstname"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />

                    {/* <TextField
                      id="select-class"
                      select
                      label="Select Class"
                      // defaultValue="Info Science"
                      helperText="Please select student class"
                      variant="standard"
                      // onChange={(e) => setGroup(e.target.value)}
                      // value={group._id}
                    >
                      {groups.map((group) => (
                        <MenuItem key={group._id} value={group._id}>
                          {group.abbr}
                        </MenuItem>
                      ))}
                    </TextField> */}

                    <TextField
                      required
                      id="admission"
                      label="Admission"
                      name="admission"
                      autoFocus
                      variant="standard"
                      helperText="Please input student admission"
                      value={admission}
                      onChange={(e) => setAdmission(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      onClick={() => GetStudentSearched()}
                    >
                      <Link className="link">Search Student</Link>
                    </Button>
                  </Stack>
                </form>
                <Divider sx={{ m: 3 }} />
              </div>

              <div>
                {/* {student.length > 0 ? ( */}
                <div className="profile-card-2">
                  <img
                    src={student.studentPhoto}
                    className="img img-responsive"
                    alt={student.firstname}
                  />
                  <Link to={`/${student._id}/viewstudent`}>
                    <div class="profile-name">
                      {student.firstname} <t /> {student.lastname}
                    </div>
                    <div class="profile-username">@{student.email}</div>
                  </Link>
                </div>
                {/* // ) : (
                //   <MessageBox variant="success">Please Select Filters</MessageBox>
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
