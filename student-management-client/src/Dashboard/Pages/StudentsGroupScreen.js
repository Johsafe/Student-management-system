import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import SideBarDetails from "../Layout/SideBarDetails";
import Container from "@mui/material/Container";
import { Box, Card } from "@mui/material";
import Copyright from "../../Utils/Copyright";
import bg2 from "../../Static/bg2.png";
import { toast } from "react-toastify";
import { getError } from "../../Utils/GetError";
import { Grid } from "@mui/material";
import Header from "../../Utils/Header";
import { base_url } from "../../Utils/baseUrl";

export default function StudentsGroupScreen() {
  //getstudent groups
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  async function getGroups() {
    try {
      const response = await fetch(
        `${base_url}classgroup/group`
      );
      const getgroups = await response.json();
      setGroups(getgroups);
      setLoading(true);
      // console.log(getgroups);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getGroups();
  }, []);

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
          <Header />
          <Container>
            <Helmet>
              <title>Classes</title>
            </Helmet>
            <div style={{ margin: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Students Classes</h1>
                <div>
                  {" "}
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{ width: "200px" }}
                  >
                    <Link to="/class" className="link">
                      Add Class
                    </Link>
                  </Button>
                </div>
              </div>
              <div>
                <Card
                  style={{
                    padding: "2rem",
                    display: "flex",
                    borderTop: "4px solid #42a5f5",
                  }}
                >
                  <Grid container spacing={1} sx={{ flexWrap: "wrap" }}>
                    {groups.map((group) => (
                      <div className="profile-card-2">
                        {/* <img src={'http://localhost:8000/' + group.classPhoto} alt={bg2} className="img img-responsive" /> */}
                        <img src={bg2} className="img img-responsive" />
                        <Link to={`/groups/${group._id}/viewclass`}>
                          <div class="profile-name">{group.title}</div>
                          <div class="profile-username">
                            {group.academicYear}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </Grid>
                </Card>
              </div>
            </div>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </div>
    </div>
  );
}
