import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ButtonGroup from '@mui/material/ButtonGroup';
import SideBarDetails from '../Layout/SideBarDetails';
import Container from '@mui/material/Container';
import { Card, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { getError } from '../../Utils/GetError';
import LoadingBox from '../../Utils/LoadingBox';
import { motion } from 'framer-motion';
import Copyright from '../../Utils/Copyright';

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
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div style={{ display: 'flex' }}>
        <SideBarDetails />
        <Container>
          <Helmet>
            <title>StudentsGroupScreen</title>
          </Helmet>
          <div style={{ margin: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h1>Registered Students Groups</h1>
              {/* <div>
                <Link to="/addstudent" className="link">
                  {' '}
                  <Button variant="contained" size="medium">
                    Add Student
                  </Button>
                </Link>
              </div> */}
            </div>
          <div>
            {groups.map((group)=>(
               <Card style={{
                width:'20rem',
                padding:'0.5rem'
               }}>
                <Link to={`/groups/${group._id}/students`}>
               <div>
                <h5>Title:{group.title}</h5>
                <h5>Students:{group.numberOfStudents}</h5>
                <h5>Description:{group.description}</h5>
               </div>
               </Link>
 
             </Card>

            ))}
           
            </div>
            </div>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </div>
    </motion.div>
  );
}
