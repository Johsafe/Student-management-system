import Card from '@mui/material/Card';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonGroup from '@mui/material/ButtonGroup';
import SideBarDetails from '../Layout/SideBarDetails';
import Container from '@mui/material/Container';
import Copyright from '../../Utils/Copyright';
import { toast } from 'react-toastify';
import { getError } from '../../Utils/GetError';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import Header from '../../Utils/Header';

export default function DepartmentScreen() {
  //get Courses
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState([]);

  //register a department
  const [abbr, setAbbr] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        abbr,
        title,
      };
      const result = await fetch(
        'http://localhost:8000/system/department/department',
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const adddepartment = await result.json();
      // console.log(abbr, title);
      // console.log(adddepartment);
      navigate('/department')
      toast.success('Department Registered Successfully');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  //get departments
  async function getDepartment() {
    try {
      const response = await fetch(
        'http://localhost:8000/system/department/departments'
      );
      const getdept = await response.json();
      setDepartment(getdept);
      console.warn(getdept);
      setLoading(true);
      console.log(getdept);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getDepartment();
  }, []);

  //delete course
  async function deleteDepts(id) {
    try {
      await fetch(`http://localhost:8000/system/department/${id}`, {
        method: 'DELETE',
      });
      setDepartment(department.filter((department) => department._id !== id));
      toast.success('department deleted successfully');
      console.log(id);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  var i = 1

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
                  <label for="abbr" class="form-label">
                    Abbr
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
                    Title
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
            </form>
          </div>

          <div style={{ width: '60%' }}>
            {/* <div> */}
            {/* {loading ? ( */}
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">S/N</th>
                  <th scope="col">Abbr.</th>
                  <th scope="col">Title</th>
                </tr>
              </thead>
              <tbody>
                {department.map((depts) => (
                  <tr>
                    <th scope="row">{i++}</th>
                    <td>{depts.abbr}</td>
                    <td>{depts.title}</td>
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
                            <Link to={`/update/${depts._id}`}>
                              <EditIcon />
                            </Link>
                          </Button>
                          <Button onClick={() => deleteDepts(depts._id)}>
                            <DeleteIcon style={{ color: 'red' }} />
                          </Button>
                        </ButtonGroup>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* ))} */}
              </tbody>
            </table>
            {/* // ) : ( // <LoadingBox />
              // )} */}
          </div>
        </Card>

        <Copyright sx={{ pt: 4 }} />
      </Container>
      </Box>
    </div>
  );
}
