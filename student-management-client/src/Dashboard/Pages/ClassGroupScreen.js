import Card from '@mui/material/Card';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link, useParams } from 'react-router-dom';
import SideBarDetails from '../Layout/SideBarDetails';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        Johsafe
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
export default function ClassGroupScreen() {
  const [abbr, setAbbr] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  //create new group
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { abbr, title, description };
      const result = await fetch(
        'http://localhost:8000/system/classgroup/create',
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const addgroup = await result.json();
      // console.log(addgroup);
    } catch (err) {
      console.error(err.message);
    }
  };

  //Get Groups
  const [groups, setGroups] = useState([]);
  async function getGroups() {
    try {
      const response = await fetch(
        'http://localhost:8000/system/classgroup/group'
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

  //Delete group
  const params = useParams();
  async function deleteGroup() {
    try {
      // const response = await fetch(
      //   `http://localhost:8000/system/classgroup/${params.id}`,
      //   {
      //     method: 'DELETE',
      //   }
      // );
      // const deletedgroup = await response.json();
      // console.log(deletedgroup);
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <div>
      {/* <SubLayout> */}
      <div style={{ display: 'flex' }}>
        <SideBarDetails />
        <Container component="main">
          <Helmet>
            <title>Class</title>
          </Helmet>
          <div style={{ margin: '3rem' }}>
            <h1>My Class Group</h1>

            <Card style={{ display: 'flex', padding: '2rem' }}>
              <div style={{ width: '50%' }}>
                <form>
                  {/* <div> */}
                  <div style={{ padding: '2rem' }}>
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

                    <Button
                      variant="contained"
                      size="medium"
                      sx={{ width: '100%' }}
                      onClick={onSubmitForm}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </div>

              <div style={{ width: '60%' }}>
                {/* <div> */}
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Abbr.</th>
                      <th scope="col">Programme Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map((group) => (
                      <tr key={group.id}>
                        <th scope="row">#</th>
                        <td>{group.abbr}</td>
                        <td>{group.title}</td>

                        <td>
                          <div>
                            <ButtonGroup
                              variant="text"
                              aria-label="text button group"
                              style={{ display: 'flex' }}
                            >
                              <Button>
                                <Link to="/edit">
                                  {' '}
                                  <EditIcon />
                                </Link>
                              </Button>
                              <Button onClick={() => deleteGroup(group._id)}>
                                <DeleteIcon style={{ color: 'red' }} />
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
          </div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </div>
    </div>
  );
}
