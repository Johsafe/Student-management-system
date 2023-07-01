import Card from '@mui/material/Card';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ButtonGroup from '@mui/material/ButtonGroup';
import SideBarDetails from '../Layout/SideBarDetails';
import Container from '@mui/material/Container';
import Copyright from '../../Utils/Copyright';

export default function RoomsScreen() {
  return (
    <div style={{ display: 'flex' }}>
      <SideBarDetails />
      <Container sx={{ mt: 0 }}>
        <Helmet>
          <title>Rooms</title>
        </Helmet>
        <div style={{ margin: '3rem' }}>
          <h1>Rooms</h1>
          <Card
            style={{
              display: 'flex',
              padding: '2rem',
              borderTop: '4px solid #42a5f5',
            }}
          >
            <div style={{ width: '50%' }}>
              <form>
                <div style={{ padding: '2rem' }}>
                  <div class="mb-2">
                    <label for="title" class="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      // value={abbr}
                      // onChange={(e) => setAbbr(e.target.value)}
                    />
                  </div>
                  <div class="mb-2">
                    <label for="capacity" class="form-label">
                      Capacity
                    </label>
                    <input
                      type="number"
                      class="form-control"
                      id="capacity"
                      // value={title}
                      // onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div class="mb-2">
                    <label for="block" class="form-label">
                      Block
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="block"
                      // value={numberOfStudents}
                      // onChange={(e) => setNumberOfStudents(e.target.value)}
                    />
                  </div>

                  <Button
                    variant="contained"
                    size="medium"
                    sx={{ width: '100%' }}
                    //   onClick={onSubmitForm}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>

            <div style={{ width: '60%' }}>
              {/* <div> */}
              {/* {loading ? ( */}
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Capacity</th>
                    <th scope="col">Block</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {groups.map((group) => ( */}
                  <tr>
                    <th scope="row">#</th>
                    <td>E003</td>
                    <td>80</td>
                    <td>Block D</td>

                    <td>
                      <div>
                        <ButtonGroup
                          variant="text"
                          aria-label="text button group"
                          style={{ display: 'flex' }}
                        >
                          <Button
                            //    onClick={handleShow}
                            data-toggle="modal"
                          >
                            <EditIcon />
                          </Button>
                          <Button
                          // onClick={() => deleteGroup(group._id)}
                          >
                            <DeleteIcon style={{ color: 'red' }} />
                          </Button>
                        </ButtonGroup>
                      </div>
                    </td>
                  </tr>
                  {/* ))} */}
                </tbody>
              </table>
              {/* // ) : ( // <LoadingBox />
              // )} */}
            </div>
          </Card>
        </div>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </div>
  );
}
