import Card from '@mui/material/Card';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom';
import SideBarDetails from '../Layout/SideBarDetails';
import Container from '@mui/material/Container';

export default function ClassGroupScreen() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', name);
    formData.append('title', title);
    formData.append('description', description);
    try {
      console.warn(name, title, description);
      console.log(name, title, description);
    } catch (err) {
      console.error(err.message);
    }
  };
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
                {/* <div> */}
                <div style={{ padding: '2rem' }}>
                  <div class="mb-2">
                    <label for="name" class="form-label">
                      Class Abbr.
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
              </div>

              <div style={{ width: '60%' }}>
                {/* <div> */}
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Abbr.</th>
                      <th scope="col">Course</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">#</th>
                      <td>CSC</td>
                      <td>Bachelor in Computer Science</td>

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
                            <Button>
                              <DeleteIcon style={{ color: 'red' }} />
                            </Button>
                          </ButtonGroup>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <td>ASC</td>
                      <td>Bachelor in Applied Statistics</td>

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
                            <Button>
                              <DeleteIcon style={{ color: 'red' }} />
                            </Button>
                          </ButtonGroup>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">#</th>
                      <td>CHEM</td>
                      <td>Bachelor in Chemistry</td>

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
                            <Button>
                              <DeleteIcon style={{ color: 'red' }} />
                            </Button>
                          </ButtonGroup>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">#</th>
                      <td>BED</td>
                      <td>Bachelor In Education</td>

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
                            <Button>
                              <DeleteIcon style={{ color: 'red' }} />
                            </Button>
                          </ButtonGroup>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </Container>
      </div>
    </div>
  );
}
