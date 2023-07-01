import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import SideBarDetails from '../Layout/SideBarDetails';
import Container from '@mui/material/Container';
import { Card } from '@mui/material';
import { motion } from 'framer-motion';
import Copyright from '../../Utils/Copyright';
import bg2 from '../../Static/bg2.png';

export default function StudentsGroupScreen() {
  //get Students
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);

  //getstudent groups
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

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <SideBarDetails />
        <Container>
          <Helmet>
            <title>StudentsGroupScreen</title>
          </Helmet>
          <div style={{ margin: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h1>Students Class Groups</h1>
              <div>
                <Link to="/class" className="link">
                  {' '}
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{ width: '200px' }}
                  >
                    Add Class
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <Card
                style={{
                  padding: '2rem',
                  display: 'flex',
                  borderTop: '4px solid #42a5f5',
                }}
              >
                <div className="profile-card-2">
                  <img src={bg2} className="img img-responsive" />
                  <Link to="/viewclass">
                    <div class="profile-name">JOHN DOE PETERSON</div>
                    <div class="profile-username">@johndoesurname</div>
                  </Link>
                </div>
              </Card>
              <Card
                style={{
                  padding: '2rem',
                  display: 'flex',
                }}
              >
                {groups.map((group) => (
                  <div style={{ display: 'flex' }}>
                    <div className="profile-card-2">
                      <img src={bg2} className="img img-responsive" />
                      <Link to={`/groups/${group._id}/students`}>
                        <div class="profile-name">{group.title}</div>
                      </Link>
                      <div class="profile-username">@johndoesurname</div>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </div>
    </div>
  );
}
