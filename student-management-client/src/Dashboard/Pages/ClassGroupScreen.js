import Card from '@mui/material/Card';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import SideBarDetails from '../Layout/SideBarDetails';
import Container from '@mui/material/Container';
import { getError } from '../../Utils/GetError';
import { toast } from 'react-toastify';
import Copyright from '../../Utils/Copyright';

export default function ClassGroupScreen() {
  const [abbr, setAbbr] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfStudents, setNumberOfStudents] = useState('');
  const [Academicyear, setAcademicyear] = useState('');

  //create new group
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { abbr, title, description, numberOfStudents };
      const result = await fetch(
        'http://localhost:8000/system/classgroup/group',
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const addgroup = await result.json();
      toast.success('class added successfully');

      // console.log(addgroup);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  //Get Groups
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  async function getGroups() {
    try {
      const response = await fetch(
        'http://localhost:8000/system/classgroup/group'
      );
      const getgroups = await response.json();
      setGroups(getgroups);
      setLoading(true);
      // console.log(getgroups);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getGroups();
  }, []);

  //Delete group
  const deleteGroup = async (id) => {
    try {
      await fetch(`http://localhost:8000/system/classgroup/course/${id}`, {
        method: 'DELETE',
      });
      setGroups(groups.filter((groups) => groups._id !== id));
      toast.success('group deleted successfully');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div>
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
                <h1>My Class Group</h1>
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
                        <label for="numberOfStudents" class="form-label">
                          Class numberOfStudents
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="numberOfStudents"
                          value={numberOfStudents}
                          onChange={(e) => setNumberOfStudents(e.target.value)}
                        />
                      </div>
                    </div>
                    <div style={{ width: '50%' }}>
                      <div class="mb-2">
                        <label for="academicyear" class="form-label">
                          Academic Year
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="academicyear"
                          value={Academicyear}
                          onChange={(e) => setAcademicyear(e.target.value)}
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

                      <div class="mb-2">
                        <label for="photo">ClassGroup Profile Image</label>
                        <input
                          type="file"
                          class="form-control"
                          id="photo"
                          name="photo"
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
    </div>
  );
}
