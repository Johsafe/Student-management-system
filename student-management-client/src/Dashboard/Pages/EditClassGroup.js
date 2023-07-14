import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import { Button, Card } from '@mui/material';
import Copyright from '../../Utils/Copyright';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SideBarDetails from '../Layout/SideBarDetails';
import { getError } from '../../Utils/GetError';
import { toast } from 'react-toastify';

export default function EditClassGroupScreen() {
  const navigate = useNavigate();
  const [abbr, setAbbr] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfStudents, setNumberOfStudents] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const params = useParams();

  // get a classgroup
  async function getaClass() {
    // console.warn(params);
    try {
      const response = await fetch(
        `http://localhost:8000/system/classgroup/group/${params.groupId}`
      );
      const getaclass = await response.json();
      setAbbr(getaclass.abbr);
      setTitle(getaclass.title);
      setDescription(getaclass.description);
      setNumberOfStudents(getaclass.numberOfStudents);
      setAcademicYear(getaclass.academicYear);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getaClass();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      let updateclass = await fetch(
        `http://localhost:8000/system/classgroup/group/${params.groupId}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            abbr,
            title,
            description,
            academicYear,
            numberOfStudents,
          }),
          headers: {
            'Content-Type': 'Application/json',
            // authorization: `Bearer ${Info.token}`,
          },
        }
      );
      const result = await updateclass.json();
      console.warn(result);
      toast.success('class updated successfully');
      navigate(`/groups/${params.groupId}/viewclass`);
    } catch (err) {
      toast.error(getError(err));
    }
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
            <Link to={`/groups/${params.groupId}/viewclass`} className="link">
              {' '}
              <Button variant="contained" size="medium" color="error">
                Back to Class
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
                        type="text"
                        class="form-control"
                        id="academicyear"
                        value={academicYear}
                        onChange={(e) => setAcademicYear(e.target.value)}
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
