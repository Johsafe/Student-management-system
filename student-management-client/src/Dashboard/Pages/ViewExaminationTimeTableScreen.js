import React from 'react';
import Container from '@mui/material/Container';
import Copyright from '../../Utils/Copyright';
import SideBarDetails from '../Layout/SideBarDetails';
import { Helmet } from 'react-helmet-async';
import { Card } from '@mui/material';
export default function ViewTimeTable() {
  return (
    <div style={{ display: 'flex' }}>
      <SideBarDetails />
      <Container component="main">
        <Helmet>
          <title>ExamTimetable</title>
        </Helmet>
        <div>
          <Card
            style={{
              display: 'flex',
              padding: '2rem',
              borderTop: '4px solid #42a5f5',
            }}
          >
            <div style={{ margin: '2rem' }}>
              <h1>My TimeTable</h1>

              <table class="table table-bordered border-primary">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Day/Period</th>
                    <th scope="col">
                      <b>Class</b>
                    </th>
                    <th scope="col">
                      <b>Code</b>
                    </th>
                    <th scope="col">
                      <b>Course Description</b>
                    </th>
                    <th scope="col">
                      <b>Year</b>
                    </th>
                    <th scope="col">
                      <b>Venue</b>
                    </th>
                    <th scope="col">
                      <b>Total</b>
                    </th>
                    <th scope="col">
                      <b>Invigilator</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowspan="3">#</td>

                    <td rowspan="3">
                      <b>MONDAY</b>
                    </td>
                  </tr>
                  <tr>
                    <td>CSC</td>
                    <td>COM 123</td>
                    <td>Computer Science Project I</td>
                    <td>3 </td>
                    <td>LR14</td>
                    <td>45 </td>
                    <td> Amuomo</td>
                  </tr>
                  <tr>
                    <td>ASC</td>
                    <td>STA 123</td>
                    <td>Statistics I</td>
                    <td>3 </td>
                    <td>LR12</td>
                    <td>30 </td>
                    <td>Joseph</td>
                  </tr>

                  <tr>
                    <td rowspan="4">#</td>

                    <td rowspan="4">
                      <b>TUESDAY</b>
                    </td>
                  </tr>
                  <tr>
                    <td>CSC</td>
                    <td>COM 124</td>
                    <td>Computer Science Project II</td>
                    <td>3 </td>
                    <td>LR03</td>
                    <td>45 </td>
                    <td> Amuomo</td>
                  </tr>
                  <tr>
                    <td>CHEM</td>
                    <td>CHEM 123</td>
                    <td>Chemistry</td>
                    <td>3 </td>
                    <td>LR05</td>
                    <td>30 </td>
                    <td>Joseph</td>
                  </tr>
                  <tr>
                    <td>CHEM</td>
                    <td>CHEM 123</td>
                    <td>Chemistry</td>
                    <td>3 </td>
                    <td>LR05</td>
                    <td>30 </td>
                    <td>Joseph</td>
                  </tr>

                  <tr>
                    <td rowspan="3">#</td>

                    <td rowspan="3">
                      <b>WEDNESDAY</b>
                    </td>
                  </tr>
                  <tr>
                    <td>CSC</td>
                    <td>COM 124</td>
                    <td>Computer Science Project II</td>
                    <td>3 </td>
                    <td>LR03</td>
                    <td>45 </td>
                    <td> Amuomo</td>
                  </tr>
                  <tr>
                    <td>CHEM</td>
                    <td>CHEM 123</td>
                    <td>Chemistry</td>
                    <td>3 </td>
                    <td>LR05</td>
                    <td>30 </td>
                    <td>Joseph</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </div>
  );
}
