import React, { useEffect, useState } from 'react';
import Copyright from '../../Utils/Copyright';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Stack,
  TextField,
} from '@mui/material';
import SideBarDetails from '../Layout/SideBarDetails';
import bg2 from '../../Static/bg2.png';
import MenuItem from '@mui/material/MenuItem';
import Header from '../../Utils/Header';
import { toast } from 'react-toastify';
import { getError } from '../../Utils/GetError';
import { Link, useParams } from 'react-router-dom';
import { base_url } from '../../Utils/baseUrl';
import axios from 'axios';

const classgroup = [
  {
    value: 'Bachelor of Graphics',
    label: 'GRP',
  },
  {
    value: 'Bachelor of Computer Science',
    label: 'COMP',
  },
  {
    value: 'Bachelor of Statistics',
    label: 'STATS',
  },
  {
    value: 'Info Science',
    label: 'Info Science',
  },
];

export default function SearchStudent() {

    //search from on submit
  // const onSubmitForm = async (e) => {
  //   e.preventDefault();
  //   try {
     
  //   } catch (err) {
  //     toast.error(getError(err));
  //   }
  // };

//search
    async function GetStudentSearched(){
			try {
				const url = `${base_url}student/search`;
				const { data } = await axios.get(url);
				console.log(data);
			} catch (err) {
				toast.error(getError(err));
			}
		};


  //Get Groups
  const [groups, setGroups] = useState([]);
  async function getGroups() {
    try {
      const response = await fetch(
        `${base_url}classgroup/group`
      );
      const getgroups = await response.json();
      setGroups(getgroups);
      // console.log(getgroups);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getGroups();
  }, []);
  return (
    <div style={{ display: 'flex' }}>
      <SideBarDetails />
      <Box
        component="main"
        sx={{
          // backgroundColor: '#eceff1',
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Header />
        <Container component="main">
          <Helmet>
            <title>Search</title>
          </Helmet>
          <div style={{ margin: '2rem' }}>
            <h1>Search For A Student</h1>
            <Card
              style={{
                padding: '2rem',
                borderTop: '4px solid #42a5f5',
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
                      id="studentname"
                      label="Name"
                      name="studentname"
                      autoFocus
                      variant="standard"
                      helperText="Please input student name"
                      // value={name}
                      // onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
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
                    </TextField>

                    <TextField
                      required
                      id="admission"
                      label="Admission"
                      name="admission"
                      autoFocus
                      variant="standard"
                      helperText="Please input student admission"
                      // value={admission}
                      // onChange={(e) => setAdmission(e.target.value)}
                    />
                    <Button variant="contained"  onClick={() => GetStudentSearched()}><Link className='link'>Search Student</Link></Button>
                  </Stack>
                </form>
                <Divider sx={{ m: 3 }} />
              </div>

              <div style={{ display: 'flex' }}>
                <div className="profile-card-2">
                  <img src={bg2} className="img img-responsive" />
                  <div class="profile-name">JOHN DOE PETERSON</div>
                  <div class="profile-username">@johndoesurname</div>
                </div>

                <div className="profile-card-2">
                  <img src={bg2} className="img img-responsive" />
                  <div class="profile-name">JOHN DOE PETERSON</div>
                  <div class="profile-username">@johndoesurname</div>
                </div>

                <div className="profile-card-2">
                  <img src={bg2} className="img img-responsive" />
                  <div class="profile-name">JOHN DOE PETERSON</div>
                  <div class="profile-username">@johndoesurname</div>
                </div>

                <div className="profile-card-2">
                  <img src={bg2} className="img img-responsive" />
                  <div class="profile-name">JOHN DOE PETERSON</div>
                  <div class="profile-username">@johndoesurname</div>
                </div>
              </div>
            </Card>
          </div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </div>
  );
}
