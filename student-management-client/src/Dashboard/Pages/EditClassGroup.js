import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import { Button, Card } from '@mui/material';
import Copyright from '../../Utils/Copyright';
import { Link } from 'react-router-dom';
import SideBarDetails from '../Layout/SideBarDetails';

export default function EditClassGroupScreen() {
  const onSubmitForm = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideBarDetails />
      <Container component="main">
        <Helmet>
          <title>Class</title>
        </Helmet>
        <div style={{ margin: '3rem' }}>
          <div
            style={{
              display: 'flex',
              gap: '5rem',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Link to="/groups" className="link">
              {' '}
              <Button variant="contained" size="medium" color="error">
                Go to Classes
              </Button>
            </Link>
            <div>
              <h1>Edit Class Group</h1>
            </div>
          </div>

          <Card sx={{ borderTop: '4px solid #42a5f5' }}>
            <div>
              <form>
                <div
                  style={{
                    padding: '3rem',
                    display: 'flex',
                    gap: '2rem',
                    height: '400px',
                  }}
                >
                  <div style={{ width: '50%' }}>
                    <div class="mb-2">
                      <label for="name" class="form-label">
                        Class Abbr.
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="abbr"
                        // value={abbr}
                        // onChange={(e) => setAbbr(e.target.value)}
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
                        // value={title}
                        // onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div class="mb-2">
                      <label for="numberOfStudents" class="form-label">
                        Class numberOfStudents
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="numberOfStudents"
                        // value={numberOfStudents}
                        // onChange={(e) => setNumberOfStudents(e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={{ width: '50%' }}>
                    <div class="mb-2">
                      <label for="description" class="form-label">
                        Class Description
                      </label>
                      <textarea
                        class="form-control"
                        id="description"
                        rows="3"
                        // value={description}
                        // onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>

                    <div class="mb-2">
                      <label for="photo">ClassGroup Profile Image</label>
                      <input
                        type="file"
                        class="form-control"
                        id="photo"
                        name="photo"

                        // onChange={(e) => setStudentPhoto(e.target.files[0])}
                      />
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
              </form>
            </div>
          </Card>
        </div>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </div>
  );
}
