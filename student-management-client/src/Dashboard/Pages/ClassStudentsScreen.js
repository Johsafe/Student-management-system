import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { getError } from '../../Utils/GetError';
import { useParams } from 'react-router-dom';
import LoadingBox from '../../Utils/LoadingBox';

export default function ClassStudentsScreen() {
  //get Students
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const params = useParams();
  async function getClassStudents() {
    try {
      const response = await fetch(
        `http://localhost:8000/system/student/group/${params.groupId}/students`
      );
      const getclassstudents = await response.json();
      setStudents(getclassstudents);
      setLoading(true);
      // console.warn(getclassstudents);

    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getClassStudents();
  }, []);
  return (
    <div style={{ display: 'flex' }}>
      <Container>
        <Helmet>
          <title>StudentsScreen</title>
        </Helmet>

        {/* {
          students.length === 0 ? ( */}
        <div style={{ width: '800px' }}>
          <div style={{ height: 400, width: '100%' }}>
            <div className="dashboard">
              <div>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Admission</th>
                      <th scope="col">Lastname</th>
                      <th scope="col">Firstname</th>
                      <th scope="col">Email</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={students._id}>
                        <th scope="row">#</th>
                        <td>{student.admission} </td>
                        <td>{student.lastname}</td>
                        <td>{student.firstname} </td>
                        <td>{student.email} </td>
                        <td> {student.gender} </td>
                        <td> {student.phone} </td>
                        {/* <Link to={`/${student._id}/viewstudent`}></Link> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* ) : (
            <div>
              The Class Currently does not have any students pleaseregister new
              students
            </div>
          )
          //  :(
          //   <LoadingBox />
          // )
        } */}
      </Container>
    </div>
  );
}
