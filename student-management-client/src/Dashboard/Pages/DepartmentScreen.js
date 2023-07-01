import Card from '@mui/material/Card';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import SideBarDetails from '../Layout/SideBarDetails';
import Container from '@mui/material/Container';
import Copyright from '../../Utils/Copyright';

export default function DepartmentScreen() {
  return (
    <div style={{ display: 'flex' }}>
      <SideBarDetails />
      <Container sx={{ mt: 0 }}>
        <Helmet>
          <title>Department</title>
        </Helmet>
        <div className="main">
          <h1>Department</h1>
        </div>
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
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    // value={abbr}
                    // onChange={(e) => setAbbr(e.target.value)}
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">#</th>
                  <td>Department of Engineering</td>
                  <td>
                    <div>
                      <ButtonGroup
                        variant="text"
                        aria-label="text button group"
                        style={{ display: 'flex' }}
                      >
                        {/* <Button
                          //    onClick={handleShow}
                          data-toggle="modal"
                        >
                          <EditIcon />
                        </Button> */}
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

        <Copyright sx={{ pt: 4 }} />
      </Container>
    </div>
  );
}
