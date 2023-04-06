import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';

export default function EditClassGroupScreen({ theGroups }) {
  // const id = theGroups._id;
  const [abbr, setAbbr] = useState(theGroups.abbr);
  const [title, setTitle] = useState(theGroups.title);
  const [description, setDescription] = useState(theGroups.description);

  console.log(abbr, title, description);
  console.log(theGroups);

  //edit classgroup function

  const onSubmitForm = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Container component="main">
        <Helmet>
          <title>EditClass</title>
        </Helmet>
        <div>
          <div>
            <form>
              <div style={{ padding: '1rem' }}>
                <div class="mb-2">
                  <label for="name" class="form-label">
                    Class Abbr.
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    name="abbr"
                    value={abbr}
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
                    name="title"
                    value={title}
                    // onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div class="mb-2">
                  <label for="description" class="form-label">
                    Class Description
                  </label>
                  <textarea
                    class="form-control"
                    name="description"
                    rows="3"
                    value={description}
                    // onChange={(e) => setDescription(e.target.value)}
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
        </div>
      </Container>
    </div>
  );
}
