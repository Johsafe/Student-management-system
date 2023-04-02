import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';

export default function EditClassGroupScreen() {
  const [abbr, setAbbr] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
